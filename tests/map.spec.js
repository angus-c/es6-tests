// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-map-objects
describe('maps', () => {
  describe('types', () => {
    it('(Map) is a constructor', () => {
      assert.equal(typeof Map, 'function');
      assert.isDefined(Map.prototype);
    });
    it('(map instance) is an object', () => {
      assert.equal(typeof new Map(), 'object');
    });
  });
  describe('constructor parameter', () => {
    it('accepts null or nothing', () => {
      assert.isDefined(new Map(null));
      assert.isDefined(new Map());
    });
    it('accepts any key-value iterable', () => {
      const keyValueIterables = [
        [['a', 1], ['b', 2]],
        new Map([['a', 1], ['b', 2]]),
        new Set([['a', 1], ['b', 2]])
      ];
      keyValueIterables.forEach((iterable) => {
        assert.isDefined(new Map(iterable));
      });
    });
    it('accepts any types as keys or values', () => {
      const keyValueIterables = [
        [['a', 1], ['b', 2]],
        [[1, 'a'], [2, 'b']],
        [[{}, []], [{}, []]],
        [[[], {}], [[], {}]],
        [[true, 1], [false, 0]],
        [[new Map([['2', 5]]), Symbol(4)], [new Map([['7', 8]]), Symbol(2)]],
        [[Symbol(4), new Map([['2', 5]])], [Symbol(2), new Map([['7', 8]])]]
      ];
      keyValueIterables.forEach((iterable, c) => {
        const map = new Map(iterable);
        assert.isDefined(map);
        [0, 1].forEach((i) => {
          assert.equal(
            map.get(keyValueIterables[c][i][0]),
            keyValueIterables[c][i][1]
          );
        });
      });
    });
  });
  describe('`set` method', () => {
    it('can be updated using `set`', () => {
      const keys = [{}, [], 1, 'a', false, Symbol(), new Date()];
      const values = [1, 'a', false, Symbol(), new Date(), {}, []];
      const map = new Map();
      keys.forEach((key, i) => {
        map.set(key, values[i]);
      });
      keys.forEach((key, i) => {
        assert.equal(map.get(keys[i]), values[i]);
      });
    });
  });
  describe('`has` method', () => {
    it('checks if key is present', () => {
      const keys = [{}, [], 1, 'a', false, Symbol(), new Date()];
      const values = [1, 'a', false, Symbol(), new Date(), {}, []];
      const map = new Map();
      keys.forEach((key, i) => {
        map.set(key, values[i]);
      });
      keys.forEach((key, i) => {
        assert.isTrue(map.has(keys[i]));
      });
    });
  });
  describe('map.keys()', () => {
    let map, keys, values;
    beforeEach(() => {
      keys = [{}, [], 1, 'a', false, Symbol(), new Date()];
      values = [1, 'a', false, Symbol(), new Date(), {}, []];
      map = new Map();
      keys.forEach((key, i) => {
        map.set(key, values[i]);
      });
    });
    it('defines `keys`', () => {
      assert.equal(typeof map.keys, 'function');
    });
    it('(`map.keys`) is an iterator', () => {
      const keysIt = map.keys();
      assert.isDefined(keysIt.next);
      keys.forEach((key) => {
        assert.equal(keysIt.next().value, key);
      });
    });
  });
  describe('map.values()', () => {
    let map, keys, values;
    beforeEach(() => {
      keys = [{}, [], 1, 'a', false, Symbol(), new Date()];
      values = [1, 'a', false, Symbol(), new Date(), {}, []];
      map = new Map();
      keys.forEach((key, i) => {
        map.set(key, values[i]);
      });
    });
    it('defines `values`', () => {
      assert.equal(typeof map.values, 'function');
    });
    it('(`map.values`) is an iterator', () => {
      const valuesIt = map.values();
      assert.isDefined(valuesIt.next);
      values.forEach((value) => {
        assert.equal(valuesIt.next().value, value);
      });
    });
  });
  describe('map.entries()', () => {
    let map, keys, values;
    beforeEach(() => {
      keys = [{}, [], 1, 'a', false, Symbol(), new Date()];
      values = [1, 'a', false, Symbol(), new Date(), {}, []];
      map = new Map();
      keys.forEach((key, i) => {
        map.set(key, values[i]);
      });
    });
    it('defines `entries`', () => {
      assert.equal(typeof map.entries, 'function');
    });
    it('(`map.entries`) is an iterator', () => {
      const entriesIt = map.entries();
      assert.isDefined(entriesIt.next);
      keys.forEach((key, i) => {
        assert.sameMembers(entriesIt.next().value, [key, values[i]]);
      });
    });
  });
  describe('map.forEach', () => {
    let map, keys, values;
    beforeEach(() => {
      keys = [{}, [], 1, 'a', false, Symbol(), new Date()];
      values = [1, 'a', false, Symbol(), new Date(), {}, []];
      map = new Map();
      keys.forEach((key, i) => {
        map.set(key, values[i]);
      });
    });
    it('defines `forEach`', () => {
      assert.equal(typeof map.forEach, 'function');
    });
    it('(`map.forEach`) loops through the entries', () => {
      let count = 0;
      map.forEach((value, key, mapp) => {
        assert.equal(value, values[count]);
        assert.equal(key, keys[count]);
        assert.equal(mapp, map);
        count++;
      });
    });
  });
  describe('map.size', () => {
    it('(`map.size`) returns the number of map entries', () => {
      const map = new Map([['a', 1], ['b', 2]]);
      assert.equal(map.size, 2);
      map.set('c', 3);
      assert.equal(map.size, 3);
    });
  });
  describe('map.delete()', () => {
    it('defines `delete`', () => {
      assert.equal(typeof new Map().delete, 'function');
    });
    it('(`map.delete`) deletes the specified key', () => {
      const map = new Map([['a', 1], ['b', 2]]);
      assert.equal(map.size, 2);
      assert.isTrue(map.has('a'));
      map.delete('a');
      assert.equal(map.size, 1);
      assert.isFalse(map.has('a'));
    });
  });
  describe('map.clear()', () => {
    it('defines `clear`', () => {
      assert.equal(typeof new Map().clear, 'function');
    });
    it('(`map.clear`) empties the map', () => {
      const map = new Map([['a', 1], ['b', 2]]);
      assert.equal(map.size, 2);
      map.clear();
      assert.equal(map.size, 0);
    });
  });
});