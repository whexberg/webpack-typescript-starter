const parserOptions = {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
};
module.exports = {
    root: true,
    env: { browser: true, es6: true, node: true },
    extends: ['eslint:recommended', 'plugin:prettier/recommended'],
    parserOptions,
    overrides: [
        {
            extends: [
                'eslint:recommended',
                'plugin:@typescript-eslint/eslint-recommended',
                'plugin:@typescript-eslint/recommended',
                'plugin:prettier/recommended',
            ],
            files: ['**/*.ts', '**/*.tsx'],
            globals: { Atomics: 'readonly', SharedArrayBuffer: 'readonly' },
            parser: '@typescript-eslint/parser',
            plugins: ['@typescript-eslint'],
            rules: {},
        },
    ],
};
