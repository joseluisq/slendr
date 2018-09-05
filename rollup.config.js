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
  typescript(),
  resolve()
]

if (isUMD) {
  plugins.push(terser())
  plugins.push(commonjs({
    sourceMap: false,
    include: 'node_modules/emitus/index.js'
  }))
} else {
  plugins.push(commonjs({
    sourceMap: false
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
