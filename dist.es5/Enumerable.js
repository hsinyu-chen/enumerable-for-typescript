define(["require", "exports", "tslib"], function (require, exports, tslib_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Enumerable = /** @class */ (function () {
        function Enumerable(source) {
            this.source = source;
        }
        Enumerable.prototype[Symbol.iterator] = function () {
            return this.getEnumerator();
        };
        Enumerable.empty = function () {
            return [].asEnumerable();
        };
        Enumerable.range = function (start, count) {
            return new Enumerable((function () {
                var i, c;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            i = start, c = start + count;
                            _a.label = 1;
                        case 1:
                            if (!(i < c)) return [3 /*break*/, 4];
                            return [4 /*yield*/, i];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            }));
        };
        Enumerable.repeat = function (item, count) {
            return new Enumerable(function () {
                var i;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < count)) return [3 /*break*/, 4];
                            return [4 /*yield*/, item];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        Enumerable.from = function (set) {
            if (set instanceof Array || set instanceof NodeList) {
                return set.asEnumerable();
            }
            if (typeof set === 'function') {
                return new Enumerable(set);
            }
            return set;
        };
        Enumerable.prototype.getEnumerator = function () {
            return this.source();
        };
        Enumerable.prototype.join = function (set, leftKeySelector, rightKeySelector, resultSelector, keyComparer) {
            if (keyComparer === void 0) { keyComparer = function (a, b) { return a === b; }; }
            var ref = this;
            return new Enumerable((function () {
                var e_1, _a, e_2, _b, e, ref_1, ref_1_1, item, e_3, e_3_1, right, e_2_1, e_1_1;
                return tslib_1.__generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            e = Enumerable.from(set);
                            _c.label = 1;
                        case 1:
                            _c.trys.push([1, 12, 13, 14]);
                            ref_1 = tslib_1.__values(ref), ref_1_1 = ref_1.next();
                            _c.label = 2;
                        case 2:
                            if (!!ref_1_1.done) return [3 /*break*/, 11];
                            item = ref_1_1.value;
                            _c.label = 3;
                        case 3:
                            _c.trys.push([3, 8, 9, 10]);
                            e_3 = tslib_1.__values(e), e_3_1 = e_3.next();
                            _c.label = 4;
                        case 4:
                            if (!!e_3_1.done) return [3 /*break*/, 7];
                            right = e_3_1.value;
                            if (!keyComparer(leftKeySelector(item), rightKeySelector(right))) return [3 /*break*/, 6];
                            return [4 /*yield*/, resultSelector(item, right)];
                        case 5:
                            _c.sent();
                            _c.label = 6;
                        case 6:
                            e_3_1 = e_3.next();
                            return [3 /*break*/, 4];
                        case 7: return [3 /*break*/, 10];
                        case 8:
                            e_2_1 = _c.sent();
                            e_2 = { error: e_2_1 };
                            return [3 /*break*/, 10];
                        case 9:
                            try {
                                if (e_3_1 && !e_3_1.done && (_b = e_3.return)) _b.call(e_3);
                            }
                            finally { if (e_2) throw e_2.error; }
                            return [7 /*endfinally*/];
                        case 10:
                            ref_1_1 = ref_1.next();
                            return [3 /*break*/, 2];
                        case 11: return [3 /*break*/, 14];
                        case 12:
                            e_1_1 = _c.sent();
                            e_1 = { error: e_1_1 };
                            return [3 /*break*/, 14];
                        case 13:
                            try {
                                if (ref_1_1 && !ref_1_1.done && (_a = ref_1.return)) _a.call(ref_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                            return [7 /*endfinally*/];
                        case 14: return [2 /*return*/];
                    }
                });
            }));
        };
        Enumerable.prototype.selectMany = function (memberSelector) {
            var ref = this;
            return new Enumerable((function () {
                var e_4, _a, e_5, _b, ref_2, ref_2_1, item, _c, _d, sItem, e_5_1, e_4_1;
                return tslib_1.__generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            _e.trys.push([0, 11, 12, 13]);
                            ref_2 = tslib_1.__values(ref), ref_2_1 = ref_2.next();
                            _e.label = 1;
                        case 1:
                            if (!!ref_2_1.done) return [3 /*break*/, 10];
                            item = ref_2_1.value;
                            _e.label = 2;
                        case 2:
                            _e.trys.push([2, 7, 8, 9]);
                            _c = tslib_1.__values(memberSelector(item)), _d = _c.next();
                            _e.label = 3;
                        case 3:
                            if (!!_d.done) return [3 /*break*/, 6];
                            sItem = _d.value;
                            return [4 /*yield*/, sItem];
                        case 4:
                            _e.sent();
                            _e.label = 5;
                        case 5:
                            _d = _c.next();
                            return [3 /*break*/, 3];
                        case 6: return [3 /*break*/, 9];
                        case 7:
                            e_5_1 = _e.sent();
                            e_5 = { error: e_5_1 };
                            return [3 /*break*/, 9];
                        case 8:
                            try {
                                if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                            }
                            finally { if (e_5) throw e_5.error; }
                            return [7 /*endfinally*/];
                        case 9:
                            ref_2_1 = ref_2.next();
                            return [3 /*break*/, 1];
                        case 10: return [3 /*break*/, 13];
                        case 11:
                            e_4_1 = _e.sent();
                            e_4 = { error: e_4_1 };
                            return [3 /*break*/, 13];
                        case 12:
                            try {
                                if (ref_2_1 && !ref_2_1.done && (_a = ref_2.return)) _a.call(ref_2);
                            }
                            finally { if (e_4) throw e_4.error; }
                            return [7 /*endfinally*/];
                        case 13: return [2 /*return*/];
                    }
                });
            }));
        };
        Enumerable.prototype.first = function (predicate) {
            var e_6, _a;
            var iter = (predicate ? this.where(predicate) : this);
            try {
                for (var iter_1 = tslib_1.__values(iter), iter_1_1 = iter_1.next(); !iter_1_1.done; iter_1_1 = iter_1.next()) {
                    var item = iter_1_1.value;
                    return item;
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (iter_1_1 && !iter_1_1.done && (_a = iter_1.return)) _a.call(iter_1);
                }
                finally { if (e_6) throw e_6.error; }
            }
            return undefined;
        };
        Enumerable.prototype.last = function (predicate) {
            var e_7, _a;
            var iter = (predicate ? this.where(predicate) : this);
            var last = undefined;
            try {
                for (var iter_2 = tslib_1.__values(iter), iter_2_1 = iter_2.next(); !iter_2_1.done; iter_2_1 = iter_2.next()) {
                    var e = iter_2_1.value;
                    last = e;
                }
            }
            catch (e_7_1) { e_7 = { error: e_7_1 }; }
            finally {
                try {
                    if (iter_2_1 && !iter_2_1.done && (_a = iter_2.return)) _a.call(iter_2);
                }
                finally { if (e_7) throw e_7.error; }
            }
            return last;
        };
        Enumerable.prototype.aggregate = function (fun, seed) {
            var e_8, _a;
            var result = seed;
            var idx = 0;
            try {
                for (var _b = tslib_1.__values(this), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var item = _c.value;
                    var i = idx++;
                    if (result === undefined) {
                        result = item;
                    }
                    else {
                        result = fun(result, item, i);
                    }
                }
            }
            catch (e_8_1) { e_8 = { error: e_8_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_8) throw e_8.error; }
            }
            return result;
        };
        Enumerable.prototype.select = function (selector) {
            return new SelectEnumerable(this.source, selector);
        };
        Enumerable.prototype.count = function () {
            var e_9, _a;
            var c = 0;
            try {
                for (var _b = tslib_1.__values(this), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var item = _c.value;
                    c++;
                }
            }
            catch (e_9_1) { e_9 = { error: e_9_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_9) throw e_9.error; }
            }
            return c;
        };
        Enumerable.prototype.orderByDescending = function (selector) {
            return new OrderedEnumerable([{ direction: "desc", selector: selector }], this);
        };
        Enumerable.prototype.oderBy = function (selector) {
            return new OrderedEnumerable([{ direction: "asc", selector: selector }], this);
        };
        Enumerable.prototype.sum = function (selector) {
            var iter = this.select(selector);
            return iter.aggregate(function (x, y) { return x + y; }, 0);
        };
        Enumerable.prototype.where = function (predicate) {
            return new WhereEnumerable(this.source, predicate);
        };
        Enumerable.prototype.contains = function (e, comparer) {
            if (comparer === void 0) { comparer = function (a, b) { return a === b; }; }
            return this.any(function (x) { return comparer(x, e); });
        };
        Enumerable.prototype.all = function (predicate) {
            var e_10, _a;
            try {
                for (var _b = tslib_1.__values(this), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var item = _c.value;
                    if (!predicate(item)) {
                        return false;
                    }
                }
            }
            catch (e_10_1) { e_10 = { error: e_10_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_10) throw e_10.error; }
            }
            return true;
        };
        Enumerable.prototype.any = function (predicate) {
            var e_11, _a;
            try {
                for (var _b = tslib_1.__values(this), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var item = _c.value;
                    if (predicate(item)) {
                        return true;
                    }
                }
            }
            catch (e_11_1) { e_11 = { error: e_11_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_11) throw e_11.error; }
            }
            return false;
        };
        Enumerable.prototype.append = function (newItem) {
            var ref = this;
            return new Enumerable(function () {
                var e_12, _a, ref_3, ref_3_1, item, e_12_1;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 5, 6, 7]);
                            ref_3 = tslib_1.__values(ref), ref_3_1 = ref_3.next();
                            _b.label = 1;
                        case 1:
                            if (!!ref_3_1.done) return [3 /*break*/, 4];
                            item = ref_3_1.value;
                            return [4 /*yield*/, item];
                        case 2:
                            _b.sent();
                            _b.label = 3;
                        case 3:
                            ref_3_1 = ref_3.next();
                            return [3 /*break*/, 1];
                        case 4: return [3 /*break*/, 7];
                        case 5:
                            e_12_1 = _b.sent();
                            e_12 = { error: e_12_1 };
                            return [3 /*break*/, 7];
                        case 6:
                            try {
                                if (ref_3_1 && !ref_3_1.done && (_a = ref_3.return)) _a.call(ref_3);
                            }
                            finally { if (e_12) throw e_12.error; }
                            return [7 /*endfinally*/];
                        case 7: return [4 /*yield*/, newItem];
                        case 8:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        Enumerable.prototype.concat = function (set) {
            var ref = this;
            return new Enumerable(function () {
                var e_13, _a, e_14, _b, ref_4, ref_4_1, item, e_13_1, _c, _d, item, e_14_1;
                return tslib_1.__generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            _e.trys.push([0, 5, 6, 7]);
                            ref_4 = tslib_1.__values(ref), ref_4_1 = ref_4.next();
                            _e.label = 1;
                        case 1:
                            if (!!ref_4_1.done) return [3 /*break*/, 4];
                            item = ref_4_1.value;
                            return [4 /*yield*/, item];
                        case 2:
                            _e.sent();
                            _e.label = 3;
                        case 3:
                            ref_4_1 = ref_4.next();
                            return [3 /*break*/, 1];
                        case 4: return [3 /*break*/, 7];
                        case 5:
                            e_13_1 = _e.sent();
                            e_13 = { error: e_13_1 };
                            return [3 /*break*/, 7];
                        case 6:
                            try {
                                if (ref_4_1 && !ref_4_1.done && (_a = ref_4.return)) _a.call(ref_4);
                            }
                            finally { if (e_13) throw e_13.error; }
                            return [7 /*endfinally*/];
                        case 7:
                            _e.trys.push([7, 12, 13, 14]);
                            _c = tslib_1.__values(Enumerable.from(set)), _d = _c.next();
                            _e.label = 8;
                        case 8:
                            if (!!_d.done) return [3 /*break*/, 11];
                            item = _d.value;
                            return [4 /*yield*/, item];
                        case 9:
                            _e.sent();
                            _e.label = 10;
                        case 10:
                            _d = _c.next();
                            return [3 /*break*/, 8];
                        case 11: return [3 /*break*/, 14];
                        case 12:
                            e_14_1 = _e.sent();
                            e_14 = { error: e_14_1 };
                            return [3 /*break*/, 14];
                        case 13:
                            try {
                                if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                            }
                            finally { if (e_14) throw e_14.error; }
                            return [7 /*endfinally*/];
                        case 14:
                            ;
                            return [2 /*return*/];
                    }
                });
            });
        };
        Enumerable.prototype.defaultIfEmpty = function (defaultItem) {
            var ref = this;
            return new Enumerable(function () {
                var e_15, _a, hasItem, ref_5, ref_5_1, item, e_15_1;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            hasItem = false;
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 6, 7, 8]);
                            ref_5 = tslib_1.__values(ref), ref_5_1 = ref_5.next();
                            _b.label = 2;
                        case 2:
                            if (!!ref_5_1.done) return [3 /*break*/, 5];
                            item = ref_5_1.value;
                            hasItem = true;
                            return [4 /*yield*/, item];
                        case 3:
                            _b.sent();
                            _b.label = 4;
                        case 4:
                            ref_5_1 = ref_5.next();
                            return [3 /*break*/, 2];
                        case 5: return [3 /*break*/, 8];
                        case 6:
                            e_15_1 = _b.sent();
                            e_15 = { error: e_15_1 };
                            return [3 /*break*/, 8];
                        case 7:
                            try {
                                if (ref_5_1 && !ref_5_1.done && (_a = ref_5.return)) _a.call(ref_5);
                            }
                            finally { if (e_15) throw e_15.error; }
                            return [7 /*endfinally*/];
                        case 8:
                            if (!!hasItem) return [3 /*break*/, 10];
                            return [4 /*yield*/, defaultItem];
                        case 9:
                            _b.sent();
                            _b.label = 10;
                        case 10: return [2 /*return*/];
                    }
                });
            });
        };
        Enumerable.prototype.distinct = function (comparer) {
            if (comparer === void 0) { comparer = function (a, b) { return a === b; }; }
            var ref = this;
            return new Enumerable(function () {
                var e_16, _a, cache, _loop_1, ref_6, ref_6_1, item, e_16_1;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            cache = [];
                            _loop_1 = function (item) {
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(cache.findIndex(function (x) { return comparer(x, item); }) === -1)) return [3 /*break*/, 2];
                                            cache.push(item);
                                            return [4 /*yield*/, item];
                                        case 1:
                                            _a.sent();
                                            _a.label = 2;
                                        case 2: return [2 /*return*/];
                                    }
                                });
                            };
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 6, 7, 8]);
                            ref_6 = tslib_1.__values(ref), ref_6_1 = ref_6.next();
                            _b.label = 2;
                        case 2:
                            if (!!ref_6_1.done) return [3 /*break*/, 5];
                            item = ref_6_1.value;
                            return [5 /*yield**/, _loop_1(item)];
                        case 3:
                            _b.sent();
                            _b.label = 4;
                        case 4:
                            ref_6_1 = ref_6.next();
                            return [3 /*break*/, 2];
                        case 5: return [3 /*break*/, 8];
                        case 6:
                            e_16_1 = _b.sent();
                            e_16 = { error: e_16_1 };
                            return [3 /*break*/, 8];
                        case 7:
                            try {
                                if (ref_6_1 && !ref_6_1.done && (_a = ref_6.return)) _a.call(ref_6);
                            }
                            finally { if (e_16) throw e_16.error; }
                            return [7 /*endfinally*/];
                        case 8: return [2 /*return*/];
                    }
                });
            });
        };
        Enumerable.prototype.elementAt = function (n) {
            var e_17, _a;
            try {
                for (var _b = tslib_1.__values(this), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var item = _c.value;
                    if (n-- === 0) {
                        return item;
                    }
                }
            }
            catch (e_17_1) { e_17 = { error: e_17_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_17) throw e_17.error; }
            }
            return undefined;
        };
        Enumerable.prototype.except = function (set, comparer) {
            if (comparer === void 0) { comparer = function (a, b) { return a === b; }; }
            var ref = this;
            return new Enumerable(function () {
                var e_18, _a, e, ref_7, ref_7_1, item, e_18_1;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            e = Enumerable.from(set);
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 6, 7, 8]);
                            ref_7 = tslib_1.__values(ref), ref_7_1 = ref_7.next();
                            _b.label = 2;
                        case 2:
                            if (!!ref_7_1.done) return [3 /*break*/, 5];
                            item = ref_7_1.value;
                            if (!!e.contains(item, comparer)) return [3 /*break*/, 4];
                            return [4 /*yield*/, item];
                        case 3:
                            _b.sent();
                            _b.label = 4;
                        case 4:
                            ref_7_1 = ref_7.next();
                            return [3 /*break*/, 2];
                        case 5: return [3 /*break*/, 8];
                        case 6:
                            e_18_1 = _b.sent();
                            e_18 = { error: e_18_1 };
                            return [3 /*break*/, 8];
                        case 7:
                            try {
                                if (ref_7_1 && !ref_7_1.done && (_a = ref_7.return)) _a.call(ref_7);
                            }
                            finally { if (e_18) throw e_18.error; }
                            return [7 /*endfinally*/];
                        case 8: return [2 /*return*/];
                    }
                });
            });
        };
        Enumerable.prototype.groupBy = function (keySelector, resultSelector, keyComparer) {
            if (resultSelector === void 0) { resultSelector = function (x) { return x; }; }
            if (keyComparer === void 0) { keyComparer = function (a, b) { return a === b; }; }
            var ref = this;
            return new Enumerable(function () {
                var e_19, _a, keyCache, _loop_2, ref_8, ref_8_1, item, e_19_1;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            keyCache = [];
                            _loop_2 = function (item) {
                                var key;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            key = keySelector(item);
                                            if (!(keyCache.findIndex(function (x) { return keyComparer(x, key); }) === -1)) return [3 /*break*/, 2];
                                            keyCache.push(key);
                                            return [4 /*yield*/, resultSelector(new Grouping(ref.where(function (x) { return keyComparer(keySelector(x), key); }), key))];
                                        case 1:
                                            _a.sent();
                                            _a.label = 2;
                                        case 2: return [2 /*return*/];
                                    }
                                });
                            };
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 6, 7, 8]);
                            ref_8 = tslib_1.__values(ref), ref_8_1 = ref_8.next();
                            _b.label = 2;
                        case 2:
                            if (!!ref_8_1.done) return [3 /*break*/, 5];
                            item = ref_8_1.value;
                            return [5 /*yield**/, _loop_2(item)];
                        case 3:
                            _b.sent();
                            _b.label = 4;
                        case 4:
                            ref_8_1 = ref_8.next();
                            return [3 /*break*/, 2];
                        case 5: return [3 /*break*/, 8];
                        case 6:
                            e_19_1 = _b.sent();
                            e_19 = { error: e_19_1 };
                            return [3 /*break*/, 8];
                        case 7:
                            try {
                                if (ref_8_1 && !ref_8_1.done && (_a = ref_8.return)) _a.call(ref_8);
                            }
                            finally { if (e_19) throw e_19.error; }
                            return [7 /*endfinally*/];
                        case 8: return [2 /*return*/];
                    }
                });
            });
        };
        Enumerable.prototype.groupJoin = function (set, letKeySelector, rightKeySelector, resultSelector, keyComparer) {
            if (resultSelector === void 0) { resultSelector = function (x) { return x; }; }
            if (keyComparer === void 0) { keyComparer = function (a, b) { return a === b; }; }
            var ref = this;
            return new Enumerable(function () {
                var e_20, _a, e, _loop_3, ref_9, ref_9_1, item, e_20_1;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            e = Enumerable.from(set);
                            _loop_3 = function (item) {
                                var leftKey, sset;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            leftKey = letKeySelector(item);
                                            sset = e.where(function (x) { return keyComparer(leftKey, rightKeySelector(x)); });
                                            return [4 /*yield*/, resultSelector(new Grouping(sset, leftKey))];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            };
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 6, 7, 8]);
                            ref_9 = tslib_1.__values(ref), ref_9_1 = ref_9.next();
                            _b.label = 2;
                        case 2:
                            if (!!ref_9_1.done) return [3 /*break*/, 5];
                            item = ref_9_1.value;
                            return [5 /*yield**/, _loop_3(item)];
                        case 3:
                            _b.sent();
                            _b.label = 4;
                        case 4:
                            ref_9_1 = ref_9.next();
                            return [3 /*break*/, 2];
                        case 5: return [3 /*break*/, 8];
                        case 6:
                            e_20_1 = _b.sent();
                            e_20 = { error: e_20_1 };
                            return [3 /*break*/, 8];
                        case 7:
                            try {
                                if (ref_9_1 && !ref_9_1.done && (_a = ref_9.return)) _a.call(ref_9);
                            }
                            finally { if (e_20) throw e_20.error; }
                            return [7 /*endfinally*/];
                        case 8: return [2 /*return*/];
                    }
                });
            });
        };
        Enumerable.prototype.intersect = function (set, comparer) {
            if (comparer === void 0) { comparer = function (a, b) { return a === b; }; }
            var ref = this;
            return new Enumerable(function () {
                var e_21, _a, e, ref_10, ref_10_1, item, e_21_1;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            e = Enumerable.from(set);
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 6, 7, 8]);
                            ref_10 = tslib_1.__values(ref), ref_10_1 = ref_10.next();
                            _b.label = 2;
                        case 2:
                            if (!!ref_10_1.done) return [3 /*break*/, 5];
                            item = ref_10_1.value;
                            if (!e.contains(item, comparer)) return [3 /*break*/, 4];
                            return [4 /*yield*/, item];
                        case 3:
                            _b.sent();
                            _b.label = 4;
                        case 4:
                            ref_10_1 = ref_10.next();
                            return [3 /*break*/, 2];
                        case 5: return [3 /*break*/, 8];
                        case 6:
                            e_21_1 = _b.sent();
                            e_21 = { error: e_21_1 };
                            return [3 /*break*/, 8];
                        case 7:
                            try {
                                if (ref_10_1 && !ref_10_1.done && (_a = ref_10.return)) _a.call(ref_10);
                            }
                            finally { if (e_21) throw e_21.error; }
                            return [7 /*endfinally*/];
                        case 8: return [2 /*return*/];
                    }
                });
            });
        };
        Enumerable.prototype.max = function (memberSelector) {
            return this.aggregate(function (x, y) { return memberSelector(y) > memberSelector(x) ? y : x; });
        };
        Enumerable.prototype.min = function (memberSelector) {
            return this.aggregate(function (x, y) { return memberSelector(y) > memberSelector(x) ? x : y; });
        };
        Enumerable.prototype.average = function (selector) {
            var e_22, _a;
            var sum = 0;
            var count = 0;
            try {
                for (var _b = tslib_1.__values(this), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var item = _c.value;
                    count++;
                    sum += selector(item);
                }
            }
            catch (e_22_1) { e_22 = { error: e_22_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_22) throw e_22.error; }
            }
            if (count === 0) {
                throw new Error('no item in source');
            }
            return sum / count;
        };
        Enumerable.prototype.prepend = function (newItem) {
            var ref = this;
            return new Enumerable(function () {
                var e_23, _a, ref_11, ref_11_1, item, e_23_1;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, newItem];
                        case 1:
                            _b.sent();
                            _b.label = 2;
                        case 2:
                            _b.trys.push([2, 7, 8, 9]);
                            ref_11 = tslib_1.__values(ref), ref_11_1 = ref_11.next();
                            _b.label = 3;
                        case 3:
                            if (!!ref_11_1.done) return [3 /*break*/, 6];
                            item = ref_11_1.value;
                            return [4 /*yield*/, item];
                        case 4:
                            _b.sent();
                            _b.label = 5;
                        case 5:
                            ref_11_1 = ref_11.next();
                            return [3 /*break*/, 3];
                        case 6: return [3 /*break*/, 9];
                        case 7:
                            e_23_1 = _b.sent();
                            e_23 = { error: e_23_1 };
                            return [3 /*break*/, 9];
                        case 8:
                            try {
                                if (ref_11_1 && !ref_11_1.done && (_a = ref_11.return)) _a.call(ref_11);
                            }
                            finally { if (e_23) throw e_23.error; }
                            return [7 /*endfinally*/];
                        case 9: return [2 /*return*/];
                    }
                });
            });
        };
        Enumerable.prototype.reverse = function () {
            var ref = this;
            return new Enumerable(function () {
                var e_24, _a, cache, ref_12, ref_12_1, item, i;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            cache = [];
                            try {
                                for (ref_12 = tslib_1.__values(ref), ref_12_1 = ref_12.next(); !ref_12_1.done; ref_12_1 = ref_12.next()) {
                                    item = ref_12_1.value;
                                    cache.push(item);
                                }
                            }
                            catch (e_24_1) { e_24 = { error: e_24_1 }; }
                            finally {
                                try {
                                    if (ref_12_1 && !ref_12_1.done && (_a = ref_12.return)) _a.call(ref_12);
                                }
                                finally { if (e_24) throw e_24.error; }
                            }
                            i = cache.length - 1;
                            _b.label = 1;
                        case 1:
                            if (!(i > 0)) return [3 /*break*/, 4];
                            return [4 /*yield*/, cache[i]];
                        case 2:
                            _b.sent();
                            _b.label = 3;
                        case 3:
                            i--;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        Enumerable.prototype.sequenceEqual = function (set, comparer) {
            if (comparer === void 0) { comparer = function (a, b) { return a === b; }; }
            var e = Enumerable.from(set);
            var leftIter = this[Symbol.iterator]();
            var rightIter = e[Symbol.iterator]();
            var left = leftIter.next();
            var right = rightIter.next();
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
        };
        Enumerable.prototype.skip = function (n) {
            var ref = this;
            return new Enumerable((function () {
                var e_25, _a, c, ref_13, ref_13_1, item, e_25_1;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            c = n;
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 6, 7, 8]);
                            ref_13 = tslib_1.__values(ref), ref_13_1 = ref_13.next();
                            _b.label = 2;
                        case 2:
                            if (!!ref_13_1.done) return [3 /*break*/, 5];
                            item = ref_13_1.value;
                            if (c-- > 0) {
                                return [3 /*break*/, 4];
                            }
                            return [4 /*yield*/, item];
                        case 3:
                            _b.sent();
                            _b.label = 4;
                        case 4:
                            ref_13_1 = ref_13.next();
                            return [3 /*break*/, 2];
                        case 5: return [3 /*break*/, 8];
                        case 6:
                            e_25_1 = _b.sent();
                            e_25 = { error: e_25_1 };
                            return [3 /*break*/, 8];
                        case 7:
                            try {
                                if (ref_13_1 && !ref_13_1.done && (_a = ref_13.return)) _a.call(ref_13);
                            }
                            finally { if (e_25) throw e_25.error; }
                            return [7 /*endfinally*/];
                        case 8: return [2 /*return*/];
                    }
                });
            }));
        };
        Enumerable.prototype.skipLast = function (n) {
            var ref = this;
            return new Enumerable((function () {
                var cache, i, c;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            cache = ref.toArray();
                            i = 0, c = cache.length - n;
                            _a.label = 1;
                        case 1:
                            if (!(i < c)) return [3 /*break*/, 4];
                            return [4 /*yield*/, cache[i]];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            }));
        };
        Enumerable.prototype.skipWhile = function (predicate) {
            var ref = this;
            return new Enumerable((function () {
                var e_26, _a, skipping, idx, ref_14, ref_14_1, item, i, e_26_1;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            skipping = true;
                            idx = 0;
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 9, 10, 11]);
                            ref_14 = tslib_1.__values(ref), ref_14_1 = ref_14.next();
                            _b.label = 2;
                        case 2:
                            if (!!ref_14_1.done) return [3 /*break*/, 8];
                            item = ref_14_1.value;
                            i = idx++;
                            if (!skipping) return [3 /*break*/, 5];
                            if (!!predicate(item, i)) return [3 /*break*/, 4];
                            skipping = false;
                            return [4 /*yield*/, item];
                        case 3:
                            _b.sent();
                            _b.label = 4;
                        case 4: return [3 /*break*/, 7];
                        case 5: return [4 /*yield*/, item];
                        case 6:
                            _b.sent();
                            _b.label = 7;
                        case 7:
                            ref_14_1 = ref_14.next();
                            return [3 /*break*/, 2];
                        case 8: return [3 /*break*/, 11];
                        case 9:
                            e_26_1 = _b.sent();
                            e_26 = { error: e_26_1 };
                            return [3 /*break*/, 11];
                        case 10:
                            try {
                                if (ref_14_1 && !ref_14_1.done && (_a = ref_14.return)) _a.call(ref_14);
                            }
                            finally { if (e_26) throw e_26.error; }
                            return [7 /*endfinally*/];
                        case 11: return [2 /*return*/];
                    }
                });
            }));
        };
        Enumerable.prototype.take = function (n) {
            var ref = this;
            return new Enumerable((function () {
                var e_27, _a, c, ref_15, ref_15_1, item, e_27_1;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            c = n;
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 7, 8, 9]);
                            ref_15 = tslib_1.__values(ref), ref_15_1 = ref_15.next();
                            _b.label = 2;
                        case 2:
                            if (!!ref_15_1.done) return [3 /*break*/, 6];
                            item = ref_15_1.value;
                            if (!(c-- > 0)) return [3 /*break*/, 4];
                            return [4 /*yield*/, item];
                        case 3:
                            _b.sent();
                            return [3 /*break*/, 5];
                        case 4: return [3 /*break*/, 6];
                        case 5:
                            ref_15_1 = ref_15.next();
                            return [3 /*break*/, 2];
                        case 6: return [3 /*break*/, 9];
                        case 7:
                            e_27_1 = _b.sent();
                            e_27 = { error: e_27_1 };
                            return [3 /*break*/, 9];
                        case 8:
                            try {
                                if (ref_15_1 && !ref_15_1.done && (_a = ref_15.return)) _a.call(ref_15);
                            }
                            finally { if (e_27) throw e_27.error; }
                            return [7 /*endfinally*/];
                        case 9: return [2 /*return*/];
                    }
                });
            }));
        };
        Enumerable.prototype.takeLast = function (n) {
            var ref = this;
            return new Enumerable((function () {
                var cache, i, c;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            cache = ref.toArray();
                            i = cache.length - n, c = cache.length;
                            _a.label = 1;
                        case 1:
                            if (!(i < c)) return [3 /*break*/, 4];
                            return [4 /*yield*/, cache[i]];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            }));
        };
        Enumerable.prototype.takeWhile = function (predicate) {
            var ref = this;
            return new Enumerable((function () {
                var e_28, _a, ref_16, ref_16_1, item, e_28_1;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 6, 7, 8]);
                            ref_16 = tslib_1.__values(ref), ref_16_1 = ref_16.next();
                            _b.label = 1;
                        case 1:
                            if (!!ref_16_1.done) return [3 /*break*/, 5];
                            item = ref_16_1.value;
                            if (!predicate(item)) return [3 /*break*/, 3];
                            return [4 /*yield*/, item];
                        case 2:
                            _b.sent();
                            return [3 /*break*/, 4];
                        case 3: return [3 /*break*/, 5];
                        case 4:
                            ref_16_1 = ref_16.next();
                            return [3 /*break*/, 1];
                        case 5: return [3 /*break*/, 8];
                        case 6:
                            e_28_1 = _b.sent();
                            e_28 = { error: e_28_1 };
                            return [3 /*break*/, 8];
                        case 7:
                            try {
                                if (ref_16_1 && !ref_16_1.done && (_a = ref_16.return)) _a.call(ref_16);
                            }
                            finally { if (e_28) throw e_28.error; }
                            return [7 /*endfinally*/];
                        case 8: return [2 /*return*/];
                    }
                });
            }));
        };
        Enumerable.prototype.toDictionary = function (keySelector, valueSelector) {
            if (valueSelector === void 0) { valueSelector = function (e) { return e; }; }
            var e_29, _a;
            var result = {};
            try {
                for (var _b = tslib_1.__values(this), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var item = _c.value;
                    result[keySelector(item)] = valueSelector(item);
                }
            }
            catch (e_29_1) { e_29 = { error: e_29_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_29) throw e_29.error; }
            }
            return result;
        };
        Enumerable.prototype.toArray = function () {
            return Array.from(this.source());
        };
        Enumerable.prototype.union = function (set, comparer) {
            if (comparer === void 0) { comparer = function (a, b) { return a === b; }; }
            return this.concat(set).distinct(comparer);
        };
        Enumerable.prototype.zip = function (set, resultSelector) {
            var ref = this;
            return new Enumerable((function () {
                var e, leftIter, rightIter, left, rihght;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            e = Enumerable.from(set);
                            leftIter = ref[Symbol.iterator]();
                            rightIter = e[Symbol.iterator]();
                            left = leftIter.next();
                            rihght = rightIter.next();
                            _a.label = 1;
                        case 1:
                            if (!(!left.done && !rihght.done)) return [3 /*break*/, 4];
                            if (!(!left.done && !rihght.done)) return [3 /*break*/, 3];
                            return [4 /*yield*/, resultSelector(left.value, rihght.value)];
                        case 2:
                            _a.sent();
                            left = leftIter.next();
                            rihght = rightIter.next();
                            _a.label = 3;
                        case 3: return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            }));
        };
        return Enumerable;
    }());
    exports.Enumerable = Enumerable;
    var SelectEnumerable = /** @class */ (function (_super) {
        tslib_1.__extends(SelectEnumerable, _super);
        function SelectEnumerable(source, selector) {
            var _this = _super.call(this, function () {
                var e_30, _a, idx, _b, _c, item, e_30_1;
                return tslib_1.__generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            idx = 0;
                            _d.label = 1;
                        case 1:
                            _d.trys.push([1, 6, 7, 8]);
                            _b = tslib_1.__values(source()), _c = _b.next();
                            _d.label = 2;
                        case 2:
                            if (!!_c.done) return [3 /*break*/, 5];
                            item = _c.value;
                            return [4 /*yield*/, selector(item, idx++)];
                        case 3:
                            _d.sent();
                            _d.label = 4;
                        case 4:
                            _c = _b.next();
                            return [3 /*break*/, 2];
                        case 5: return [3 /*break*/, 8];
                        case 6:
                            e_30_1 = _d.sent();
                            e_30 = { error: e_30_1 };
                            return [3 /*break*/, 8];
                        case 7:
                            try {
                                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                            }
                            finally { if (e_30) throw e_30.error; }
                            return [7 /*endfinally*/];
                        case 8: return [2 /*return*/];
                    }
                });
            }) || this;
            _this.selector = selector;
            _this.oSource = source;
            return _this;
        }
        SelectEnumerable.prototype.select = function (selector) {
            var _this = this;
            return new SelectEnumerable(this.oSource, function (e, i) { return selector(_this.selector(e, i), i); });
        };
        return SelectEnumerable;
    }(Enumerable));
    var WhereEnumerable = /** @class */ (function (_super) {
        tslib_1.__extends(WhereEnumerable, _super);
        function WhereEnumerable(source, predicate) {
            var _this = _super.call(this, function () {
                var e_31, _a, idx, _b, _c, item, e_31_1;
                return tslib_1.__generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            idx = 0;
                            _d.label = 1;
                        case 1:
                            _d.trys.push([1, 6, 7, 8]);
                            _b = tslib_1.__values(source()), _c = _b.next();
                            _d.label = 2;
                        case 2:
                            if (!!_c.done) return [3 /*break*/, 5];
                            item = _c.value;
                            if (!predicate(item, idx++)) return [3 /*break*/, 4];
                            return [4 /*yield*/, item];
                        case 3:
                            _d.sent();
                            _d.label = 4;
                        case 4:
                            _c = _b.next();
                            return [3 /*break*/, 2];
                        case 5: return [3 /*break*/, 8];
                        case 6:
                            e_31_1 = _d.sent();
                            e_31 = { error: e_31_1 };
                            return [3 /*break*/, 8];
                        case 7:
                            try {
                                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                            }
                            finally { if (e_31) throw e_31.error; }
                            return [7 /*endfinally*/];
                        case 8: return [2 /*return*/];
                    }
                });
            }) || this;
            _this.predicate = predicate;
            _this.oSource = source;
            return _this;
        }
        WhereEnumerable.prototype.where = function (predicate) {
            var _this = this;
            return new WhereEnumerable(this.oSource, function (e, i) { return _this.predicate(e, i) && predicate(e, i); });
        };
        return WhereEnumerable;
    }(Enumerable));
    var Grouping = /** @class */ (function (_super) {
        tslib_1.__extends(Grouping, _super);
        function Grouping(set, key) {
            var _this = _super.call(this, function () { return set.getEnumerator(); }) || this;
            _this.key = key;
            return _this;
        }
        return Grouping;
    }(Enumerable));
    var OrderedEnumerable = /** @class */ (function (_super) {
        tslib_1.__extends(OrderedEnumerable, _super);
        function OrderedEnumerable(orderCommands, source) {
            var _this = _super.call(this, (function () {
                var e_32, _a, arr, arr_1, arr_1_1, item, e_32_1;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            arr = source.toArray();
                            arr.sort(function (a, b) {
                                var e_33, _a;
                                try {
                                    for (var orderCommands_1 = tslib_1.__values(orderCommands), orderCommands_1_1 = orderCommands_1.next(); !orderCommands_1_1.done; orderCommands_1_1 = orderCommands_1.next()) {
                                        var cmd = orderCommands_1_1.value;
                                        var pa = cmd.selector(a);
                                        var pb = cmd.selector(b);
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
                                }
                                catch (e_33_1) { e_33 = { error: e_33_1 }; }
                                finally {
                                    try {
                                        if (orderCommands_1_1 && !orderCommands_1_1.done && (_a = orderCommands_1.return)) _a.call(orderCommands_1);
                                    }
                                    finally { if (e_33) throw e_33.error; }
                                }
                                return 0;
                            });
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 6, 7, 8]);
                            arr_1 = tslib_1.__values(arr), arr_1_1 = arr_1.next();
                            _b.label = 2;
                        case 2:
                            if (!!arr_1_1.done) return [3 /*break*/, 5];
                            item = arr_1_1.value;
                            return [4 /*yield*/, item];
                        case 3:
                            _b.sent();
                            _b.label = 4;
                        case 4:
                            arr_1_1 = arr_1.next();
                            return [3 /*break*/, 2];
                        case 5: return [3 /*break*/, 8];
                        case 6:
                            e_32_1 = _b.sent();
                            e_32 = { error: e_32_1 };
                            return [3 /*break*/, 8];
                        case 7:
                            try {
                                if (arr_1_1 && !arr_1_1.done && (_a = arr_1.return)) _a.call(arr_1);
                            }
                            finally { if (e_32) throw e_32.error; }
                            return [7 /*endfinally*/];
                        case 8: return [2 /*return*/];
                    }
                });
            })) || this;
            _this.orderCommands = orderCommands;
            return _this;
        }
        OrderedEnumerable.prototype.thenBy = function (selector) {
            return new OrderedEnumerable(this.orderCommands.concat([{ direction: "asc", selector: selector }]), this);
        };
        OrderedEnumerable.prototype.thenByDescending = function (selector) {
            return new OrderedEnumerable(this.orderCommands.concat([{ direction: "desc", selector: selector }]), this);
        };
        return OrderedEnumerable;
    }(Enumerable));
});
