module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  env: {
    commonjs: true,
    node: true
  },
  extends: [
    'standard',
    'plugin:node/recommended',
    'plugin:security/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'node',
    'security'
  ],
  rules: {
    'prefer-const': 2,
    complexity: [1, 10],
    'max-len': [
      1,
      {
        code: 80,
        tabWidth: 2,
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreTemplateLiterals: true
      }
    ],
    'node/no-unpublished-require': 0,
    'node/no-unpublished-import': 0,
    'node/no-unsupported-features/es-syntax': 0,
    'security/detect-object-injection': 0
  }
}
