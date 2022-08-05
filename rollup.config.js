const base = require('@bitaccess/ts-config/library/rollup.config')
const pkg = require('./package.json')

export default {
  ...base(pkg),
  // overrides here
}
