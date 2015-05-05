describe('rest and spread', () => {
  describe('rest', () => {
    it('makes an array', () => {
      ((...args) => {
        assert.isTrue(Array.isArray(args));
      })(1, 2, 3);
    });
  });
});

