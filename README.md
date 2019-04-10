# Enumerable for Typescript

Enumerable for typescript  base on es6 generator

## build

```npm install```

```npm run build```

## use

for typescript:

    import 'src/Enumerable.patch';

in your index script to patch Array and NodeList

    import { Enumerable } from 'src/Enumerable';

on script you want to use Enumerable

for javascript:

  you need require.js to load module
  
  ```html
    <script src="require.js"></script>
    <script>
         require(['../dist/Enumerable.js', '../dist/Enumerable.patch.js'], function (module) {
            var Enumerable = module.Enumerable;
            //... your code here..
         });
    </script>
  ```

  see sample/index.html for more detail

### Enumerable from array

```typescript
[1,2,3].asEnumerable();
```

### Enumerable from NodeList

```typescript
document.querySelectorAll('div').asEnumerable()
```

### Enumerable from generator

```typescript
function *gen(){
    yield 1;
    yield 2;
    yield 3;
}
new Enumerable(gen);
```
or
```typescript
new Enumerable(function*() {
    for(let item of [1,2,3]) {
        yield 1;
        yield 2;
        yield 3;
    }
});
```

## use Enumerable
    
```typescript
Enumerable.range(0, 5)
    .select(x => ({ id: x, name: `name-${x}` }))
    .where(x => x.id > 3)
    .toArray()
// output
// [{id: 4, name: "name-4"}]

var owners = [
    { id: 1, name: 'a' },
    { id: 2, name: 'b' },
    { id: 3, name: 'c' }
];
var pets = [
    { owner: 1, name: 'pet-a' },
    { owner: 1, name: 'pet-b' },
    { owner: 2, name: 'pet-c' }
];
owners.asEnumerable()
    .groupJoin(pets, x => x.id, x => x.owner)
    .toDictionary(x => x.key, x => x.toArray());
// output
/*
{
    "1": [
        { "owner": 1, "name": "pet-a" },
        { "owner": 1, "name": "pet-b" }
    ],
    "2": [
        { "owner": 2, "name": "pet-c" }
    ],
    "3": []
}
*/
```

## implemented function

### staitc

    empty
    range
    repeat

### instnace

    join
    selectMany
    first
    last
    aggregate
    select
    count
    orderByDescending
    oderBy
    thenBy
    thenByDescending
    sum
    where
    contains
    all
    any
    append
    concat
    defaultIfEmpty
    distinct
    elementAt
    except
    groupBy
    groupJoin
    intersect
    max
    min
    average
    prepend
    reverse
    sequenceEqual
    skip
    skipLast
    skipWhile
    take
    takeLast
    takeWhile
    toDictionary
    toArray
    union
    zip
