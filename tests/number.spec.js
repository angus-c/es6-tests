describe('new number features', () => {
  // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-additional-syntax-numeric-literals
  describe('base n literals', () => {
    it("supports binary literals", () => {
      assert.equal(0b10101, 21);
    });
    it("supports octal literals", () => {
      assert.equal(0o1234567, 342391);
    });
  });
  describe('new static functions', () => {
    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.isfinite
    it("has Number.isFinite", () => {
      assert.equal(Number.isFinite(Number.Infinity), false);
      assert.equal(Number.isFinite(0), true);
      assert.equal(Number.isFinite('a'), false);
      assert.equal(Number.isFinite(77), true);
      // compare with global fn...
      assert.equal(isFinite('35'), true);
      assert.equal(Number.isFinite('35'), false);
    });
    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.isnan
    it("has Number.isNaN", () => {
      assert.equal(Number.isNaN(12), false);
      assert.equal(Number.isNaN('x'), false);
      assert.equal(Number.isNaN(NaN), true);
    });
    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.isinteger
    it("has Number.isInteger", () => {
      // assert.isFalse(Number.isInteger(0.5));
      assert.isTrue(Number.isInteger(1));
      assert.isFalse(Number.isInteger('q'));
      assert.isFalse(Number.isInteger(NaN));
    });
    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.issafeinteger
    it("has Number.isSafeInteger", () => {
      const safe1 = Math.pow(2, 53) - 1;
      const unsafe1 = Math.pow(2, 53);
      const safe2 = 1 - Math.pow(2, 53);
      const unsafe2 = -Math.pow(2, 53);
      assert.isTrue(Number.isSafeInteger(safe1));
      assert.isFalse(Number.isSafeInteger(unsafe1));
      assert.isTrue(Number.isSafeInteger(safe2));
      assert.isFalse(Number.isSafeInteger(unsafe2));
      assert.isTrue(Number.isSafeInteger(7));
      assert.isFalse(Number.isSafeInteger(7.1));
      assert.isTrue(Number.isSafeInteger(0));
      assert.isFalse(Number.isSafeInteger(1/4));
    });
  });
  describe('new static values', () => {
    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.epsilon
    it("defines Number.EPSILON", () => {
      // EPSILON is approx 2.2204460492503130808472633361816 x 10‍−‍16.
      assert.isDefined(Number.EPSILON);
      assert.isFalse((0.3 - (0.2 + 0.1)) === 0);
      assert.isTrue((0.3 - (0.2 + 0.1)) < Number.EPSILON);
      assert.isTrue((0.3 - (0.2 + 0.1)) > -Number.EPSILON);
    });
    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer
    it("defines Number.MAX_SAFE_INTEGER", () => {
      assert.isDefined(Number.MAX_SAFE_INTEGER);
      assert.equal(Number.MAX_SAFE_INTEGER, Math.pow(2, 53)-1);
    });
    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.min_safe_integer
    it("defines Number.MIN_SAFE_INTEGER", () => {
      assert.isDefined(Number.MIN_SAFE_INTEGER);
      assert.equal(Number.MIN_SAFE_INTEGER, 1-Math.pow(2, 53));
    });
  });
});
