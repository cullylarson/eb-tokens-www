const path = require('path')

module.exports = {
    'presets': [
        ['next/babel', {
            'preset-env': {},
            'styled-jsx': {
              'plugins': ['styled-jsx-plugin-postcss'],
            },
        }],
    ],
    'plugins': [
        '@babel/plugin-proposal-optional-chaining',
    ],
}
