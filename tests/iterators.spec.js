describe('iterators', () => {
  const allIterables = [
    [1,2,3],
    [1,2,3].keys(),
    [1,2,3].entries(),
    'abc',
    new Map([[1, 'one'], [2, 'two']]),
    new Set([1, 2, 2, 3])
    // new WeakMap()
    // document.body
  ];

  describe('Symbol.iterator', () => {
    const s = Symbol.iterator;
    it.skip('is a symbol', () => {
      assert.equal(typeof s, 'symbol');
    });
    it('(allIterables) have a `Symbol.iterator` method', () => {
      allIterables.forEach((iterable) => {
        assert.isObject(iterable[Symbol.iterator]());
      });
      (()=>{assert.isObject(arguments[Symbol.iterator]());})(1,2,3);
    });
  });

  describe('next()', () => {
    const arrayLikeIterables = [
      [1,2,3],
      'abc',
    ];
    const mapLikeIterables = [
      [1,2,3].keys(),
      [1,2,3].entries(),
      new Map([[1, 'one'], [2, 'two']]),
      new Set([1, 2, 2, 4])/*,
      document.body */
    ];
    let iterator, next, count;
    it('works with for arrayLikeIterables', () => {
      arrayLikeIterables.forEach((iterable) => {
        iterator = iterable[Symbol.iterator]();
        count = 0;
        while ((next = iterator.next().value) != null) {
          assert(next, iterable[count++]);
          count++;
        }
      });
    });
    it('works with for mapLikeIterables', () => {
      mapLikeIterables.forEach((iterable) => {
        let toArray = [...iterable];
        iterator = iterable[Symbol.iterator]();
        count = 0;
        while ((next = iterator.next().value) != null) {
          assert(next, toArray[count++]);
          count++;
        }
      });
    });
    it('returns done when no more items', () => {
      allIterables.forEach((iterable) => {
        iterator = iterable[Symbol.iterator]();
        while (next = iterator.next(), next.value != null);
        assert.deepEqual(next, {value: undefined, done: true});
      });
    });
  });

  describe('for-of', () => {
    const arrayLikeIterables = [
      [1,2,3],
      'abc',
    ];
    const mapLikeIterables = [
      [1,2,3].keys(),
      [1,2,3].entries(),
      new Map([[1, 'one'], [2, 'two']]),
      new Set([1, 2, 2, 4])/*,
      document.body */
    ];
    let count;
    it('works for arrayLikeIterables', () => {
      arrayLikeIterables.forEach((iterable) => {
        count = 0;
        for (let x of iterable) {
          assert.equal(x, iterable[count++]);
        }
      });
    });
    it('works for mapLikeIterables', () => {
      mapLikeIterables.forEach((iterable) => {
        let toArray = [...iterable];
        count = 0;
        for (let x of iterable) {
          if (typeof x == 'object') {
            assert.sameMembers(x, toArray[count++]);
          } else {
            assert.equal(x, toArray[count++]);
          }
        }
      });
    });
  });
});


