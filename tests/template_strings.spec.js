describe('template strings', () => {
  describe('basic strings', () => {
    it('generates a string', () => {
      assert.equal(typeof `hello`, 'string');
      assert.equal(`hello`, 'hello');
    });
    it('can be multiline', () => {
      assert.equal(typeof `hello
how are you`, 'string');
      assert.equal(`hello
how are you`, 'hello\n' +
      'how are you');
    });
  });
  describe('interpolation', () => {
    it('can insert primitive variables', () => {
      const a = 3;
      const b = 'fifty';
      const c = true;
      assert.equal(`the ${c} price is ${a} dollars and ${b} cents`,
       'the true price is 3 dollars and fifty cents');
    });
    it('can insert object variables', () => {
      const a = {toString: () => 'an object'};
      const b = [1, 2, 3];
      b.toString = () => 'an array'
      assert.equal(`${a} and ${b}`,
       'an object and an array');
    });
    it('can insert expressions', () => {
      assert.equal(`${2**2} and ${((a, b)=>3 + a/b)(6, 2)}`,
       '4 and 6');
    });
  });
});
