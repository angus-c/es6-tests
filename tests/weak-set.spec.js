// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-weakset-objects
describe('weak sets', () => {
  describe('types', () => {
    it('(WeakSet) is a constructor', () => {
      assert.equal(typeof WeakSet, 'function');
      assert.isDefined(WeakSet.prototype);
    });
    it('(weak set instance) is an object', () => {
      assert.equal(typeof new WeakSet(), 'object');
    });
  });
  describe('constructor parameter', () => {
    it('accepts null or nothing', () => {
      assert.isDefined(new WeakSet(null));
      assert.isDefined(new WeakSet());
    });
    it('accepts any non-primitive iterable type', () => {
      const iterables = [
        [[], {}, () => {}],
        new Set([[], {}, () => {}]),
        [[], {}, () => {}].entries()
      ];
      iterables.forEach((iterable) => {
        assert.isDefined(new WeakSet(iterable));
      });
    });
    it('accepts any non-primitive value types', () => {
      const iterables = [
        [[], {}, ()=>{}],
        [new Map(), new Set(), new WeakMap(), new WeakSet()],
      ];
      iterables.forEach((iterable) => {
        const set = new WeakSet(iterable);
        assert.isDefined(set);
        iterable.forEach((value) => {
          assert.isTrue(set.has(value));
        });
      });
    });
    it('does not accept primitive value types', () => {
      assert.throws(() => {
        new WeakSet([1, false, 'a'])}, Error);
    });
  });
  describe('weakset.add', () => {
    it ('is a method', () => {
      const weakset = new WeakSet();
      assert.isDefined(weakset.add);
      assert.equal(typeof weakset.add, 'function');
    });
    it ('adds values to a weakset', () => {
      const weakset = new WeakSet();
      const values = [{}, [], ()=>{}, [], {}];
      values.forEach(value => {
        weakset.add(value);
      });
      values.forEach(value => {
        assert.isTrue(weakset.has(value));
      });
    });
  });
  describe('weakset.delete()', () => {
    it('defines `delete`', () => {
      assert.equal(typeof new WeakSet().delete, 'function');
    });
    it('(`weakset.delete`) deletes the specified key', () => {
      const obj = {}, arr = [], fn = ()=>{};
      const values = [obj, arr, fn];
      const weakset = new WeakSet(values);
      assert.isTrue(weakset.has(obj));
      weakset.delete(obj);
      assert.isFalse(weakset.has(obj));
    });
  });
  describe('de-duping', () => {
    it('removes duplicate values', () => {
      const obj = {}, arr = [], fn = ()=>{};
      const values = [obj, obj, arr, fn, obj, fn];
      const weakset = new WeakSet(values);
      // only test is deletion since we can't iterate weak collection values
      weakset.delete(fn);
      assert.isFalse(weakset.has(fn));
    });
  });
  describe('transient keys', () => {
    it('(its) keys are GCed when they have no other refs', () => {
      // untestable
    });
  });
});