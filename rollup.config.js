import pkg from './package.json'
import banner from 'banr'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: '.cache/index.js',
  output: {
    name: pkg.name,
    file: `dist/${pkg.name}.umd.js`,
    format: 'umd',
    exports: 'named',
    sourcemap: true,
    banner: banner()
  },
  plugins: [
    resolve(),
    commonjs({
      namedExports: {
        'node_modules/emitus/dist/emitus.umd.js': [ 'emitus' ]
      }
    })
  ],
  onwarn
}

function onwarn (message) {
  const suppressed = [ 'UNRESOLVED_IMPORT', 'THIS_IS_UNDEFINED' ]

  if (!suppressed.find((code) => message.code === code)) {
    return console.warn(message.message)
  }
}
