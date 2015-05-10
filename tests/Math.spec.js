describe('new Math features', () => {
  describe('the methods', () => {
    it("has Math.sign", () => {
      assert.equal(Math.sign(3), 1);
      assert.equal(Math.sign(-3), -1);
    });
    it("has Math.trunc", () => {
      assert.equal(Math.trunc(1.5), 1);
      assert.equal(Math.trunc(-1.7), -1);
      assert.equal(Math.trunc(Math.PI), 3);
    });
    it("has Math.cbrt", () => {
      assert.equal(Math.cbrt(8), 2);
      assert.equal(Math.cbrt(-8), -2);
    });
    it("has Math.log2 and Math.log10", () => {
      assert.equal(Math.log2(2), 1);
      assert.equal(Math.log10(100), 2);
    });


  });
  describe('the properties', () => {

  });
});
