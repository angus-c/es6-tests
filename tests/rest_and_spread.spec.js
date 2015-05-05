describe('rest and spread', () => {
  describe('rest', () => {
    it('makes an array', () => {
      ((...args) => {
        assert.isTrue(Array.isArray(args));
      })(1, 2, 3);
    });
    it('includes all arguments', () => {
      ((...args) => {
        assert.sameMembers(args, ['one', 2, false]);
      })('one', 2, false);
      ((...args) => {
        assert.deepEqual(args[0], {a: {b:4}});
      })({a: {b:4}});
    });
    it('returns an empty array if no arguments', () => {
      ((...args) => {
        assert.sameMembers(args, []);
      })();
    });
    it('is only composed of the params not assigned to named args', () => {
      ((a, b, ...args) => {
        assert.sameMembers(args, [3, 4, 5]);
      })(1, 2, 3, 4, 5);
    });
    it('is empty if all param are assigned to named args', () => {
      ((a, b, ...args) => {
        assert.sameMembers(args, []);
      })(1, 2);
    });
    // it('must fall after named args', () => {
    //   assert.throws((a, b, ...args, c) => {}, Error);
    // });
    it('can destructure', () => {
      ((a, b, ...[c, d]) => {
        assert.equal(c, 3);
        assert.equal(d, 4);
      })(1, 2, 3, 4);
      ((a, b, ...[c, d]) => {
        assert.equal(c, 3);
        assert.isUndefined(d);
      })(1, 2, 3);
      ((a, b, ...[c, d]) => {
        assert.equal(c, 3);
        assert.equal(d, 4);
      })(1, 2, 3, 4, 5, 6);
    });
    it('can be used to destructure within an array', () => {
      ((a, b, ...c) => {
        assert.sameMembers(c, [3, 4]);
      })(1, 2, 3, 4);
    });
  });
  describe('spread', () => {
    // it('cannot exist standalone', () => {
    //   expect((a)=>{...a}).toThrow(Error);
    // });
    it('creates as many items as array had members', () => {
      assert.equal([...[1, 2, 3]].length, 3);
    });
    it('generates same items as array', () => {
      assert.sameMembers([...[1, 2, 3]], [1, 2, 3]);
    });
    it('generates no members from an empty array', () => {
      assert.equal([...[]].length, 0);
      assert.sameMembers([...[]], []);
    });
    it('need not come last in an array', () => {
      assert.equal([1, ...[2, 3, 4], 5].length, 5);
      assert.sameMembers([1, ...[2, 3, 4], 5], [1, 2, 3, 4, 5]);
    });
    it('can be used to make arguments', () => {
      let arr = [1, 2, 3];
      arr.push(...[4, 5, 6]);
      assert.sameMembers(arr, [1, 2, 3, 4, 5, 6]);
    });
    it('can be used to spread iterables', () => {
    });
  });
});

