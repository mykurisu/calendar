import Vue from 'rollup-plugin-vue';
import { terser } from 'rollup-plugin-terser';
import scss from 'rollup-plugin-scss';

module.exports = [
    {
        input: './lib/vue-entry.js',
        output: [
            {
                file: './dist/index.js',
                format: 'es'
            }
        ],
        plugins: [
            Vue({
                css: true,
                compileTemplate: true
            }),
            scss()
        ]
    }
]