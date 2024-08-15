module.exports = {
    root: true,
    env: {
      node: true
    },
    extends: [
      'eslint:recommended',
      'plugin:vue/vue3-essential',
      'plugin:prettier/recommended'
    ],
    parserOptions: {
      parser: '@babel/eslint-parser',
      requireConfigFile: false
    },
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'vue/no-unused-components': 'warn',
      'vue/no-unused-vars': 'warn'
    },
    overrides: [
      {
        files: ['**/tests/**/*.js'],
        env: {
          jest: true
        }
      }
    ]
  };
  