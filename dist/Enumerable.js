define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Enumerable {
        constructor(source) {
            this.source = source;
        }
        [Symbol.iterator]() {
            return this.getEnumerator();
        }
        static empty() {
            return [].asEnumerable();
        }
        static range(start, count) {
            return new Enumerable((function* () {
                for (let i = start, c = start + count; i < c; i++) {
                    yield i;
                }
            }));
        }
        static repeat(item, count) {
            return new Enumerable(function* () {
                for (let i = 0; i < count; i++) {
                    yield item;
                }
            });
        }
        static from(set) {
            if (set instanceof Array || set instanceof NodeList) {
                return set.asEnumerable();
            }
            if (typeof set === 'function') {
                return new Enumerable(set);
            }
            return set;
        }
        getEnumerator() {
            return this.source();
        }
        join(set, leftKeySelector, rightKeySelector, resultSelector, keyComparer = (a, b) => a === b) {
            const ref = this;
            return new Enumerable((function* () {
                const e = Enumerable.from(set);
                for (let item of ref) {
                    for (let right of e) {
                        if (keyComparer(leftKeySelector(item), rightKeySelector(right))) {
                            yield resultSelector(item, right);
                        }
                    }
                }
            }));
        }
        selectMany(memberSelector) {
            const ref = this;
            return new Enumerable((function* () {
                for (let item of ref) {
                    for (let sItem of memberSelector(item)) {
                        yield sItem;
                    }
                }
            }));
        }
        first(predicate) {
            const iter = (predicate ? this.where(predicate) : this);
            for (let item of iter) {
                return item;
            }
            return undefined;
        }
        last(predicate) {
            const iter = (predicate ? this.where(predicate) : this);
            let last = undefined;
            for (let e of iter) {
                last = e;
            }
            return last;
        }
        aggregate(fun, seed) {
            let result = seed;
            let idx = 0;
            for (let item of this) {
                const i = idx++;
                if (result === undefined) {
                    result = item;
                }
                else {
                    result = fun(result, item, i);
                }
            }
            return result;
        }
        select(selector) {
            const ref = this;
            return new Enumerable((function* () {
                let idx = 0;
                for (let item of ref) {
                    yield selector(item, idx++);
                }
            }));
        }
        count() {
            let c = 0;
            for (let item of this) {
                c++;
            }
            return c;
        }
        orderByDescending(selector) {
            return new OrderedEnumerable([{ direction: "desc", selector: selector }], this);
        }
        oderBy(selector) {
            return new OrderedEnumerable([{ direction: "asc", selector: selector }], this);
        }
        sum(selector) {
            const iter = this.select(selector);
            return iter.aggregate((x, y) => x + y, 0);
        }
        where(predicate) {
            const ref = this;
            return new Enumerable((function* () {
                let idx = 0;
                for (let item of ref) {
                    if (predicate(item, idx++)) {
                        yield item;
                    }
                }
            }));
        }
        contains(e, comparer = (a, b) => a === b) {
            return this.any(x => comparer(x, e));
        }
        all(predicate) {
            for (let item of this) {
                if (!predicate(item)) {
                    return false;
                }
            }
            return true;
        }
        any(predicate) {
            for (let item of this) {
                if (predicate(item)) {
                    return true;
                }
            }
            return false;
        }
        append(newItem) {
            const ref = this;
            return new Enumerable(function* () {
                for (let item of ref) {
                    yield item;
                }
                yield newItem;
            });
        }
        concat(set) {
            const ref = this;
            return new Enumerable(function* () {
                for (let item of ref) {
                    yield item;
                }
                for (let item of Enumerable.from(set)) {
                    yield item;
                }
                ;
            });
        }
        defaultIfEmpty(defaultItem) {
            const ref = this;
            return new Enumerable(function* () {
                let hasItem = false;
                for (let item of ref) {
                    hasItem = true;
                    yield item;
                }
                if (!hasItem) {
                    yield defaultItem;
                }
            });
        }
        distinct(comparer = (a, b) => a === b) {
            const ref = this;
            return new Enumerable(function* () {
                const cache = [];
                for (let item of ref) {
                    if (cache.findIndex(x => comparer(x, item)) === -1) {
                        cache.push(item);
                        yield item;
                    }
                }
            });
        }
        elementAt(n) {
            for (let item of this) {
                if (n-- === 0) {
                    return item;
                }
            }
            return undefined;
        }
        except(set, comparer = (a, b) => a === b) {
            const ref = this;
            return new Enumerable(function* () {
                const e = Enumerable.from(set);
                for (let item of ref) {
                    if (!e.contains(item, comparer)) {
                        yield item;
                    }
                }
            });
        }
        groupBy(keySelector, resultSelector = x => x, keyComparer = (a, b) => a === b) {
            const ref = this;
            return new Enumerable(function* () {
                const keyCache = [];
                for (let item of ref) {
                    const key = keySelector(item);
                    if (keyCache.findIndex(x => keyComparer(x, key)) === -1) {
                        keyCache.push(key);
                        yield resultSelector(new Grouping(ref.where(x => keyComparer(keySelector(x), key)), key));
                    }
                }
            });
        }
        groupJoin(set, letKeySelector, rightKeySelector, resultSelector = x => x, keyComparer = (a, b) => a === b) {
            const ref = this;
            return new Enumerable(function* () {
                const e = Enumerable.from(set);
                for (let item of ref) {
                    const leftKey = letKeySelector(item);
                    const sset = e.where(x => keyComparer(leftKey, rightKeySelector(x)));
                    yield resultSelector(new Grouping(sset, leftKey));
                }
            });
        }
        intersect(set, comparer = (a, b) => a === b) {
            const ref = this;
            return new Enumerable(function* () {
                const e = Enumerable.from(set);
                for (let item of ref) {
                    if (e.contains(item, comparer)) {
                        yield item;
                    }
                }
            });
        }
        max(memberSelector) {
            return this.aggregate((x, y) => memberSelector(y) > memberSelector(x) ? y : x);
        }
        min(memberSelector) {
            return this.aggregate((x, y) => memberSelector(y) > memberSelector(x) ? x : y);
        }
        average(selector) {
            let sum = 0;
            let count = 0;
            for (let item of this) {
                count++;
                sum += selector(item);
            }
            if (count === 0) {
                throw new Error('no item in source');
            }
            return sum / count;
        }
        prepend(newItem) {
            const ref = this;
            return new Enumerable(function* () {
                yield newItem;
                for (let item of ref) {
                    yield item;
                }
            });
        }
        reverse() {
            const ref = this;
            return new Enumerable(function* () {
                const cache = [];
                for (let item of ref) {
                    cache.push(item);
                }
                for (let i = cache.length - 1; i > 0; i--) {
                    yield cache[i];
                }
            });
        }
        sequenceEqual(set, comparer = (a, b) => a === b) {
            const e = Enumerable.from(set);
            const leftIter = this[Symbol.iterator]();
            const rightIter = e[Symbol.iterator]();
            let left = leftIter.next();
            let right = rightIter.next();
            while (!left.done || !right.done) {
                if (left.done != right.done) {
                    return false;
                }
                if (!comparer(left.value, right.value)) {
                    return false;
                }
                left = leftIter.next();
                right = rightIter.next();
            }
            return true;
        }
        skip(n) {
            const ref = this;
            return new Enumerable((function* () {
                let c = n;
                for (let item of ref) {
                    if (c-- > 0) {
                        continue;
                    }
                    yield item;
                }
            }));
        }
        skipLast(n) {
            const ref = this;
            return new Enumerable((function* () {
                const cache = ref.toArray();
                for (let i = 0, c = cache.length - n; i < c; i++) {
                    yield cache[i];
                }
            }));
        }
        skipWhile(predicate) {
            const ref = this;
            return new Enumerable((function* () {
                let skipping = true;
                let idx = 0;
                for (let item of ref) {
                    const i = idx++;
                    if (skipping) {
                        if (!predicate(item, i)) {
                            skipping = false;
                            yield item;
                        }
                        continue;
                    }
                    yield item;
                }
            }));
        }
        take(n) {
            const ref = this;
            return new Enumerable((function* () {
                let c = n;
                for (let item of ref) {
                    if (c-- > 0) {
                        yield item;
                    }
                    else {
                        break;
                    }
                }
            }));
        }
        takeLast(n) {
            const ref = this;
            return new Enumerable((function* () {
                const cache = ref.toArray();
                for (let i = cache.length - n, c = cache.length; i < c; i++) {
                    yield cache[i];
                }
            }));
        }
        takeWhile(predicate) {
            const ref = this;
            return new Enumerable((function* () {
                for (let item of ref) {
                    if (predicate(item)) {
                        yield item;
                    }
                    else {
                        break;
                    }
                }
            }));
        }
        toDictionary(keySelector, valueSelector = e => e) {
            const result = {};
            for (let item of this) {
                result[keySelector(item)] = valueSelector(item);
            }
            return result;
        }
        toArray() {
            return Array.from(this.source());
        }
        union(set, comparer = (a, b) => a === b) {
            return this.concat(set).distinct(comparer);
        }
        zip(set, resultSelector) {
            const ref = this;
            return new Enumerable((function* () {
                const e = Enumerable.from(set);
                const leftIter = ref[Symbol.iterator]();
                const rightIter = e[Symbol.iterator]();
                let left = leftIter.next();
                let rihght = rightIter.next();
                while (!left.done && !rihght.done) {
                    if (!left.done && !rihght.done) {
                        yield resultSelector(left.value, rihght.value);
                        left = leftIter.next();
                        rihght = rightIter.next();
                    }
                }
            }));
        }
    }
    exports.Enumerable = Enumerable;
    class Grouping extends Enumerable {
        constructor(set, key) {
            super(() => set.getEnumerator());
            this.key = key;
        }
    }
    class OrderedEnumerable extends Enumerable {
        constructor(orderCommands, source) {
            super((function* () {
                const arr = source.toArray();
                arr.sort((a, b) => {
                    for (let cmd of orderCommands) {
                        const pa = cmd.selector(a);
                        const pb = cmd.selector(b);
                        if (typeof pa === "string" ||
                            typeof pa === "number" ||
                            pa instanceof Date) {
                            if (pa == pb) {
                                continue;
                            }
                            else {
                                return (pa > pb ? 1 : -1) * (cmd.direction === "asc" ? 1 : -1);
                            }
                        }
                    }
                    return 0;
                });
                for (let item of arr) {
                    yield item;
                }
            }));
            this.orderCommands = orderCommands;
        }
        thenBy(selector) {
            return new OrderedEnumerable(this.orderCommands.concat([{ direction: "asc", selector: selector }]), this);
        }
        thenByDescending(selector) {
            return new OrderedEnumerable(this.orderCommands.concat([{ direction: "desc", selector: selector }]), this);
        }
    }
});
