describe('ES6 Array.prototype methods', () => {
  let arr;
  beforeEach(() => {
    arr = ['a', 17, false, '30', 4];
  });

  // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-array.prototype.fill
  describe('Array.prototype.fill', () => {
    it('replaces all members', () => {
      assert.sameMembers(arr.fill(3), [3, 3, 3, 3, 3]);
    });
    it('replaces the members up to an index', () => {
      assert.sameMembers(arr.fill(5, 2), ['a', 17, 5, 5, 5]);
    });
    it('replaces the members between indices', () => {
      assert.sameMembers(arr.fill(5, 2, 3), ['a', 17, 5, '30', 4]);
    });
  });

  // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-array.prototype.find
  describe('Array.prototype.find', () => {
    it('finds the item', () => {
      assert.equal(arr.find(Number), 17);
    });
    it('honors the `this` context', () => {
      assert.equal(
        arr.find(function (e) {return this.sqrt(e) == 2}, Math),
        4
      );
    });
  });

  // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-array.prototype.findindex
  describe('Array.prototype.findIndex', () => {
    it('finds the index', () => {
      assert.equal(arr.findIndex(Number), 1);
    });
    it('honors the `this` context', () => {
      assert.equal(
        arr.findIndex(function (e) {return this.sqrt(e) == 2}, Math),
        4
      );
    });
  });

  // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-array.prototype.keys
  // See iterator.spec for more thorough iterator tests
  describe('Array.prototype.keys', () => {
    const arr = [7, 8, 9];
    it.skip('returns an iterator', () => {
      assert.isDefined(arr.keys()[[Symbol.iterator]]);
    });
    it('iterates over the keys', () => {
      let arrKeys = arr.keys();
      let i = 0;
      for (let key of arrKeys) {
        assert.isTrue(key == i++);
      }
    });
  });

  // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-array.prototype.values
  // See iterator.spec for more thorough iterator tests
  describe.skip('Array.prototype.values', () => {
    const arr = [7, 8, 9];
    it('returns an iterator', () => {
      assert.isDefined(arr.values()[[Symbol.iterator]]);
    });
    it('iterates over the values', () => {
      let arrValues = arr.values();
      let i = 0;
      for (let value of arrValues) {
        assert.isTrue(value == arr[i++]);
      }
    });
  });

  // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-array.prototype.entries
  // See iterator.spec for more thorough iterator tests
  describe('Array.prototype.entries', () => {
    const arr = [7, 8, 9];
    it.skip('returns an iterator', () => {
      assert.isDefined(arr.entries()[[Symbol.iterator]]);
    });
    it('iterates over the key value pairs', () => {
      let arrKeyValuePairs = arr.entries();
      let i = 0;
      for (let pair of arrKeyValuePairs) {
        assert.sameMembers(pair, [i, arr[i]]);
        i++;
      }
    });
  });

  // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-array.prototype.copywithin
  describe.skip('Array.prototype.copyWithin', () => {
    it('copies over all members', () => {
      assert.sameMembers(arr.copyWithin([1, 2, 'f', 3, 4]), [1, 3, 'f', 3, 4]);
    });
  });
});
