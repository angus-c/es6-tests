// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-class-definitions
describe('class', () => {
  class EmptyClass {};
  class BasicClass {
    static s() {return this}
    a() { return this }
    b() {}
  }

  describe('types', () => {
    it('is a constructor', () => {
      assert.equal(typeof EmptyClass, 'function');
      assert.equal(typeof EmptyClass.prototype, 'object');
      assert.equal(EmptyClass.prototype.constructor, EmptyClass);
    });
    it('\'s methods go on the prototype', () => {
      assert.equal(typeof BasicClass.prototype.a, 'function');
      assert.equal(typeof BasicClass.prototype.b, 'function');
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
          this.x = n;
        }
        c() {}
        d() {}
        e() {}
      }
      SubClass = class extends SuperClass{
        constructor(n) {
          super(n);
          this.x += n;
        }
        e() {return super.e}
        f() {}
        g() {}
      }
    });
    it('(the subclass) can access methods from the superclass', () => {
      const subClass = new SubClass();
      assert.equal(typeof subClass.__proto__.e, 'function');
      assert.equal(typeof subClass.__proto__.f, 'function');
      assert.equal(typeof subClass.__proto__.g, 'function');
      assert.equal(typeof subClass.__proto__.__proto__.c, 'function');
      assert.equal(typeof subClass.__proto__.__proto__.d, 'function');
      assert.equal(typeof subClass.__proto__.__proto__.e, 'function');
      assert.equal(typeof subClass.c, 'function');
      assert.equal(typeof subClass.d, 'function');
      assert.equal(typeof subClass.e, 'function');
      assert.equal(typeof subClass.f, 'function');
      assert.equal(typeof subClass.g, 'function');
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
      const subClass = new SubClass();
      assert.equal(typeof subClass.e, 'function');
      assert.equal(typeof subClass.e(), 'function');
      assert.notEqual(subClass.e, subClass.e());
    });
    it('(super) calls superclass constructor', () => {
      const subClass = new SubClass(1);
      assert.equal(subClass.x, 2);
    });
  });
  describe('static methods', () => {
    it('(they) can only be invoked by the constructor', () => {
      let bc = new BasicClass();
      assert.isUndefined(bc.s);
      assert.isDefined(BasicClass.s);
    });
    it('(their) `this` value is the class', () => {
      assert.equal(BasicClass.s(), BasicClass);
    });
    it('(they) can only see static properties', () => {
      class BasicClass2 {
        static s1() {return sp}
        static s2() {return this.sp}
        static s3() {return BasicClass2.sp}
        static s4() {return this.i()}
        i() {return 7}
      }
      BasicClass2.sp = 4;
      assert.throws(BasicClass2.s1, Error);
      assert.equal(BasicClass2.s2(), 4);
      assert.equal(BasicClass2.s3(), 4);
      assert.throws(BasicClass2.s4, Error);
    });
  });

  describe('dynamism', () => {
    it('can create unique classes from a template', () => {
      const classMaker = () => class {
        a() {}
        b() {}
      };
      const Class1 = classMaker();
      const Class2 = classMaker();
      assert.notEqual(Class1, Class2);
      assert.notEqual(Class1.prototype.a, Class2.prototype.a);
      assert.notEqual(Class1.prototype.b, Class2.prototype.b);
    });
    it('(class) can be created with different super classes', () => {
      const classMaker = base => class extends base {};
      const Class1 = classMaker(class {a() {}});
      const Class2 = classMaker(class {b() {}});
      assert.notEqual(Class1, Class2);
      assert.isDefined(Class1.prototype.a);
      assert.isUndefined(Class1.b);
      assert.isDefined(Class2.prototype.b);
      assert.isUndefined(Class2.a);
    });
    it('(class) can generate instance methods on the fly', () => {
      const Class1 = class {a() {}};
      const class1 = new Class1();
      assert.equal(class1.a, Class1.prototype.a);
      assert.isUndefined(class1.b);
      Class1.prototype.b = () => {};
      assert.equal(class1.b, Class1.prototype.b);
      assert.isDefined(class1.b);
    });
  });
});
