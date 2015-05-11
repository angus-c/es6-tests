describe('class', () => {

  class EmptyClass {};
  class BasicClass {
    a() {return this}
    b() {}
  }
  class SuperClass {
    constructor(n) {
      this.x += n;
    }
    c() {}
    d() {}
  }
  class SubClass extends SuperClass{
    constructor(n) {
      super(n);
      this.x += n;
    }
    e() {}
    f() {}
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
    let ec = new EmptyClass();
    let bc = new BasicClass();
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
  });
});