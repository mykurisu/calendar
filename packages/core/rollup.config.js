const { nodeResolve } = require("@rollup/plugin-node-resolve")
const commonjs = require("@rollup/plugin-commonjs")
const { terser } = require("rollup-plugin-terser")
const postcss = require('rollup-plugin-postcss')
const path = require('path')
const autoprefixer = require('autoprefixer')


module.exports = {
    input: './lib/core.js',
    output: {
        file: './dist/index.js',
        name: 'lib',
        format: 'umd'
    },
    
    plugins: [
        postcss({
            extract: true,
            extensions: ['.css'],
            plugins: [autoprefixer()],
            extract: path.resolve('dist/index.css')
        }),
        nodeResolve(),
        commonjs(),
        terser(),
    ]
}