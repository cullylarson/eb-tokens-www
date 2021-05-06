const path = require('path')

module.exports = {
    'presets': [
        ['next/babel', {
            'preset-env': {},
        }],
    ],
    'plugins': [
        '@babel/plugin-proposal-optional-chaining',
        ['styled-jsx/babel', { 'plugins': ['styled-jsx-plugin-postcss'] }],
    ],
}
