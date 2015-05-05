https://people.mozilla.org/~jorendorff/es6-draft.html#sec-symbol-objects
describe('Symbols', () => {

  // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-ecmascript-language-types-symbol-type
  describe('data type', () => {
    it('has typeof \'symbol\''), () => {
      assert.equal(typeof Symbol('x'), 'symbol');
    }
    it('has an arity of 1', () => {
      assert.isTrue(Symbol.length == 1);
    });
    it('does not allow `new` with the constructor', () => {
      assert.throws(() => {new Symbol()}, Error);
    });
  });

  describe('uniqueness', () => {
    it('is unique without description', () => {
      assert.isTrue(Symbol() !== Symbol());
      assert.isTrue(Symbol() != Symbol());
    });
    it('is unique with same description', () => {
      assert.isTrue(Symbol('x') !== Symbol('x'));
      assert.isTrue(Symbol('x') != Symbol('x'));
    });
  });

  describe('description property', () => {
    it('is added to the GlobalSymbolRegistry', () => {
      var s = Symbol.for('x');
      assert.equal(Symbol.keyFor(s), 'x');
    });
  });

  describe('as object key', () => {
    it('can be used as an object key', () => {
      let a = Symbol('a')
      let obj = {
        a: 3,
      };
      obj[a] = 4;
      assert.equal(obj.a, 3);
      assert.equal(obj[a], 4);
    });

    it('can be used as an object literal key', () => {
      let a = Symbol('a')
      let obj = {
        a: 3,
        [a]: 4
      };
      assert.equal(obj.a, 3);
      assert.equal(obj[a], 4);
    });

    it('is an ownPropertySymbol', () => {
      let a = Symbol('a')
      let obj = {
        a: 3,
        [a]: 4
      };
      assert.include(Object.getOwnPropertySymbols(obj), a);
      assert.notInclude(Object.keys(obj), a);
      assert.notInclude(Object.getOwnPropertyNames(obj), a);
    });
  });

  describe('other qualities', () => {
    it('is iterable', () => {
    });
    it('is matchable', () => {
    });
    it('is replaceable', () => {
    });
  });

  describe('well known symbols', () => {
  });
});

