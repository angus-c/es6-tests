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
      let map = new Map();
      keys.forEach((key, i) => {
        map.set(key, values[i]);
      });
      keys.forEach((key, i) => {
        assert.equal(map.get(keys[i]), values[i]);
      });
    });
  });
});