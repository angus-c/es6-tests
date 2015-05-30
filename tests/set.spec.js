// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-set-objects
describe('sets', () => {
  describe('types', () => {
    it('(Set) is a constructor', () => {
      assert.equal(typeof Set, 'function');
      assert.isDefined(Set.prototype);
    });

    it('(set instance) is an object', () => {
      assert.equal(typeof new Set(), 'object');
    });
  });
  describe('constructor parameter', () => {
    it('accepts null or nothing', () => {
      assert.isDefined(new Set(null));
      assert.isDefined(new Set());
    });

    it('accepts any iterable', () => {
      const iterables = [
        [1, 3, 4, 3, 6],
        'abcdeffghijklmnopqrtuvwxyz',
        new Map([['a', 1], ['b', 2], ['a', 1], ['c', 5]]),
        new Set([1, 3, 4, 3, 6]),
        [1, 2, 3].keys(),
        [1, 2, 3].entries()
      ];
      iterables.forEach((iterable) => {
        assert.isDefined(new Set(iterable));
      });
    });

    it('accepts any value types', () => {
      const iterables = [
        [1, 2, 3, 4, 8, 8],
        ['a', 1, 'b', 2, 'b'],
        [{}, [], {}, [], [], [], {}],
        [true, 1, false, false, 0],
        [Symbol(4), Symbol(4), Symbol()]
      ];
      iterables.forEach((iterable) => {
        const set = new Set(iterable);
        assert.isDefined(set);
        iterable.forEach((value) => {
          assert.isTrue(set.has(value));
        });
      });
    });
  });

  describe('set.add', () => {
    it('is a method', () => {
      const set = new Set();
      assert.isDefined(set.add);
      assert.equal(typeof set.add, 'function');
    });

    it('adds values to a set', () => {
      const set = new Set();
      const values = [1, 5, 5, 5, 4, 3, 2, 6, 4, 3, 6, 3, 3];
      values.forEach(value => {
        set.add(value);
      });
      values.forEach(value => {
        assert.isTrue(set.has(value));
      });
      assert.equal(set.size, 6);
    });
  });

  describe('`size` and de-duping', () => {
    it('defines `size`', () => {
      const set = new Set([1, 3, 2, 2]);
      assert.isDefined(set.size);
      assert.equal(typeof set.size, 'number');
    });

    it('removes duplicate values', () => {
      const obj = {}, arr = [];
      const sym1 = Symbol(), sym2 = Symbol();
      const iterables = [
        {
          value: [1, 2, 3, 4, 8, 8],
          unique: 5
        },
        {
          value: 'abcdeffghijklmnopqrstuvwxyz',
          unique: 26
        },
        {
          value: [obj, arr, arr, arr, obj],
          unique: 2
        },
        {
          value: [true, 1, false, false, 0],
          unique: 4
        },
        {
          value: [sym1, sym1, sym2],
          unique: 2
        }
      ];
      iterables.forEach((iterable) => {
        const set = new Set(iterable.value);
        assert.equal(set.size, iterable.unique);
      });
    });
  });

  describe('forEach', () => {
    const set = new Set([1, 3, 2, 2]);
    const asArray = [...set];
    let count = 0;

    it('is a valid function', () => {
      assert.isDefined(set.forEach);
      assert.equal(typeof set.forEach, 'function');
    });

    it('loops over each member', () => {
      set.forEach((value1, value2, theSet) => {
        assert.equal(value1, asArray[count]);
        assert.equal(value2, asArray[count]);
        assert.equal(value1, value2);
        assert.equal(theSet, set);
        count++;
      });
    });
  });
  describe('keys, values and entries', () => {
    const set = new Set([1, 3, 2, 2]);
    const asArray = [...set];

    it('(they) are valid functions', () => {
      assert.isDefined(set.keys);
      assert.isDefined(set.values);
      assert.isDefined(set.entries);
      assert.equal(typeof set.keys, 'function');
      assert.equal(typeof set.values, 'function');
      assert.equal(typeof set.entries, 'function');
    });

    it('(keys and values) both iterate over the members', () => {
      const keysIt = set.keys();
      const valuesIt = set.values();
      let next, count = 0;
      assert.isDefined(keysIt.next);
      assert.isDefined(valuesIt.next);
      while (next = keysIt.next(), !next.done) {
        assert.equal(next.value, asArray[count++]);
      }
    });

    it('(entires) is a matching key-value pair', () => {
      const entriesIt = set.entries();
      let next, count = 0;
      assert.isDefined(entriesIt.next);
      while (next = entriesIt.next(), !next.done) {
        let member = asArray[count++];
        assert.sameMembers(next.value, [member, member]);
      }
    });
  });
  describe('set.delete()', () => {
    it('defines `delete`', () => {
      assert.equal(typeof new Set().delete, 'function');
    });

    it('(`set.delete`) deletes the specified key', () => {
      const set = new Set([1, 5, 5, 6, 8]);
      assert.equal(set.size, 4);
      assert.isTrue(set.has(5));
      set.delete(5);
      assert.equal(set.size, 3);
      assert.isFalse(set.has(5));
    });
  });
  describe('set.clear()', () => {
    it('defines `clear`', () => {
      assert.equal(typeof new Set().clear, 'function');
    });

    it('(`set.clear`) empties the set', () => {
      const set = new Set([1, 5, 5, 6, 8]);
      assert.equal(set.size, 4);
      set.clear();
      assert.equal(set.size, 0);
    });
  });
});
