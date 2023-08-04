// eslint-disable-next-line import/no-anonymous-default-export
export default {
  root: '/',
  error: '/error',
  general: {
    validate: '/validate-token',
    notFound: '/not-found',
  },
  dash: {
    root: '/dash',
    login: '/dash/login',
    clientes: '/dash/clientes',
    usuarios: '/dash/usuarios',
    reportes: '/dash/reportes',
  },
  company: {
    root: (urlIdentifier = ':urlIdentifier') => `/${urlIdentifier}`,
    login: (urlIdentifier = ':urlIdentifier') => `/${urlIdentifier}/login`,
    perfil: (urlIdentifier = ':urlIdentifier') => `/${urlIdentifier}/perfil`,
    clientes: (urlIdentifier = ':urlIdentifier') => `/${urlIdentifier}/clientes`,
    cobranza: (urlIdentifier = ':urlIdentifier') => `/${urlIdentifier}/cobranza`,
    metas: (urlIdentifier = ':urlIdentifier') => `/${urlIdentifier}/metas`,
    document: (urlIdentifier = ':urlIdentifier') => `/${urlIdentifier}/document`,
  },
  companyDashboard: {
    root: (urlIdentifier = ':urlIdentifier') => `/${urlIdentifier}`,
    dashboard: (urlIdentifier = ':urlIdentifier') => `/${urlIdentifier}/dashboard`,
  },
}
