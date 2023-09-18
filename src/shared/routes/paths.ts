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
    permisos: '/dash/permisos',
    roles: '/dash/roles',
    reportes: '/dash/reportes',
  },
  company: {
    root: (urlIdentifier = ':urlIdentifier') => `/${urlIdentifier}`,
    login: (urlIdentifier = ':urlIdentifier') => `/${urlIdentifier}/login`,
    usuarios: (urlIdentifier = ':urlIdentifier') => `/${urlIdentifier}/usuarios`,
    roles: (urlIdentifier = ':urlIdentifier') => `/${urlIdentifier}/roles`,
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
    funcionarios: (urlIdentifier = ':urlIdentifier') => `/cobranza/${urlIdentifier}/funcionarios`,
    negociaciones: (urlIdentifier = ':urlIdentifier') => `/cobranza/${urlIdentifier}/negociaciones`,
    acciones: (urlIdentifier = ':urlIdentifier') => `/cobranza/${urlIdentifier}/acciones`,
  },
  judicial: {
    perfil: (urlIdentifier = ':urlIdentifier') => `/judicial/${urlIdentifier}/perfil`,
  },
}
