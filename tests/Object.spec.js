describe('ES6 Object constructor methods', () => {
  let obj;
  beforeEach(() => {
    obj = {
      a: 47,
      b: {c:4},
      c: true
    };
  });

  // http://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.assign
  describe('Object.assign', () => {
    it('extends existing object', () => {
      expect(Object.assign(obj, {d: 4})).to.eql(
          {a: 47, b: {c:4}, c: true, d:4});
    });
    it('clobbers existing properties', () => {
      expect(Object.assign(obj, {b: {c:5}})).to.eql(
          {a: 47, b: {c:5}, c: true});
    });
    it('accepts multiple sources', () => {
      expect(Object.assign(obj, {b: {c:5}}, {d:4})).to.eql(
          {a: 47, b: {c:5}, c: true, d: 4});
    });
  });

  // http://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.is
  describe('Object.is', () => {
    it('works like === for regular values', () => {
      assert.isTrue(Object.is(3, 3));
      assert.isFalse(Object.is('3', 3));
    });
    it('treats NaNs as equal', () => {
      assert.isTrue(Object.is(NaN, NaN));
    });
    it('treats 0 and -0 as unequal', () => {
      assert.isFalse(Object.is(0, -0));
    });
  });

  // http://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.setprototypeof
  describe('Object.setPrototypeOf', () => {
    it('sets prototype of plain object', () => {
      Object.setPrototypeOf(obj, {d:8});
      expect(Object.getPrototypeOf(obj)).to.eql({d:8});
      assert.equal(obj.d, 8);
    });
    it('replaces prototype of object with custom prototype', () => {
      Object.setPrototypeOf(obj, {d:8});
      expect(Object.getPrototypeOf(obj)).to.eql({d:8});
      Object.setPrototypeOf(obj, {e:12});
      expect(Object.getPrototypeOf(obj)).to.eql({e:12});
      assert.equal(obj.e, 12);
      assert.isUndefined(obj.d);
    });
  });

  // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.getownpropertysymbols
  describe('Object.getOwnPropertySymbols', () => {
  });
});
