import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import { name } from './package.json'

const format = process.env.MODULE_FORMAT || 'cjs'
const isUMD = (format === 'umd')
const file = './dist/' + (isUMD ? name + '.min.js' : 'index.js')
const output = {
  name,
  file,
  format,
  sourcemap: false,
  exports: 'named'
}
const plugins = [
  typescript()
]

if (isUMD) {
  plugins.push(resolve())
  plugins.push(terser())
  plugins.push(commonjs({
    sourceMap: false,
    namedExports: {
      'node_modules/emitus/index.js': ['Emitus'],
      'node_modules/imgz/index.js': ['Loader'],
    }
  }))
}

export default {
  input: 'src/index.ts',
  output,
  plugins,
  onwarn
}

function onwarn(message) {
  const suppressed = ['UNRESOLVED_IMPORT', 'THIS_IS_UNDEFINED']

  if (!suppressed.find((code) => message.code === code)) {
    return console.warn(message.message)
  }
}
