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
    const arrayLikeIterables = [
      [1,2,3],
      'abc',
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
    const mapLikeIterables = [
      [1,2,3].keys(),
      [1,2,3].entries(),
      new Map([[1, 'one'], [2, 'two']]),
      new Set([1, 2, 2, 4])/*,
      document.body */
    ];
    it('works for mapLikeIterables', () => {
      mapLikeIterables.forEach((iterable) => {
        let toArray = [...iterable];
        count = 0;
        for (let x of iterable) {
          console.log(x);
          console.log(toArray[count]);
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


