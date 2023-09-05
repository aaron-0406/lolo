// eslint-disable-next-line import/no-anonymous-default-export
export default {
  root: '/',
  error: '/error',
  general: {
    validate: '/validate-token',
    notFound: '/not-found',
    unauthorized: '/unauthorized',
  },
  dash: {
    root: '/dash',
    login: '/dash/login',
    clientes: '/dash/clientes',
    usuarios: '/dash/usuarios',
    funcionarios: 'dash/funcionarios',
    permisos: 'dash/permisos',
    roles: 'dash/roles',
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
    cobranzaComments: (urlIdentifier = ':urlIdentifier', code = ':code') =>
      `/cobranza/${urlIdentifier}/cobranza/${code}`,
    metas: (urlIdentifier = ':urlIdentifier') => `/cobranza/${urlIdentifier}/metas`,
    document: (urlIdentifier = ':urlIdentifier') => `/cobranza/${urlIdentifier}/document`,
    dashboard: (urlIdentifier = ':urlIdentifier') => `/cobranza/${urlIdentifier}/dashboard`,
  },
  judicial: {
    perfil: (urlIdentifier = ':urlIdentifier') => `/judicial/${urlIdentifier}/perfil`,
  },
}
