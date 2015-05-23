# es6-tests

[![Build Status](https://secure.travis-ci.org/angus-c/es6-tests.png?branch=master)](http://travis-ci.org/angus-c/es6-tests)

Unit Tests for every ES6 feature (Work In Progress)

##Testing

```
npm test
```
##FAQ

_Why are some tests skipped?_

I'm testing my tests using the wonderful [babel](http://babeljs.io/) transpiler. Their ES6 coverage is excellent [but not yet 100%](http://kangax.github.io/compat-table/es6/#babel). I'm skipping the tests that aren't yet covered so that Travis stays green. 

_There's already an [excellent ES test suite](https://github.com/tc39/test262) Why bother writing another?_

I'm certainly not trying to compete with the great work of _test262_. This is purely to improve my own understanding of the ES6 spec – and I figure writing tests from scratch (with no cribbing) is the best way to achieve that.

_Can I contribute?_

I welcome issue reports (I'm sure there are plenty of errors, as I don't have time to be particularly thorough) and please let me know if I've missed any aspects of a new feature. However I'm not accepting PRs for entire features, since I'm doing this for my own education (see above)







