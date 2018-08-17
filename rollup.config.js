import { name } from './package.json'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/index.ts',
  name,
  output: {
    file: `./dist/${name}.umd.min.js`,
    format: 'umd',
    sourcemap: false,
    exports: 'named'
  },
  plugins: [
    typescript(),
    resolve(),
    commonjs({
      sourceMap: false,
      include: 'node_modules/emitus/index.js'
    }),
    terser()
  ],
  onwarn
}

function onwarn(message) {
  const suppressed = ['UNRESOLVED_IMPORT', 'THIS_IS_UNDEFINED']

  if (!suppressed.find((code) => message.code === code)) {
    return console.warn(message.message)
  }
}
