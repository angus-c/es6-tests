// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-objects
describe('enhanced literals', () => {
  describe('shortcuts', () => {
    it('supports all shortcuts', () => {
      const a = 1, b = 2;
      assert.deepEqual({a, b}, {a: 1, b: 2});
    });

    it('supports shortcuts mixed with regular assignments', () => {
      const a = 1;
      assert.deepEqual({a, b: 2}, {a: 1, b: 2});
    });
  });
  describe('computed keys', () => {
    it('supports simple string aggregation', () => {
      assert.deepEqual({['a' + 'b']: 36}, {ab: 36});
      assert.deepEqual({[['a', 'b'].join('')]: 36}, {ab: 36});
    });

    it('supports variable substitution', () => {
      const x = 'ant', y = 'bee';
      assert.deepEqual({[x]: 36, [y]: 79}, {ant: 36, bee: 79});
      assert.deepEqual({[x + y]: 36, [y]: 79}, {antbee: 36, bee: 79});
    });

    it('supports function return values', () => {
      const fn = (a, b) => '_' + a + a + b;
      assert.deepEqual(
        {[fn('x', 'y')]: 36, [fn('boo', 'boo')]: 79},
        {_xxy: 36, _boobooboo: 79}
      );
    });

    it('coerces non-strings', () => {
      assert.deepEqual(
        {[{toString: ()=>'hello'}]: 36, [true]: 79},
        {hello: 36, true: 79}
      );
    });
  });
  describe('class-style method syntax', () => {
    it('supports class-style method syntax', () => {
      const helloer = {
        hi() {
          return 'hello'
        }
      };
      assert.equal(helloer.hi(), 'hello');
    });

    it('can mix old and new method syntax', () => {
      const helloer = {
        hi() {
          return 'hello'
        },
        grin: function () {
          return 'smile'
        }
      };
      assert.equal(helloer.hi(), 'hello');
      assert.equal(helloer.grin(), 'smile');
    });
  });
  describe('prototype assignment', () => {
    it('can assign prototype to instance', () => {
      const thing = {
        __proto__: {
          do() {return 'superDo'}
        }
      };
      assert.isFalse(thing.hasOwnProperty('do'));
      assert.equal(thing.do(), 'superDo');
      assert.isUndefined(thing.constructor.prototype.do);
    });

    it('supports super', () => {
      const thing = {
        do() {
          return 'meDo' + '@' + super.do();
        },
        __proto__: {
          do() {return 'superDo'}
        }
      };
      assert.isTrue(thing.hasOwnProperty('do'));
      assert.equal(thing.do(), 'meDo@superDo');
    });
  });
});
