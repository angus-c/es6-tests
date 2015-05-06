describe('iterators', () => {
  describe('Symbol.iterator', () => {
    const s = Symbol.iterator;
    it.skip('is a symbol', () => {
      assert.equal(typeof s, 'symbol');
    });
    it('iterable types have a `Symbol.iterator` method', () => {
      assert.isObject([1,2,3][Symbol.iterator]());
      assert.isObject([1,2,3].keys()[Symbol.iterator]());
      assert.isObject('abc'[Symbol.iterator]());
      assert.isObject(new Map()[Symbol.iterator]());
      assert.isObject(new Set()[Symbol.iterator]());
      // assert.isObject(document.body[Symbol.iterator]());
      (()=>{assert.isObject(arguments[Symbol.iterator]());})(1,2,3);
    });
  });
});


