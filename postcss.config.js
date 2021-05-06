const path = require('path')
const createResolver = require('postcss-import-webpack-resolver')

module.exports = {
    plugins: {
        'postcss-import': {
            resolve: createResolver({
                alias: {
                    '@css': path.resolve(__dirname, 'client/style'),
                    '@client': path.resolve(__dirname, 'client'),
                },
            }),
        },
        'postcss-mixins': {},
        'postcss-simple-vars': {},
        'postcss-nested-ancestors': {},
        'postcss-nested': {},
        'postcss-custom-media': {},
        'postcss-calc': {mediaQueries: true},
        'postcss-pxtorem': {
            rootValue: 16,
            unitPrecision: 5,
            propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
            replace: true,
            mediaQuery: false,
            minPixelValue: 0,
        },
        'postcss-preset-env': {
            stage: 0,
            browsers: 'last 2 versions',
        },
    }
}
