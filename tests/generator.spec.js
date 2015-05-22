// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generator-objects
describe('generators', () => {
  describe('types', () => {
    it.skip('(GeneratorFunction) is a constructor', () => {
      assert.equal(typeof GeneratorFunction, 'function');
      assert.equal(typeof GeneratorFunction.prototype, 'object');
    });

    it.skip('function* is a function keyword', () => {
      assert.equal(typeof function* (){}, 'function');
    });
  });

  describe('yield', () => {
    it('exits the function', () => {
      let x = 0;
      const g = (function* (){
        while(true) {
          x++;
          yield;
        }
      })();
      assert.deepEqual(g.next(), {value: undefined, done: false});
      assert.equal(x, 1);
    });

    it('exits the function with the given value', () => {
      let x = 0;
      const g = (function* (){
        while(true) {
          x++;
          yield 7;
        }
      })();
      assert.deepEqual(g.next(), {value: 7, done: false});
      assert.equal(x, 1);
    });

    it('maintains lcoal state between calls', () => {
      let x = 0, y;
      const g = (function* (){
        while(true) {
          x++;
          if (x == 1) {
            y = 8;
          }
          yield;
        }
      })();
      assert.deepEqual(g.next(), {value: undefined, done: false});
      assert.equal(x, 1);
      assert.equal(y, 8);
      assert.deepEqual(g.next(), {value: undefined, done: false});
      assert.equal(x, 2);
      assert.equal(y, 8);
    });

    it('yields while valid loop', () => {
      let x = 0;
      const g = (function* (){
        while(x < 2) {
          x++;
          yield;
        }
      })();
      assert.deepEqual(g.next(), {value: undefined, done: false});
      assert.equal(x, 1);
      assert.deepEqual(g.next(), {value: undefined, done: false});
      assert.equal(x, 2);
      assert.deepEqual(g.next(), {value: undefined, done: true});
    });

    it('delegates to another generator', () => {
      function* gf(y = 0) {
        while(true) {
          x -= 10;
          x += y;
          yield;
        }
      }

      let x = 0;
      const g1 = (function* (){
        while(true) {
          x++;
          yield* gf();
          yield;
        }
      })();
      assert.deepEqual(g1.next(), {value: undefined, done: false});
      assert.equal(x, -9);

      x = 0;
      const g2 = (function* (){
        while(true) {
          x++;
          yield* gf(4);
          yield;
        }
      })();
      assert.deepEqual(g2.next(), {value: undefined, done: false});
      assert.equal(x, -5);
    });
  });

  describe('for...of over generators', () => {
    it('iterates over the generator', () => {
      let x = 0;
      const g = function* () {
        while(true) {
          x++;
          yield x;
        }
      };

      let tally = 0;
      for (let val of g()) {
        if (val > 5) {
          break;
        }
        tally += val;
      }
      assert.equal(tally, 1+2+3+4+5);
    });
  });
});


