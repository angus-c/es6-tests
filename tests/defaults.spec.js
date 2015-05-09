describe('defaults', () => {
  const _n = 2;
  const _s = '3';
  const _b = false;
  const _sym = Symbol.for('y');
  const _o = {r: 5};
  const _a = [0,6,5];

  it('can assign values of type', () => {
    const fn = (
      a = 2,
      b = '3',
      c = false,
      d = Symbol.for('x'),
      e = {r: 5},
      f = [0, 6, 5]
    ) => {
      assert.equal(a, 2);
      assert.equal(b, '3');
      assert.equal(c, false);
      assert.equal(Symbol.keyFor(d), 'x');
      assert.deepEqual(e, {r: 5});
      assert.sameMembers(f, [0, 6, 5]);
    };
    fn();
  });
  it('can assign via reference', () => {
    const fn = (
      a = _n,
      b = _s,
      c = _b,
      d = _sym,
      e = _o,
      f = _a
    ) => {
      assert.equal(a, 2);
      assert.equal(b, '3');
      assert.equal(c, false);
      assert.equal(Symbol.keyFor(d), 'y');
      assert.deepEqual(e, {r: 5});
      assert.sameMembers(f, [0, 6, 5]);
    };
    fn();
  });
  it('only assigns if argument not past', () => {
    const fn = (
      a = _n,
      b = _s,
      c = _b,
      d = _sym,
      e = _o,
      f = _a
    ) => {
      assert.equal(a, 7);
      assert.equal(b, '8');
      assert.equal(c, true);
      assert.equal(d, 'not a symbol');
      assert.deepEqual(e, {h: 1});
      assert.equal(f, 73);
    };
    fn(7, '8', true, 'not a symbol', {h: 1}, 73);
  });
  it('can be assigned via destructure', () => {
    const fn = (
      [a, b, c, d, {e, f}] = [_n, _s, _b, _sym, {e: _o, f: _a}]
    ) => {
      assert.equal(a, 2);
      assert.equal(b, '3');
      assert.equal(c, false);
      assert.equal(Symbol.keyFor(d), 'y');
      assert.deepEqual(e, {r: 5});
      assert.sameMembers(f, [0, 6, 5]);
    };
    fn();
  });
});
