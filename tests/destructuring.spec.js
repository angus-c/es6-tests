describe('destructuring', () => {
  let array1 = [1, 3, 5, 2, 4];
  let array2 = [{a: 4, b: true}, [1, 2], undefined, false, 'c'];
  describe('arrays', () => {
    it('assigns all values', () => {
      let [a, b, c, d, e] = array1;
      assert.equal(a, 1);
      assert.equal(b, 3);
      assert.equal(c, 5);
      assert.equal(d, 2);
      assert.equal(e, 4);
      let [f, g, h, i, j] = array2;
      assert.deepEqual(f, {a: 4, b: true});
      assert.sameMembers(g, [1, 2]);
      assert.isUndefined(h);
      assert.isFalse(i);
      assert.equal(j, 'c');
    });
    it('assigns to named variables only', () => {
      let [c, d] = array1;
      assert.equal(c, 1);
      assert.equal(d, 3);
      let [,, e, f, g] = array1;
      assert.equal(e, 5);
      assert.equal(f, 2);
      assert.equal(g, 4);
    });
    it('assigns to rest variables', () => {
      let [a, ...rest] = array1;
      assert.equal(a, 1);
      assert.sameMembers(rest, [3, 5, 2, 4]);
      [...rest] = array1;
      assert.sameMembers(rest, [1, 3, 5, 2, 4]);
    });

  });
  describe('objects', () => {
    let obj = {
      a: 1,
      b: [2, 3, 4],
      c: {cc: 4, dd: {eee: 'hello'}},
      d: true
    }
    it('assigns top level keys', () => {
      let {a, b, c, d} = obj;
      assert.equal(a, 1);
      assert.sameMembers(b, [2, 3, 4]);
      assert.deepEqual(c, {cc: 4, dd: {eee: 'hello'}});
      assert.isTrue(d);
    });
    it('assigns selected keys', () => {
      let {a, d} = obj;
      assert.equal(a, 1);
      assert.isTrue(d);
    });
    it.skip('assigns deep nested values', () => {
      let {a: x, c: {dd: {eee: y}}, d: z} = obj;
      assert.equal(x, 1);
      assert.equal(y, 'hello');
      assert.isTrue(z);
    });
  });
  describe('with primitives', () => {
    it('', () => {
    });
  });
  describe('with defaults', () => {
    it('', () => {
    });
  });
  describe('as', () => {
    it('', () => {
    });
  });
  describe('in arguments', () => {
    it('', () => {
    });
  });
  describe('in for-of', () => {
    it('', () => {
    });
  });
});


