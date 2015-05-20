describe('new number features', () => {
  describe('base n literals', () => {
    it("supports binary literals", () => {
      assert.equal(0b10101, 21);
    });
    it("supports octal literals", () => {
      assert.equal(0o1234567, 342391);
    });
  });
  describe('new static functions', () => {
    it("has Number.isFinite", () => {
      assert.equal(Number.isFinite(Number.Infinity), false);
      assert.equal(Number.isFinite(0), true);
      assert.equal(Number.isFinite('a'), false);
      assert.equal(Number.isFinite(77), true);
      // compare with global fn...
      assert.equal(isFinite('35'), true);
      assert.equal(Number.isFinite('35'), false);
    });
    it("has Number.isNaN", () => {
      assert.equal(Number.isNaN(12), false);
      assert.equal(Number.isNaN('x'), false);
      assert.equal(Number.isNaN(NaN), true);
    });
    it("has Number.isInteger", () => {
      // assert.isFalse(Number.isInteger(0.5));
      assert.isTrue(Number.isInteger(1));
      assert.isFalse(Number.isInteger('q'));
      assert.isFalse(Number.isInteger(NaN));
    });
  });
  describe('new static values', () => {
    it("defines Number.EPSILON", () => {
      // EPSILON is approx 2.2204460492503130808472633361816 x 10‍−‍16.
      assert.isDefined(Number.EPSILON);
      assert.isFalse((0.3 - (0.2 + 0.1)) === 0);
      assert.isTrue((0.3 - (0.2 + 0.1)) < Number.EPSILON);
      assert.isTrue((0.3 - (0.2 + 0.1)) > -Number.EPSILON);
    });
  });

});
