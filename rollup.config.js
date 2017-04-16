import buble from 'rollup-plugin-buble'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify'
import fs from 'fs'

const env = process.env.NODE_ENV
const pkg = JSON.parse(fs.readFileSync('./package.json'))

const targets = []
const external = []
const plugins = [ resolve(), commonjs(), buble() ]

if (env === 'minified') {
  targets.push({
    dest: `dist/${pkg.name}.min.js`,
    format: 'umd',
    moduleName: pkg.name
  })
  plugins.push(uglify())
}

if (env === 'unminified') {
  targets.push({ dest: `dist/${pkg.name}.js`, format: 'cjs' })
  external.push('emitus')
}

export default {
  entry: 'src/index.js',
  useStrict: true,
  sourceMap: true,
  plugins,
  external,
  targets
}
