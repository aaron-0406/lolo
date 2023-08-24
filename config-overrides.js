const path = require('path')
const { override, addWebpackAlias } = require('customize-cra')

module.exports = override(
  addWebpackAlias({
    '@/hooks': path.resolve(__dirname, 'src/shared/hooks'),
    '@/services': path.resolve(__dirname, 'src/shared/services'),
    '@/types': path.resolve(__dirname, 'src/shared/types'),
    '@/ui': path.resolve(__dirname, 'src/ui'),
  })
)
