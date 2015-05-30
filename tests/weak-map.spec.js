// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-weakmap-objects
describe('weak maps', () => {
  describe('types', () => {
    it('(WeakMap) is a constructor', () => {
      assert.equal(typeof WeakMap, 'function');
      assert.isDefined(WeakMap.prototype);
    });

    it('(weak map instance) is an object', () => {
      assert.equal(typeof new WeakMap(), 'object');
    });
  });
  describe('constructor parameter', () => {
    it('accepts null or nothing', () => {
      assert.isDefined(new WeakMap(null));
      assert.isDefined(new WeakMap());
    });

    it('accepts any key-value iterable', () => {
      const keyValueIterables = [
        [[{}, 1], [[], 2]],
        new Map([[{}, 1], [[], 2]]),
        new Set([[{}, 1], [[], 2]])
      ];
      keyValueIterables.forEach((iterable) => {
        assert.isDefined(new WeakMap(iterable));
      });
    });

    it('accepts any type of values', () => {
      const keyValueIterables = [
        [[{}, 1], [[], 2]],
        [[{}, 'a'], [[], 'b']],
        [[{}, []], [[], []]],
        [[{}, {}], [[], {}]],
        [[{}, 1], [[], 0]],
        [[{}, Symbol(4)], [[], Symbol(2)]],
        [[{}, new Map([['2', 5]])], [[], new Map([['7', 8]])]]
      ];
      keyValueIterables.forEach((iterable, c) => {
        const weakMap = new WeakMap(iterable);
        assert.isDefined(weakMap);
        [0, 1].forEach((i) => {
          assert.equal(
            weakMap.get(keyValueIterables[c][i][0]),
            keyValueIterables[c][i][1]
          );
        });
      });
    });

    it('accepts any type of object as key', () => {
      const keyValueIterables = [
        [[{}, 1], [new Date(), 1]],
        [[[], 1], [{}, 1]],
        [[()=>{}, 1], [[], 1]],
        [[new Map(), 1], [()=>{}, 1]],
        [[new Set(), 1], [new Map(), 1]],
        [[new WeakMap(), 1], [new Set(), 1]],
        [[new Date(), 1], [new WeakMap(), 1]]
      ];

      keyValueIterables.forEach((iterable, c) => {
        const weakMap = new WeakMap(iterable);
        assert.isDefined(weakMap);
        [0, 1].forEach((i) => {
          assert.equal(
            weakMap.get(keyValueIterables[c][i][0]),
            keyValueIterables[c][i][1]
          );
        });
      });
    });

    it('does not accept primitives as keys', () => {
      const keyValueIterables = [
        [[1, 1], [2, 1]],
        [['a', 1], ['b', 1]],
        [[true, 1], [false, 1]],
      ];

      keyValueIterables.forEach((iterable, c) => {
        assert.throws(()=>{const weakMap = new WeakMap(iterable)}, Error);
      });
    });
  });

  describe('`set` method', () => {
    it('can be updated using `set`', () => {
      const keys = [{}, [], ()=>{}, new Map(), new Set(), new WeakMap(), new Date()];
      const values = [1, 'a', false, Symbol(), new Date(), {}, []];
      const weakMap = new WeakMap();
      keys.forEach((key, i) => {
        weakMap.set(key, values[i]);
      });
      keys.forEach((key, i) => {
        assert.equal(weakMap.get(keys[i]), values[i]);
      });
    });
  });

  describe('`has` method', () => {
    it('checks if key is present', () => {
      const keys = [{}, [], ()=>{}, new Map(), new Set(), new WeakMap(), new Date()];
      const values = [1, 'a', false, Symbol(), new Date(), {}, []];
      const weakMap = new WeakMap();
      keys.forEach((key, i) => {
        weakMap.set(key, values[i]);
      });
      keys.forEach((key, i) => {
        assert.isTrue(weakMap.has(keys[i]));
      });
    });
  });

  describe('weakMap.delete()', () => {
    it('defines `delete`', () => {
      assert.equal(typeof new WeakMap().delete, 'function');
    });

    it('(`weakMap.delete`) deletes the specified key', () => {
      const key1 = {};
      const key2 = {};
      const weakMap = new WeakMap([[key1, 1], [key2, 2]]);
      assert.isTrue(weakMap.has(key1));
      weakMap.delete(key1);
      assert.isFalse(weakMap.has(key1));
    });
  });

  describe('transient keys', () => {
    it('(its) keys are GCed when they have no other refs', () => {
      // untestable
    });
  });
});