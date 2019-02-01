interface NodeList {
    asEnumerable(): IEnumerable<any>;
}
interface NodeListOf<TNode extends Node> {
    asEnumerable(): IEnumerable<TNode>;
}
interface Array<T> {
    asEnumerable(): IEnumerable<T>;
}
type EnumerableLike<T> = IEnumerable<T> | Array<T> | NodeList | { (): IterableIterator<T> };
interface IEqualityComparer<T> {
    (a: T, b: T): boolean;
}
interface IEnumerable<T> {
    join<TRight, TKey, TResult>(set: EnumerableLike<TRight>,
        leftKeySelector: (e: T) => TKey,
        rightKeySelector: (e: TRight) => TKey,
        resultSelector: (left: T, right: TRight) => TResult,
        keyComparer: IEqualityComparer<TKey>): IEnumerable<TResult>;
    selectMany<TResult>(memberSelector: (e: T) => IEnumerable<TResult>): IEnumerable<TResult>;
    first(): T;
    first(predicate?: (e: T, i: number) => boolean): T | undefined;
    last(): T;
    last(predicate?: (e: T, i: number) => boolean): T | undefined;
    aggregate<TResult>(
        fun: (result: TResult, current: T, index: number) => TResult,
        seed?: TResult
    ): TResult;
    aggregate(fun: (result: T, current: T, index: number) => T, seed?: T): T;
    aggregate<TResult>(
        fun: (result: T | TResult, current: T, index: number) => T | TResult,
        seed?: TResult
    ): TResult;
    select<TResult>(selector: (e: T, i: number) => TResult): IEnumerable<TResult>;
    count(): number;
    sum(selector: (e: T) => number): number;
    where(predicate: (e: T, i: number) => boolean): IEnumerable<T>;
    contains(e: T, comparer: IEqualityComparer<T>): boolean;
    all(predicate: (e: T) => boolean): boolean;
    any(predicate: (e: T) => boolean): boolean;
    append(newItem: T): IEnumerable<T>;
    concat(set: EnumerableLike<T>): IEnumerable<T>;
    defaultIfEmpty(defaultItem: T): IEnumerable<T>;
    distinct(comparer: IEqualityComparer<T>): IEnumerable<T>;
    elementAt(n: number): T | undefined;
    except(set: EnumerableLike<T>, comparer: IEqualityComparer<T>): IEnumerable<T>
    groupBy<TKey, TResult>(
        keySelector: (e: T) => TKey,
        resultSelector: (grouping: IGrouping<TKey, T>) => TResult,
        keyComparer: IEqualityComparer<TKey>): IEnumerable<TResult>;
    groupJoin<TKey, TResult, TRight>(set: EnumerableLike<TRight>,
        letKeySelector: (e: T) => TKey,
        rightKeySelector: (e: TRight) => TKey,
        resultSelector: (grouping: IGrouping<TKey, TRight>) => TResult,
        keyComparer: IEqualityComparer<TKey>): IEnumerable<TResult>;
    intersect(set: EnumerableLike<T>, comparer: IEqualityComparer<T>): IEnumerable<T>
    max(memberSelector: (e: T) => number): number;
    min(memberSelector: (e: T) => number): number;
    average(selector: (e: T) => number): number;
    prepend(newItem: T): IEnumerable<T>
    orderByDescending(selector: (e: T) => any): IOrderedEnumerable<T>;
    oderBy(selector: (e: T) => any): IOrderedEnumerable<T>;
    reverse(): IEnumerable<T>
    sequenceEqual(set: EnumerableLike<T>, comparer: IEqualityComparer<T>): boolean;
    skip(n: number): IEnumerable<T>
    skipLast(n: number): IEnumerable<T>
    skipWhile(predicate: (e: T, i: number) => boolean): IEnumerable<T>
    take(n: number): IEnumerable<T>
    takeLast(n: number): IEnumerable<T>
    takeWhile(predicate: (e: T) => boolean): IEnumerable<T>
    toDictionary(keySelector: (e: T) => number): { [key: number]: T }
    toDictionary(keySelector: (e: T) => string): { [key: string]: T }
    toDictionary<TValue>(keySelector: (e: T) => number, valueSelector?: (e: T) => TValue): { [key: number]: TValue }
    toDictionary<TValue>(keySelector: (e: T) => string, valueSelector?: (e: T) => TValue): { [key: string]: TValue }
    toDictionary<TValue>(keySelector: (e: T) => string | number, valueSelector: (e: T) => TValue): any
    toArray(): T[]
    union(set: EnumerableLike<T>, comparer: IEqualityComparer<T>): IEnumerable<T>
    zip<TRight, TResult>(set: EnumerableLike<TRight>, resultSelector: (left: T, right: TRight) => TResult): IEnumerable<TResult>
}

interface IGrouping<Tkey, TElement> extends IEnumerable<TElement> {
    key: Tkey;
}
interface IOrderedEnumerable<T> extends IEnumerable<T> {
    thenBy(selector: (e: T) => any): IOrderedEnumerable<T>;
    thenByDescending(selector: (e: T) => any): IOrderedEnumerable<T>;
}
