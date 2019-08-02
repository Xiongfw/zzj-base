import alias from 'rollup-plugin-alias'
import commonjs from 'rollup-plugin-commonjs'
import vue from 'rollup-plugin-vue'
import img from 'rollup-plugin-img'
import json from 'rollup-plugin-json'
import babel from 'rollup-plugin-babel'
import { join } from 'path'

function resolvePath(dir) {
  return join(__dirname, '..', dir)
}

export default {
  input: './src/index.js',
  output: {
    format: 'es',
    sourcemap: true,
    file: './lib/zzj-base.js'
  },
  plugins: [
    commonjs(),
    vue(),
    img({
      output: `${resolvePath('lib')}/images`,
      limit: 10000
    }),
    json(),
    alias({
      resolve: ['.vue', '.js', '.json'],
      '@': resolvePath('src')
    }),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true
    }),
  ],
}