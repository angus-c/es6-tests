// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-let-and-const-declarations
describe('let and const', () => {
  describe('scoping', () => {
    it('(they) are scoped once per block', () => {
      let a = 3;
      const b = 13;
      {
        let a = 4;
        const b = 9;
        assert.equal(a, 4);
        assert.equal(b, 9);
      }
      assert.equal(a, 3);
      assert.equal(b, 13);
    });

    it('(they) are not available in outer blocks', () => {
      {
        let a = 4;
        const b = 9;
        assert.equal(a, 4);
        assert.equal(b, 9);
      }
      assert.throws(() => a, Error);
      assert.throws(() => b, Error);
    });

    it('(they) are available in inner blocks', () => {
      let a = 3;
      const b = 13;
      {
        assert.equal(a, 3);
        assert.equal(b, 13);
      }
    });

    it.skip('(let) is not hoisted', () => {
      var fn = () => {
        a = 3;
        let a;
      }
      assert.throws(fn, Error);
    });
  });

  describe('const and immutability', () => {
    it('is mutable', () => {
      const x = {a: 4};
      x.a = 7;
      x.b = 9;
      assert.equal(x.a, 7);
      assert.equal(x.b, 9);
    });

    // it('is not reassignable', () => {
    //   const x = {a: 4};
    //   expect(() => {x = {a: 7}}).to.throw(Error);
    //   expect(() => {x = 'a cake'}).to.throw(Error);
    // });
  });
});

