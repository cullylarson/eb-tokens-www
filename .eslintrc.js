module.exports = {
    'extends': ['standard', 'standard-react'],
    'parser': 'babel-eslint',
    'plugins': [
        'react',
    ],
    'env': {
        'browser': true,
        'es6': true,
        'jquery': false,
        'jest': true,
    },
    'parserOptions': {
        'ecmaVersion': '2020',
        'sourceType': 'module',
        'ecmaFeatures': {
            'jsx': true,
        },
    },
    globals: {
        'browser': true, // puppeteer
    },
    'rules': {
        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error',
        'indent': ['error', 4, {
            'SwitchCase': 1,
            'ignoredNodes': ['TemplateLiteral'],
        }],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
        'react/jsx-handler-names': 'off',
        'keyword-spacing': 'off',
        'brace-style': ['error', 'stroustrup', {'allowSingleLine': true}],
        'quotes': ['error', 'single', {'avoidEscape': true}],
        'comma-dangle': ['error', 'always-multiline'],
        'operator-linebreak': ['error', 'before'],
        'quote-props': 'off',
        'object-curly-spacing': ['error', 'never'],
        'space-before-function-paren': ['error', {
            'anonymous': 'never',
            'named': 'never',
            'asyncArrow': 'always',
        }],
        'multiline-ternary': 'off',
        'template-curly-spacing': 'off',
    },
}
