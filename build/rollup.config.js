import resolve from 'rollup-plugin-node-resolve'
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
  external: ['vue', 'vuex', 'axios', 'dayjs', 'lodash', 'crypto'],
  output: {
    format: 'es',
    // sourcemap: true,
    file: './lib/zzj-base.js'
  },
  plugins: [
    resolve(),
    vue(),
    img({
      output: `${resolvePath('lib')}/images`,
      limit: 10000
    }),
    alias({
      resolve: ['.vue', '.js', '.json'],
      '@': resolvePath('src')
    }),
    json(),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true
    }),
    commonjs()
  ],
}