const { nodeResolve } = require("@rollup/plugin-node-resolve")
const commonjs = require("@rollup/plugin-commonjs")
const { terser } = require("rollup-plugin-terser")
const scss = require('rollup-plugin-scss')
const postcss = require('postcss')
const autoprefixer = require('autoprefixer')


module.exports = {
    input: './lib/core.js',
    output: {
        file: './dist/core.js',
        name: 'lib',
        format: 'umd'
    },
    
    plugins: [
        nodeResolve(),
        commonjs(),
        terser(),
        scss({
            output: './dist/index.css',
            processor: () => postcss([autoprefixer({ overrideBrowserslist: ['iOS 7'] })]),
        }),
    ]
}