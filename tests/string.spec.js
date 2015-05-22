describe('new string features', () => {
  // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-source-text
  describe('new unicode features', () => {
    it("supports new escape syntax", () => {
      // surrogate pair and real unicode for a fish
      assert.equal('\uD83D\uDC20', '\u{1F420}');
    });
    it("supports codePointAt", () => {
      assert.equal('abc'.codePointAt(1).toString(16), '62');
      assert.equal('\uD83D\uDC20'.codePointAt(0).toString(16), '1f420');
    });
  });
  describe('new introspect features', () => {
    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-string.prototype.startswith
    it("supports startsWith", () => {
      assert.isTrue('panda'.startsWith('p'));
      assert.isTrue('panda'.startsWith('panda'));
      assert.isFalse('panda'.startsWith('pandas'));
      assert.isFalse('panda'.startsWith('q'));
      assert.isTrue('\uD83D\uDC20'.startsWith('\u{1F420}'));
    });
    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-string.prototype.endswith
    it("supports endsWith", () => {
      assert.isTrue('panda'.endsWith('a'));
      assert.isTrue('panda'.endsWith('panda'));
      assert.isFalse('panda'.endsWith('pandas'));
      assert.isFalse('panda'.endsWith('q'));
      assert.isTrue('\uD83D\uDC20'.endsWith('\u{1F420}'));
    });
    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-string.prototype.includes
    it.skip("supports includes", () => {
      assert.isTrue('panda'.includes('p'));
      assert.isTrue('panda'.includes('n'));
      assert.isTrue('panda'.includes('a'));
      assert.isTrue('panda'.includes('panda'));
      assert.isFalse('panda'.includes('pandas'));
      assert.isFalse('panda'.includes('q'));
      assert.isTrue('\uD83D\uDC20'.includes('\u{1F420}'));
    });
  });
  // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-string.prototype.repeat
  describe('repeat', () => {
    it("supports repeat", () => {
      assert.equal('panda'.repeat(3), 'pandapandapanda');
      assert.equal('\uD83D\uDC20'.repeat(2), '\u{1F420}\u{1F420}');
    });
  });
});