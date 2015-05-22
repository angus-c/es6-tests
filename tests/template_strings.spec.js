// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-static-semantics-tv-s-and-trv-s
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
  describe('tag functions', () => {
    const a = 3;
    const b = {x: 4, y: a};
    it('(its) first arg is an array of the strings literals ', () => {
      assert.isTrue(Array.isArray(((strs)=>strs)`hello`));
      assert.equal(((strs)=>strs.length)`hello`, 1);
      assert.equal(((strs)=>strs[0])`hello`, 'hello');
      assert.equal(((strs)=>strs.length)`hello ${a}`, 2);
      assert.equal(((strs)=>strs[0])`hello ${a}`, 'hello ');
      assert.equal(((strs)=>strs[1])`hello ${a}`, '');
      assert.equal(((strs)=>strs.length)`hello ${a} goodbye`, 2);
      assert.equal(((strs)=>strs[0])`hello ${a} goodbye`, 'hello ');
      assert.equal(((strs)=>strs[1])`hello ${a} goodbye`, ' goodbye');
    });
    it('(its) first arg has a `raw` property', () => {
      assert.isTrue(Array.isArray(((strs)=>strs.raw)`hello`));
      assert.equal(((strs)=>strs.raw.length)`hello`, 1);
      assert.equal(((strs)=>strs.raw[0])`hello`, `hello`);
      assert.equal(((strs)=>strs.raw.length)`hello ${a}`, 2);
      assert.equal(((strs)=>strs.raw[0])`hello ${a}`, 'hello ');
      assert.equal(((strs)=>strs.raw[1])`hello ${a}`, '');
      assert.equal(((strs)=>strs.raw.length)`hel
lo`, 1);
      assert.equal(((strs)=>strs.raw[0])`hel
lo`, 'hel\nlo');
    });
    it('(its) remaining args are the interpolated values ', () => {
      assert.equal(((strs, ...values)=>values.length)`hello`, 0);
      assert.equal(((strs, ...values)=>values.length)`hello ${a}`, 1);
      assert.equal(((strs, ...values)=>values[0])`hello ${a}`, 3);
      assert.equal(((strs, ...values)=>values.length)`hello ${a} goodbye ${b}`, 2);
      assert.equal(((strs, ...values)=>values[0])`hello ${a} goodbye ${b}`, 3);
      assert.deepEqual(((strs, ...values)=>values[1])`hello ${a} goodbye ${b}`, {x: 4, y: a});
    });
  });
});
