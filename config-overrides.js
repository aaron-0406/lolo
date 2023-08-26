const path = require('path')
const { override, addWebpackAlias } = require('customize-cra')

module.exports = override(
  addWebpackAlias({
    '@/pages/extrajudicial': path.resolve(__dirname, 'src/pages/Company/Extrajudicial'),
    '@/pages/dashboard': path.resolve(__dirname, 'src/pages/Dashboard'),
    '@/assets': path.resolve(__dirname, 'src/shared/assets'),
    '@/breakpoints': path.resolve(__dirname, 'src/shared/breakpoints'),
    '@/contexts': path.resolve(__dirname, 'src/shared/contexts'),
    '@/hooks': path.resolve(__dirname, 'src/shared/hooks'),
    '@/services': path.resolve(__dirname, 'src/shared/services'),
    '@/types': path.resolve(__dirname, 'src/shared/types'),
    '@/ui': path.resolve(__dirname, 'src/ui'),
  })
)
