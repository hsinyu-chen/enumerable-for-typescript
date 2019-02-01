import { Enumerable } from "./Enumerable";
Object.defineProperty(Array.prototype, 'asEnumerable', {
    value: function () {
        const ref = this;
        return new Enumerable(() => ref.values());
    }
});
Object.defineProperty(NodeList.prototype, 'asEnumerable', {
    value: function () {
        const ref = this;
        return new Enumerable(function* () {
            for (let i = 0, c = ref.length; i < c; i++) {
                yield ref.item(i);
            }
        });
    }
});
