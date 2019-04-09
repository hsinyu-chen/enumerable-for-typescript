type EnumerableLike<T> = Enumerable<T> | Array<T> | NodeList | { (): IterableIterator<T> };
export class Enumerable<T>  {
    [Symbol.iterator]() {
        return this.getEnumerator();
    }
    static empty<T>() {
        return ([] as T[]).asEnumerable();
    }
    static range(start: number, count: number): Enumerable<number> {
        return new Enumerable(
            (function* () {
                for (let i = start, c = start + count; i < c; i++) {
                    yield i;
                }
            })
        );
    }
    static repeat<T>(item: T, count: number) {
        return new Enumerable<T>(function* () {
            for (let i = 0; i < count; i++) {
                yield item;
            }
        });
    }
    static from<T>(set: EnumerableLike<T>): Enumerable<T> {
        if (set instanceof Array || set instanceof NodeList) {
            return (set as unknown as any).asEnumerable();
        }
        if (typeof set === 'function') {
            return new Enumerable(set);
        }
        return set;
    }
    constructor(private source: () => IterableIterator<T>) { }
    getEnumerator() {
        return this.source();
    }

    join<TRight, TKey, TResult>(set: EnumerableLike<TRight>,
        leftKeySelector: (e: T) => TKey,
        rightKeySelector: (e: TRight) => TKey,
        resultSelector: (left: T, right: TRight) => TResult,
        keyComparer: IEqualityComparer<TKey> = (a, b) => a === b) {
        const ref = this;
        return new Enumerable<TResult>(
            (function* () {
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
    selectMany<TResult>(memberSelector: (e: T) => Enumerable<TResult>) {
        const ref = this;
        return new Enumerable<TResult>(
            (function* () {
                for (let item of ref) {
                    for (let sItem of memberSelector(item)) {
                        yield sItem;
                    }
                }
            })
        );
    }
    first(): T;
    first(predicate?: (e: T, i: number) => boolean): T | undefined {
        const iter = (predicate ? this.where(predicate) : this);
        for (let item of iter) {
            return item;
        }
        return undefined;
    }

    last(): T;
    last(predicate?: (e: T, i: number) => boolean): T | undefined {
        const iter = (predicate ? this.where(predicate) : this);
        let last: T | undefined = undefined;
        for (let e of iter) {
            last = e;
        }
        return last;
    }
    aggregate<TResult>(
        fun: (result: TResult, current: T, index: number) => TResult,
        seed?: TResult
    ): TResult;
    aggregate(fun: (result: T, current: T, index: number) => T, seed?: T): T;
    aggregate<TResult>(
        fun: (result: T | TResult, current: T, index: number) => T | TResult,
        seed?: TResult
    ): TResult {
        let result: T | TResult | undefined = seed;
        let idx = 0;
        for (let item of this) {
            const i = idx++;
            if (result === undefined) {
                result = (item as unknown) as TResult;
            } else {
                result = fun(result, item, i);
            }
        }
        return result as TResult;
    }
    select<TResult>(selector: (e: T, i: number) => TResult) {
        const ref = this;
        return new Enumerable<TResult>(
            (function* () {
                let idx = 0;
                for (let item of ref) {
                    yield selector(item, idx++);
                }
            })
        );
    }
    count() {
        let c = 0;
        for (let item of this) {
            c++;
        }
        return c;
    }

    orderByDescending(selector: (e: T) => any) {
        return new OrderedEnumerable<T>(
            [{ direction: "desc", selector: selector }],
            this
        );
    }
    oderBy(selector: (e: T) => any) {
        return new OrderedEnumerable<T>(
            [{ direction: "asc", selector: selector }],
            this
        );
    }
    sum(selector: (e: T) => number): number {
        const iter = this.select(selector);
        return iter.aggregate((x, y) => x + y, 0);
    }
    where(predicate: (e: T, i: number) => boolean) {
        const ref = this;
        return new Enumerable<T>(
            (function* () {
                let idx = 0;
                for (let item of ref) {
                    if (predicate(item, idx++)) {
                        yield item;
                    }
                }
            })
        );
    }
    contains(e: T, comparer: IEqualityComparer<T> = (a, b) => a === b) {
        return this.any(x => comparer(x, e));
    }
    all(predicate: (e: T) => boolean) {
        for (let item of this) {
            if (!predicate(item)) {
                return false;
            }
        }
        return true;
    }
    any(predicate: (e: T) => boolean) {
        for (let item of this) {
            if (predicate(item)) {
                return true;
            }
        }
        return false;
    }
    append(newItem: T) {
        const ref = this;
        return new Enumerable<T>(function* () {
            for (let item of ref) {
                yield item;
            }
            yield newItem;
        });
    }
    concat(set: EnumerableLike<T>) {
        const ref = this;
        return new Enumerable<T>(function* () {
            for (let item of ref) {
                yield item;
            }
            for (let item of Enumerable.from(set)) {
                yield item;
            };
        });
    }
    defaultIfEmpty(defaultItem: T) {
        const ref = this;
        return new Enumerable<T>(function* () {
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
    distinct(comparer: IEqualityComparer<T> = (a, b) => a === b) {
        const ref = this;
        return new Enumerable<T>(function* () {
            const cache: T[] = [];
            for (let item of ref) {
                if (cache.findIndex(x => comparer(x, item)) === -1) {
                    cache.push(item);
                    yield item;
                }
            }
        });
    }
    elementAt(n: number): T | undefined {
        for (let item of this) {
            if (n-- === 0) {
                return item;
            }
        }
        return undefined;
    }
    except(set: EnumerableLike<T>, comparer: IEqualityComparer<T> = (a, b) => a === b) {
        const ref = this;
        return new Enumerable<T>(function* () {
            const e = Enumerable.from(set);
            for (let item of ref) {
                if (!e.contains(item, comparer)) {
                    yield item;
                }
            }
        });
    }
    groupBy<TKey, TResult>(
        keySelector: (e: T) => TKey,
        resultSelector: (grouping: Grouping<TKey, T>) => TResult = x => x as any,
        keyComparer: IEqualityComparer<TKey> = (a, b) => a === b): Enumerable<TResult> {
        const ref = this;
        return new Enumerable<TResult>(function* () {
            const keyCache: TKey[] = [];
            for (let item of ref) {
                const key = keySelector(item);
                if (keyCache.findIndex(x => keyComparer(x, key)) === -1) {
                    keyCache.push(key);
                    yield resultSelector(new Grouping(ref.where(x => keyComparer(keySelector(x), key)), key));
                }
            }
        });
    }
    groupJoin<TKey, TResult, TRight>(set: EnumerableLike<TRight>,
        letKeySelector: (e: T) => TKey,
        rightKeySelector: (e: TRight) => TKey,
        resultSelector: (grouping: Grouping<TKey, TRight>) => TResult = x => x as any,
        keyComparer: IEqualityComparer<TKey> = (a, b) => a === b) {
        const ref = this;
        return new Enumerable<TResult>(function* () {
            const e = Enumerable.from(set);
            for (let item of ref) {
                const leftKey = letKeySelector(item);
                const sset = e.where(x => keyComparer(leftKey, rightKeySelector(x)));
                yield resultSelector(new Grouping(sset, leftKey));
            }
        });
    }
    intersect(set: EnumerableLike<T>, comparer: IEqualityComparer<T> = (a, b) => a === b) {
        const ref = this;
        return new Enumerable<T>(function* () {
            const e = Enumerable.from(set);
            for (let item of ref) {
                if (e.contains(item, comparer)) {
                    yield item;
                }
            }
        });
    }
    max(memberSelector: (e: T) => number) {
        return this.aggregate<T>((x, y) => memberSelector(y) > memberSelector(x) ? y : x);
    }
    min(memberSelector: (e: T) => number) {
        return this.aggregate<T>((x, y) => memberSelector(y) > memberSelector(x) ? x : y);
    }
    average(selector: (e: T) => number) {
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
    prepend(newItem: T) {
        const ref = this;
        return new Enumerable<T>(function* () {
            yield newItem;
            for (let item of ref) {
                yield item;
            }
        });
    }
    reverse() {
        const ref = this;
        return new Enumerable<T>(function* () {
            const cache: T[] = [];
            for (let item of ref) {
                cache.push(item);
            }
            for (let i = cache.length - 1; i > 0; i--) {
                yield cache[i];
            }
        });
    }
    sequenceEqual(set: EnumerableLike<T>, comparer: IEqualityComparer<T> = (a, b) => a === b) {
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
    skip(n: number) {
        const ref = this;
        return new Enumerable<T>(
            (function* () {
                let c = n;
                for (let item of ref) {
                    if (c-- > 0) {
                        continue;
                    }
                    yield item;
                }
            })
        );
    }
    skipLast(n: number) {
        const ref = this;
        return new Enumerable<T>(
            (function* () {
                const cache = ref.toArray();
                for (let i = 0, c = cache.length - n; i < c; i++) {
                    yield cache[i];
                }
            })
        );
    }
    skipWhile(predicate: (e: T, i: number) => boolean) {
        const ref = this;
        return new Enumerable<T>(
            (function* () {
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
            })
        );
    }
    take(n: number) {
        const ref = this;
        return new Enumerable<T>(
            (function* () {
                let c = n;
                for (let item of ref) {
                    if (c-- > 0) {
                        yield item;
                    } else {
                        break;
                    }
                }
            })
        );
    }
    takeLast(n: number) {
        const ref = this;
        return new Enumerable<T>(
            (function* () {
                const cache = ref.toArray();
                for (let i = cache.length - n, c = cache.length; i < c; i++) {
                    yield cache[i];
                }
            })
        );
    }
    takeWhile(predicate: (e: T) => boolean) {
        const ref = this;
        return new Enumerable<T>(
            (function* () {
                for (let item of ref) {
                    if (predicate(item)) {
                        yield item;
                    } else {
                        break;
                    }
                }
            })
        );
    }
    toDictionary(keySelector: (e: T) => number): { [key: number]: T }
    toDictionary(keySelector: (e: T) => string): { [key: string]: T }
    toDictionary<TValue>(keySelector: (e: T) => number, valueSelector?: (e: T) => TValue): { [key: number]: TValue }
    toDictionary<TValue>(keySelector: (e: T) => string, valueSelector?: (e: T) => TValue): { [key: string]: TValue }
    toDictionary<TValue>(keySelector: (e: T) => string | number, valueSelector: (e: T) => TValue = e => e as unknown as TValue) {
        const result = {} as any;
        for (let item of this) {
            result[keySelector(item)] = valueSelector(item);
        }
        return result;
    }
    toArray(): T[] {
        return Array.from(this.source());
    }
    union(set: EnumerableLike<T>, comparer: IEqualityComparer<T> = (a, b) => a === b) {
        return this.concat(set).distinct(comparer);
    }

    zip<TRight, TResult>(set: EnumerableLike<TRight>, resultSelector: (left: T, right: TRight) => TResult) {
        const ref = this;
        return new Enumerable<TResult>(
            (function* () {
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
class Grouping<Tkey, TElement> extends Enumerable<TElement> {
    constructor(set: Enumerable<TElement>, public key: Tkey) {
        super(() => set.getEnumerator());
    }
}
class OrderedEnumerable<T> extends Enumerable<T> {
    constructor(
        private orderCommands: {
            direction: "asc" | "desc";
            selector: (e: T) => any;
        }[],
        source: Enumerable<T>
    ) {
        super(
            (function* () {
                const arr = source.toArray();
                arr.sort((a, b) => {
                    for (let cmd of orderCommands) {
                        const pa = cmd.selector(a);
                        const pb = cmd.selector(b);
                        if (
                            typeof pa === "string" ||
                            typeof pa === "number" ||
                            pa instanceof Date
                        ) {
                            if (pa == pb) {
                                continue;
                            } else {
                                return (pa > pb ? 1 : -1) * (cmd.direction === "asc" ? 1 : -1);
                            }
                        }
                    }
                    return 0;
                });
                for (let item of arr) {
                    yield item;
                }
            })
        );
    }
    thenBy(selector: (e: T) => any) {
        return new OrderedEnumerable<T>(
            this.orderCommands.concat([{ direction: "asc", selector: selector }]),
            this
        );
    }
    thenByDescending(selector: (e: T) => any) {
        return new OrderedEnumerable<T>(
            this.orderCommands.concat([{ direction: "desc", selector: selector }]),
            this
        );
    }
}
