/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@md/eslint-config/next.js'],
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['*.config.js'],
  parserOptions: {
    project: true,
  },
}
