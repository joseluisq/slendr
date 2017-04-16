import buble from 'rollup-plugin-buble'
import uglify from 'rollup-plugin-uglify'
import fs from 'fs'

const pkg = JSON.parse(fs.readFileSync('./package.json'))

export default {
  entry: pkg.main,
  useStrict: false,
  sourceMap: true,
  plugins: [ buble(), uglify() ],
  targets: [
    { dest: `dist/${pkg.name}.js`, format: 'cjs' },
    { dest: `dist/${pkg.name}.umd.js`, format: 'umd', moduleName: pkg.library }
  ]
}
