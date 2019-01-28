module.exports = {
  parser: "babel-eslint",
  env: {
    browser: true,
    es6: true
  },
  settings: {
    ecmascript: 6,
    jsx: true
  },
  parserOptions: {
    ecmaVersion: 2017,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      experimentalDecorators: true,
      jsx: true
    },
    sourceType: "module"
  },
  plugins: ["react"],
  extends: "airbnb",
  rules: {
    "react/jsx-filename-extension": 0,
    "function-paren-newline": 0,
    "react/jsx-one-expression-per-line": 0,
    "no-console": 0,
    "react/prop-types": 0
  },
  globals: {
    test: true,
    expect: true,
    afterEach: true,
    jest: true
  }
};
