const path = require('path')
const { override, addWebpackAlias } = require('customize-cra')

module.exports = override(
  addWebpackAlias({
    '@/extrajudicial': path.resolve(__dirname, 'src/pages/Company/Extrajudicial'),
    '@/dashboard': path.resolve(__dirname, 'src/pages/Dashboard'),
    '@/contexts': path.resolve(__dirname, 'src/shared/contexts'),
    '@/hooks': path.resolve(__dirname, 'src/shared/hooks'),
    '@/services': path.resolve(__dirname, 'src/shared/services'),
    '@/types': path.resolve(__dirname, 'src/shared/types'),
    '@/ui': path.resolve(__dirname, 'src/ui'),
  })
)
