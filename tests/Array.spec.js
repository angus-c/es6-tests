describe('new array methods', () => {
  describe('Array.prototype methods', () => {
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

  describe('Array constructor methods', () => {
    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-array.from
    describe('Array.from', () => {
      it('converts array-like objects to arrays', () => {
        const arrayLikeObjects = [
          {value: 'mickey mouse', length: 12},
          {value: new Map([[true, 99], [false, window]]), length: 2},
          {value: new Set([1, 'a', 'a', 4]), length: 3},
          {value: (function () {return arguments})([1, 2], 6, 7, /$[0-9]*/), length: 4}
        ]
        arrayLikeObjects.forEach((obj) => {
          let array = Array.from(obj.value);
          assert.isTrue(Array.isArray(array));
          assert.equal(array.length, obj.length);
        });
      });
      it('supports predicates', () => {
        const arr = new Array(5);
        arr[0] = 'x', arr[1] = 'y', arr[3] = 'z';
        assert.sameMembers(Array.from(arr, e => e || '*'), ['x', 'y', '*', 'z', '*']);

        const predicate = (e, i, a) => Array.isArray(e) ? e[0] : e;
        assert.sameMembers(Array.from([1, [2, 3], 4], predicate), [1, 2, 4]);

        const map = new Map([[true, [1, 3, 5]], [false, [2, 4, 6]]]);
        const print = e => `${e[0]}-${e[1].join('')}`;
        assert.sameMembers(Array.from(map, print), ['true-135', 'false-246']);

        assert.sameMembers(Array.from({length: 3}, (e, i) => i), [0, 1, 2]);
        assert.sameMembers(Array.from('cow', e => e.toUpperCase()), ['C', 'O', 'W']);
      });
      it('honors the `this` argument', () => {
        const sqrt = function (e) {return this.sqrt(e)}
        assert.sameMembers(Array.from([1, 4, 9], sqrt, Math), [1, 2, 3]);
      });
    });
    describe('Array.of', () => {
      it('creates a new array using the given arguments', () => {
        const argsData = [
          [1, 2, 3],
          [3],
          ['fox', 'rabbit', 'wolf'],
          [{}, [], {}],
          [undefined]
        ]
        for (let args of argsData) {
          let arr = Array.of(...args);
          assert.equal(arr.length, args.length);
          args.forEach((arg, i) => {
            assert.equal(arr[i], arg);
          });
        }
      });
    });
  });
});
