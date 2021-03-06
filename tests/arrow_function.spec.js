// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-arrow-function-definitions
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
        fn1() {
          assert.equal(obj, this);
          let fn2 = () => {
            assert.equal(obj, this);
            [1, 2, 3].forEach(() => {
              assert.equal(obj, this);
            });
          };
          return fn2();
        }
      }
      obj.fn1();
    });
    it('will not allow call/apply/bind to change `this`', () => {
      let obj = {
        fn1() {
          assert.equal(obj, this);
          let fn2 = () => this;
          assert.equal(fn2.call({}), obj);
          assert.equal(fn2.apply({}), obj);
          assert.equal(fn2.bind({})(), obj);
        }
      }
      obj.fn1();
    });
  });

  describe.skip('an arrow function is not a full function', () => {
    it('has no prototype', () => {
      assert.isUndefined((x => x * x).prototype);
    });

    it('is not a constructor', () => {
      assert.throw(() => new (x => x * x), Error);
    });

    it('is has no `arguments` object', () => {
      (() => assert.isUndefined(arguments))();
    });
  });
});
