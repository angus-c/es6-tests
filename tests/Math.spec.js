// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-math
describe('new Math features', () => {
  describe('the methods', () => {
    it('has Math.sign', () => {
      assert.equal(Math.sign(3), 1);
      assert.equal(Math.sign(-3), -1);
    });

    it('has Math.trunc', () => {
      assert.equal(Math.trunc(1.5), 1);
      assert.equal(Math.trunc(-1.7), -1);
      assert.equal(Math.trunc(Math.PI), 3);
    });

    it('has Math.cbrt', () => {
      assert.equal(Math.cbrt(8), 2);
      assert.equal(Math.cbrt(-8), -2);
    });

    it('has Math.log2 and Math.log10', () => {
      assert.equal(Math.log2(8), 3);
      assert.equal(Math.log10(100), 2);
    });

    it('has Math.fround', () => {
      assert.notEqual(Math.fround(1.1), 1.1);
      assert.equal(Math.round(Math.fround(1.1)), Math.round(1.1));
    });

    it('has Math.imul', () => {
      assert.notEqual(Math.imul(5, 3.01), 5 * 3.01);
      assert.equal(Math.round(Math.imul(5, 3.01)), Math.round(5 * 3.01));
    });

    it('has Math.clz32', () => {
      assert.equal(Math.clz32(58), 26);
    });

    it('has Math.expm1', () => {
      assert.closeTo(Math.expm1(1), 1.7182, 0.0001);
    });

    it('has Math.hypot', () => {
      assert.equal(Math.hypot(3, 4), 5);
      assert.closeTo(Math.hypot(7, 12), 13.8924, 0.0001);
    });

    it('has the new trig functions', () => {
      assert.closeTo(Math.sinh(1), 1.1752, 0.0001);
      assert.closeTo(Math.cosh(1), 1.5430, 0.0001);
      assert.closeTo(Math.tanh(1), 0.7615, 0.0001);
      assert.closeTo(Math.asinh(1), 0.8813, 0.0001);
      assert.closeTo(Math.acosh(10), 2.9932, 0.0001);
      assert.closeTo(Math.atanh(0.5), 0.5493, 0.0001);
    });
  });
});
