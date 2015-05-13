describe('class', () => {

  class EmptyClass {};
  class BasicClass {
    a() { return this }
    b() {}
  }

  describe('types', () => {
    it('is a constructor', () => {
      assert.equal(typeof EmptyClass, "function");
      assert.equal(typeof EmptyClass.prototype, "object");
      assert.equal(EmptyClass.prototype.constructor, EmptyClass);
    });
    it('\'s methods go on the prototype', () => {
      assert.equal(typeof BasicClass.prototype.a, "function");
      assert.equal(typeof BasicClass.prototype.b, "function");
    });
  });

  describe('instances', () => {
    const ec = new EmptyClass();
    const bc = new BasicClass();
    it('(their) constructor is the class', () => {
      assert.equal(ec.constructor, EmptyClass);
      assert.equal(bc.constructor, BasicClass);
    });
    it('(they) reference class methods in their prototype', () => {
      assert.equal(bc.__proto__.a, BasicClass.prototype.a);
      assert.equal(bc.__proto__.b, BasicClass.prototype.b);
    });
    it('\'s value is `this` when calling prototype methods', () => {
      assert.equal(bc.a(), bc);
    });
  });

  describe('extends', () => {
    let SuperClass, SubClass;
    beforeEach(() => {
      SuperClass  = class {
        constructor(n) {
          this.x += n;
        }
        c() {}
        d() {super.d()}
      }
      SubClass = class extends SuperClass{
        constructor(n) {
          super(n);
          this.x += n;
        }
        d() {}
        e() {}
        f() {}
      }
    });
    it('(the subclass) can access methods from the superclass', () => {
      const subClass = new SubClass();
      assert.equal(typeof subClass.__proto__.e, 'function');
      assert.equal(typeof subClass.__proto__.f, 'function');
      assert.equal(typeof subClass.__proto__.__proto__.c, 'function');
      assert.equal(typeof subClass.__proto__.__proto__.d, 'function');
      assert.equal(typeof subClass.e, 'function');
      assert.equal(typeof subClass.f, 'function');
      assert.equal(typeof subClass.c, 'function');
      assert.equal(typeof subClass.d, 'function');
    });
    it('(the subclass) can override methods from the superclass', () => {
      SubClass.prototype.c = function() {};
      const subClass = new SubClass();
      assert.notEqual(subClass.c, subClass.__proto__.__proto__.c);
    });
    it('can dynamically override methods from the superclass', () => {
      const subClass = new SubClass();
      const superC = subClass.c;
      SubClass.prototype.c = function() {};
      assert.notEqual(subClass.c, superC);
    });
    it('uses super to access the superclass method', () => {
      SubClass.prototype.c = function() {
        assert.equal(typeof this.c, 'function');
        // assert.notEqual(this.c, super.c);
      };
    });
  });
});