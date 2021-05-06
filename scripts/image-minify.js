// supports .jpg, .gif, .jpeg, .png, .svg

const path = require('path')
const ora = require('ora')
const recursive = require('recursive-readdir')
const {compose, curry, filter, map} = require('@cullylarson/f')
const {nConcurrent} = require('@cullylarson/p')
const imagemin = require('imagemin')
const ImageminMozjpeg = require('imagemin-mozjpeg')
const ImageminPngquant = require('imagemin-pngquant')
const ImageminGiflossy = require('imagemin-giflossy')
const ImageminSvgo = require('imagemin-svgo')
const {extendDefaultPlugins} = require('svgo')
const yargs = require('yargs')

const argv = yargs(process.argv)
    .usage('Usage: $0 --in=src --out=build')
    .demandOption(['in', 'out'])
    .help('h')
    .alias('h', 'help')
    .describe('out', 'Where to put minified images.')
    .argv

const getPathRelativeToIn = (inPath, filePath) => {
    return compose(
        x => x.replace(/^\/+/, ''),
        x => x.replace(new RegExp('^' + inPath), ''),
    )(filePath)
}

const pathToFileInfo = curry((inPath, outPath, filePath) => {
    const pathRelativeToIn = getPathRelativeToIn(inPath, filePath)

    return {
        filePath,
        destinationPath: path.dirname(path.join(outPath, pathRelativeToIn)),
    }
})

const processOneFile = curry((plugins, fileInfo) => {
    return imagemin([fileInfo.filePath], {
        destination: fileInfo.destinationPath,
        plugins,
    })
})

const filesByLength = l => `${l} file${l === 1 ? '' : 's'}`

const plugins = [
    ImageminMozjpeg({quality: 70}),
    ImageminPngquant({
        quality: [0, 0.9], // the plugin will try to meet or exceed the maximum quality. if if falls below the minimum, it will throw an exception. so, set the min to zero to prevent that (we don't care if the quality must be lower, just take what we can get)
        speed: 1,
        dithering: 1,
    }),
    ImageminSvgo({
        plugins: extendDefaultPlugins([
            // don't remove the viewBox attribute
            {name: 'removeViewBox', active: false}
        ])
    }),
    ImageminGiflossy({
        optimizationLevel: 3,
        lossy: 120,
        optimize: 3,
    }),
]

const spinner = ora()

recursive(argv.in)
    .then(filter(x => ['.jpg', '.jpeg', '.gif', '.png', '.svg'].includes(path.extname(x))))
    .then(map(pathToFileInfo(argv.in, argv.out)))
    .then(xs => {
        spinner.start(`Processing ${filesByLength(xs.length)}.`)
        return xs
    })
    .then(xs => {
        const processOneFileLimited = nConcurrent(10, processOneFile(plugins))

        return Promise.all(xs.map(processOneFileLimited))
    })
    .then(xs => spinner.succeed(`Done processing ${filesByLength(xs.length)}.`))
    .catch(err => {
        spinner.fail('Something went wrong. ' + err)
        console.error('Potentially more details about the exception:', err)
    })
