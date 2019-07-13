module.exports = {
  env: {
    node: true,
  },
  extends: ["eslint:recommended", "standard", "prettier"],
  plugins: ["prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    "no-console": 0,
    indent: ["error", 2, { SwitchCase: 1 }],
    "no-multi-spaces": [2, { exceptions: { ObjectExpression: true } }],
    "no-trailing-spaces": 1,
    "node/exports-style": "error",
    "node/no-deprecated-api": "error",
    "node/no-missing-import": "error",
    "node/no-missing-require": "error",
    "node/no-unpublished-bin": "error",
    "node/no-unpublished-import": "error",
    "node/no-unpublished-require": "error",
    "node/no-unsupported-features": "error",
    "node/process-exit-as-throw": "error",
    "node/shebang": "error",
    "no-multiple-empty-lines": "error",
  },
};
