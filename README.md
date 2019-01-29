# Enumerable for Typescript

linq methods for typescript

## use

### Enumerable from array

    [1,2,3].asEnumerable();

### Enumerable from NodeList

    document.querySelectorAll('div').asEnumerable()

### Enumerable from generator

    function *gen(){
        for(let item of [1,2,3]){
            yield item;
        }
    }

    new Enumerable(gen);
or

    new Enumerable(function*() {
        for(let item of [1,2,3]) {
            yield item;
        }
    });

## use Enumerable

    Enumerable.range(0,5).select(x=>({id:x,name:`name-${x}`})).where(x=>x.id>3).toArray()
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
    owners.asEnumerable().groupJoin(pets, x => x.id, x => x.owner, x => x).toDictionary(x => x.key, x => x.toArray());
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
