describe('iterators', () => {
  const iterables = [
    [1,2,3],
    [1,2,3].keys(),
    [1,2,3].entries(),
    'abc',
    new Map([[1, 'one'], [2, 'two']]),
    new Set([1, 2, 2, 3])
    // new WeakMap(),
    // document.body
  ];
  describe('Symbol.iterator', () => {
    const s = Symbol.iterator;
    it.skip('is a symbol', () => {
      assert.equal(typeof s, 'symbol');
    });
    it('(iterables) have a `Symbol.iterator` method', () => {
      iterables.forEach((iterable) => {
        assert.isObject(iterable[Symbol.iterator]());
      });
      (()=>{assert.isObject(arguments[Symbol.iterator]());})(1,2,3);
    });
  });
  describe('for-of', () => {
    const iterables = [
      [1,2,3],
      // [1,2,3].keys(),
      // [1,2,3].entries(),
      'abc',
      // new Map([[1, 'one'], [2, 'two']]),
      // new Set([1, 2, 2, 3])
      // document.body
    ];
    let count;
    it('iterables have a `Symbol.iterator` method', () => {
      iterables.forEach((iterable) => {
        count = 0;
        for (let x of iterable) {
          console.log(x, count, iterable[count], iterable);
          assert.equal(x, iterable[count++]);
        }
      });
    });
  });
});


