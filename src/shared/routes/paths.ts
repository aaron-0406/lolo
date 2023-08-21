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
    funcionarios: 'dash/funcionarios',
    permisos: 'dash/permisos',
    reportes: '/dash/reportes',
    negociaciones: '/dash/negociaciones',
    acciones: '/dash/acciones',
  },
  company: {
    root: (urlIdentifier = ':urlIdentifier') => `/${urlIdentifier}`,
    login: (urlIdentifier = ':urlIdentifier') => `/${urlIdentifier}/login`,
  },
  cobranza: {
    perfil: (urlIdentifier = ':urlIdentifier') => `/cobranza/${urlIdentifier}/perfil`,
    clientes: (urlIdentifier = ':urlIdentifier') => `/cobranza/${urlIdentifier}/clientes`,
    cobranza: (urlIdentifier = ':urlIdentifier') => `/cobranza/${urlIdentifier}/cobranza`,
    metas: (urlIdentifier = ':urlIdentifier') => `/cobranza/${urlIdentifier}/metas`,
    document: (urlIdentifier = ':urlIdentifier') => `/cobranza/${urlIdentifier}/document`,
  },
  judicial: {
    perfil: (urlIdentifier = ':urlIdentifier') => `/judicial/${urlIdentifier}/perfil`,
  },
  companyDashboard: {
    root: (urlIdentifier = ':urlIdentifier') => `/${urlIdentifier}`,
    dashboard: (urlIdentifier = ':urlIdentifier') => `/${urlIdentifier}/dashboard`,
  },
}
