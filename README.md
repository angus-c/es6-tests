# es6-test-runner

[![Build Status](https://secure.travis-ci.org/angus-c/es6-test-runner.png?branch=master)](http://travis-ci.org/angus-c/es6-test-runner)

`es6-test-runner` is a boilerplate for testing your es6 app using mocha and chai over karma runner. It uses webpack bundle your application code and babel to transpile it to ES5.

Use it as a template for your modules. The `npm prepublish` step will transpile your module to es5 and place it in the `lib` directory for public consumption.

## Naming Conventions

Tests are expected to end in `.spec.js` and live in the `tests` directory.

##Installation

This is just a template module so you wouldn't install it from npm. However it's fully configured for you to make an npm module from your fork of the repo.

```
npm install <your fork of es6-test-runner>
```

When installed it will transpile your `src` code to es5 and drop into into `lib`. Users insatlling your module will import `lib.index.js`.

##Testing

```
npm test
```








