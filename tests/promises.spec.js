// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-promise-objects
describe('Promises', () => {
  function getPromise(success) {
    return new Promise((resolve, reject) => {
      setTimeout(
        success ? resolve('success') : reject('failure'),
        (Math.random() + 1) * 1000
      );
    });
  }

  describe('data types', () => {
    it('is a constructor', () => {
      assert.equal(typeof Promise, 'function');
      assert.equal(typeof Promise.prototype, 'object');
      assert.isTrue(new Promise((res, rej) => {}) instanceof Promise);
      assert.equal(typeof new Promise((res, rej) => {}), 'object');
    });
    it('requires a function argument', () => {
      assert.throws(() => new Promise(), Error);
      assert.doesNotThrow(() => new Promise((res, rej) => {}));
      assert.throws(() => new Promise({}), Error);
    });
  });

  describe('timing', () => {
    it('is async', (done) => {
      let buffer = [];
      new Promise(
        (resolve) => {
          resolve();
          buffer.push('hello');
        }
      ).then(() => {
        buffer.push('goodbye');
        assert.equal(buffer[0], 'hello');
        assert.equal(buffer[1], 'goodbye');
        done();
      });
      assert.equal(buffer[0], 'hello');
      assert.equal(buffer[1], undefined);
    });
  });

  describe('resolve and reject', () => {
    it('calls resolve on success', (done) => {
      getPromise(true).then((msg) => {
        assert.equal(msg, 'success');
        done();
      });
    });

    it('calls reject on failure', (done) => {
      getPromise(false).then(null, (msg) => {
        assert.equal(msg, 'failure');
        done();
      });
    });

    it('enters catch block on failure', (done) => {
      getPromise(false).then().catch(function (err) {
        assert.equal(err, 'failure');
        done();
      })
    });
  });

  describe('early fulfillment', () => {
    let succeeded, failed;

    beforeEach(() => {
      succeeded = false;
      failed = false;
    });

    function getPromise(success) {
      return new Promise((resolve, reject) => {
        success ? succeeded = true : failed = true;
        success ? resolve('success') : reject('failure');
      });
    }

    it('fulfills succesful promise before `then`', () => {
      getPromise(true);
      assert.isTrue(succeeded);
      assert.isFalse(failed);
    });

    it('rejects failed promise before `then`', () => {
      getPromise(false);
      assert.isFalse(succeeded);
      assert.isTrue(failed);
    });

    it('resolves succesful promise after it\'s been settled', (done) => {
      const p = getPromise(true);
      assert.isTrue(succeeded);
      p.then((msg) => {
        assert.equal(msg, 'success');
        done();
      });
    });

    it('rejects failed promise after it\'s been settled', (done) => {
      const p = getPromise(false);
      assert.isTrue(failed);
      p.then(null, (msg) => {
        assert.equal(msg, 'failure');
        done();
      });
    });

    it('enters catch block after failed promise has been settled', (done) => {
      const p = getPromise(false);
      assert.isTrue(failed);
      p.then().catch(function (err) {
        assert.equal(err, 'failure');
        done();
      })
    });
  });

  describe('chained `thens`', () => {
    it('(resolve) returns a thennable', () => {
      let countCall = 0;
      function resolve() {
        countCall++;
      }

      getPromise(true).then(resolve()).then(resolve()).then(resolve());
      assert.equal(countCall, 3);
    });
  });

  describe('Promise.all', () => {
    let r;
    Promise.all(['a', 'b', 'c']).then((arr) => {
      r = arr.map(t=>t + '1')
      assert.sameMembers(r, ['a1', 'b1', 'c1']);
    });
    assert.isUndefined(r);
  });

  describe('Promise.race', () => {
    const p1 = new Promise(function (resolve, reject) {
      setTimeout(() => resolve('p1 resolved'), 300);
    });
    const p2 = new Promise(function (resolve, reject) {
      setTimeout(() => resolve('p2 resolved'), 100);
    });
    Promise.race([p1, p2]).then(data => {
      assert.equal(data, 'p2 resolved');
    });
  });
});

