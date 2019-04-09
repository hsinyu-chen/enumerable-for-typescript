define(["require", "exports", "./Enumerable"], function (require, exports, Enumerable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Object.defineProperty(Array.prototype, 'asEnumerable', {
        value: function () {
            const ref = this;
            return new Enumerable_1.Enumerable(() => ref.values());
        }
    });
    Object.defineProperty(NodeList.prototype, 'asEnumerable', {
        value: function () {
            const ref = this;
            return new Enumerable_1.Enumerable(function* () {
                for (let i = 0, c = ref.length; i < c; i++) {
                    yield ref.item(i);
                }
            });
        }
    });
});
