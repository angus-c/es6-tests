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
        Array.from({a:4, b:5, c:8}),
        [1,2,3].keys(),
        [1,2,3].entries(),
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
    it ('is a method', () => {
      const set = new Set();
      assert.isDefined(set.add);
      assert.equal(typeof set.add, 'function');
    });
    it ('adds values to a set', () => {
      const set = new Set();
      const values = [1, 5, 5, 5, 4, 3, 2, 6, 4, 3, 6, 3, 3];
      let count = 0;
      values.forEach(value => {
        count++;
        set.add(value);
      });
      assert.equal(count, values.length);
      assert.equal(set.size, 6);
    });
  });
  describe('`size` and deduping', () => {
    it('defines `size`', () => {
      const set = new Set([1,3,2,2]);
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
});