const path = require('path')
const webpack = require('webpack')
const nextBuildId = require('next-build-id')

module.exports = {
    poweredByHeader: false,

    // enable source maps in prodution (google web vitals likes this for some reason)
    productionBrowserSourceMaps: true,

    future: {
        webpack5: true,
    },

    i18n: {
        locales: ['en-US'],
        defaultLocale: 'en-US',
    },

    webpack(config, options) {
        // ENVIRONMENT VARIABLES

        if(process.env.NODE_ENV === 'development') {
            require('dotenv').config({'path': path.join(__dirname, 'secrets/env.dev')})
        }
        else if(process.env.NODE_ENV === 'production') {
            require('dotenv').config({'path': path.join(__dirname, 'secrets/env.prod')})
        }

        const env = Object.keys(process.env).reduce((acc, curr) => {
            acc[`process.env.${curr}`] = JSON.stringify(process.env[curr])
            return acc
        }, {})

        config.plugins.push(new webpack.DefinePlugin(env))

        // ALIASES

        config.resolve.alias['@@client'] = path.join(__dirname, 'client')
        config.resolve.alias['@@app'] = __dirname

        return config
    },

    // the build id for nextjs is normally random. this  makes builds different on multiple servers. the solution is to use
    // the git hash as the build id, so it's the same no matter where it's built.
    generateBuildId: async () => {
        const fromGit = await nextBuildId({dir: __dirname})
        return fromGit.id || fromGit
    },

    async headers() {
        const cacheControl = {
            key: 'Cache-Control',
            value: 'public, max-age=604800' // 604800s = 1week
        }

        return [
            {
                source: '/images/(.*?).(jpg|jpeg|gif|webp|png|ico|svg)',
                headers: [
                    cacheControl,
                ],
            },
            {
                // images served by next/image
                source: '/_next/image(.*)',
                headers: [
                    cacheControl,
                ],
            },
        ]
    },
}
