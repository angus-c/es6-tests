https://people.mozilla.org/~jorendorff/es6-draft.html#sec-arrow-function-definitions
describe('arrow functions', () => {
  let fn;
  describe('braces and return statement', () => {
    it('does not need braces or return for single statement', () => {
      fn = x => x * x;
      assert.equal(fn(4), 16);
    });
    it('needs braces and return for multi statement', () => {
      fn = x => {x++; x * x};
      assert.equal(fn(4), undefined);
      fn = x => {x++; return x * x};
      assert.equal(fn(4), 25);
    });
  });

  describe('param values', () => {
    it('does not need parens for single parameter', () => {
      fn = x => x * x;
      assert.equal(fn(4), 16);
    });
    it('does need parens for no or many params', () => {
      fn = () => 5;
      assert.equal(fn(), 5);
      fn = (a, b) => a + b;
      assert.equal(fn(13, 2), 15);
    });

  });

  describe('`this` value', () => {
    it('observes lexical `this` binding', () => {
      let obj = {
        outerFn: () => {
          assert.equal(obj, this);
          fn = () => {
            assert.equal(obj, this);
          };
          return fn();
        }
      }
    });
    it('will not allow call/apply/bind to change `this`', () => {
      let obj = {
        outerFn: () => {
          fn = () => {
            return this;
          };
          assert.equal(fn.call({}), obj);
          assert.equal(fn.apply({}), obj);
          assert.equal(fn.bind({})(), obj);
        }
      }
    });
  });

  describe.skip('an arrow function is not a full function', () => {
    it('has no prototype', () => {
      assert.isUndefined((x => x*x).prototype);
    });
    it('is not a constructor', () => {
      assert.throw(() => new (x => x*x), Error);
    });
  });
});
