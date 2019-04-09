define(["require", "exports", "tslib", "./Enumerable"], function (require, exports, tslib_1, Enumerable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Object.defineProperty(Array.prototype, 'asEnumerable', {
        value: function () {
            var ref = this;
            return new Enumerable_1.Enumerable(function () { return ref.values(); });
        }
    });
    Object.defineProperty(NodeList.prototype, 'asEnumerable', {
        value: function () {
            var ref = this;
            return new Enumerable_1.Enumerable(function () {
                var i, c;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            i = 0, c = ref.length;
                            _a.label = 1;
                        case 1:
                            if (!(i < c)) return [3 /*break*/, 4];
                            return [4 /*yield*/, ref.item(i)];
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
        }
    });
});
