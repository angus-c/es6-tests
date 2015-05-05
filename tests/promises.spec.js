describe('Promises', () => {
  // http://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.assign
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
    function getPromise(success) {
      return new Promise((resolve, reject) => {
        setTimeout(
          success ? resolve('success'): reject('failure'),
          1000
        );
      });
    }

    it('calls resolve on success', (done) => {
      const p = getPromise(true).then((msg)=>{
        assert.equal(msg, 'success');
        done();
      });
    });

    it('calls reject on failure', (done) => {
      const p = getPromise(false).then(null, (msg)=>{
        assert.equal(msg, 'failure');
        done();
      });
    });

    it('enters catch block on failure', (done) => {
      const p = getPromise(false).then().catch(function(err){
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
        success ? succeeded = true: failed = true;
        success ? resolve('success'): reject('failure');
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
      let p = getPromise(true);
      assert.isTrue(succeeded);
      p.then((msg) => {
        assert.equal(msg, 'success');
        done();
      });
    });

    it('rejects failed promise after it\'s been settled', (done) => {
      let p = getPromise(false);
      assert.isTrue(failed);
      p.then(null, (msg) => {
        assert.equal(msg, 'failure');
        done();
      });
    });

    it('enters catch block after failed promise has been settled', (done) => {
      let p = getPromise(false);
      assert.isTrue(failed);
      p.then().catch(function(err){
        assert.equal(err, 'failure');
        done();
      })
    });
  });
});

