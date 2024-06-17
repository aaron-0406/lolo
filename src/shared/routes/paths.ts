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
    userLogs: (urlIdentifier = ':urlIdentifier') => `/${urlIdentifier}/usuario-logs`,
    direccionesIp: (urlIdentifier = ':urlIdentifier') => `/${urlIdentifier}/banco-direcciones-ip`,
  },
  cobranza: {
    perfil: (urlIdentifier = ':urlIdentifier') => `/cobranza/${urlIdentifier}/perfil`,
    clientes: (urlIdentifier = ':urlIdentifier') => `/cobranza/${urlIdentifier}/clientes`,
    cobranza: (urlIdentifier = ':urlIdentifier', code = ':code') => `/cobranza/${urlIdentifier}/clientes/${code}`,
    cobranzaComments: (urlIdentifier = ':urlIdentifier', code = ':code') =>
      `/cobranza/${urlIdentifier}/clientes/${code}/gestion`,
    cobranzaContacts: (urlIdentifier = ':urlIdentifier', code = ':code') =>
      `/cobranza/${urlIdentifier}/clientes/${code}/contactos`,
    cobranzaProducts: (urlIdentifier = ':urlIdentifier', code = ':code') =>
      `/cobranza/${urlIdentifier}/clientes/${code}/productos`,
    cobranzaAddresses: (urlIdentifier = ':urlIdentifier', code = ':code') =>
      `/cobranza/${urlIdentifier}/clientes/${code}/direcciones`,
    cobranzaFiles: (urlIdentifier = ':urlIdentifier', code = ':code') =>
      `/cobranza/${urlIdentifier}/clientes/${code}/archivos`,
    metas: (urlIdentifier = ':urlIdentifier') => `/cobranza/${urlIdentifier}/metas`,
    document: (urlIdentifier = ':urlIdentifier') => `/cobranza/${urlIdentifier}/document`,
    dashboard: (urlIdentifier = ':urlIdentifier') => `/cobranza/${urlIdentifier}/dashboard`,
    funcionarios: (urlIdentifier = ':urlIdentifier') => `/cobranza/${urlIdentifier}/funcionarios`,
    negociaciones: (urlIdentifier = ':urlIdentifier') => `/cobranza/${urlIdentifier}/negociaciones`,
    acciones: (urlIdentifier = ':urlIdentifier') => `/cobranza/${urlIdentifier}/acciones`,
    etiquetas: (urlIdentifier = ':urlIdentifier') => `/cobranza/${urlIdentifier}/etiquetas`,
    tipoDirecciones: (urlIdentifier = ':urlIdentifier') => `/cobranza/${urlIdentifier}/tipo-direcciones`,
    tipoContactos: (urlIdentifier = ':urlIdentifier') => `/cobranza/${urlIdentifier}/tipo-contacto`,
    nombreProductos: (urlIdentifier = ':urlIdentifier') => `/cobranza/${urlIdentifier}/nombre-producto`,
  },
  judicial: {
    perfil: (urlIdentifier = ':urlIdentifier') => `/judicial/${urlIdentifier}/perfil`,
    viaProcedimental: (urlIdentifier = ':urlIdentifier') => `/judicial/${urlIdentifier}/via-procedimental`,
    juzgados: (urlIdentifier = ':urlIdentifier') => `/judicial/${urlIdentifier}/juzgados`,
    materias: (urlIdentifier = ':urlIdentifier') => `/judicial/${urlIdentifier}/materias`,
    expedientes: (urlIdentifier = ':urlIdentifier') => `/judicial/${urlIdentifier}/expedientes`,

    detallesExpediente: (urlIdentifier = ':urlIdentifier', code = ':code') =>
      `/judicial/${urlIdentifier}/expedientes/${code}`,
    detallesExpedienteRelatedProcess: (
      urlIdentifier = ':urlIdentifier',
      code = ':code',
      relatedProcessCode = ':relatedProcessCode'
    ) => `/judicial/${urlIdentifier}/expediente/${code}/procesos-conexos/${relatedProcessCode}`,
    productosDemandados: (urlIdentifier = ':urlIdentifier', code = ':code') =>
      `/judicial/${urlIdentifier}/expedientes/${code}/productos-demandados`,
    processStatus: (urlIdentifier = ':urlIdentifier', code = ':code') =>
      `/judicial/${urlIdentifier}/expediente/${code}/estatus-proceso`,
    bitacora: (urlIdentifier = ':urlIdentifier', code = ':code') =>
      `/judicial/${urlIdentifier}/expediente/${code}/bitacora`,

    bitacoraProcesoConexo: (
      urlIdentifier = ':urlIdentifier',
      code = ':code',
      relatedProcessCode = ':relatedProcessCode'
    ) => `/judicial/${urlIdentifier}/expediente/${code}/procesos-conexos/${relatedProcessCode}/bitacora`,

    bitacoraTipo: (urlIdentifier = ':urlIdentifier') => `/judicial/${urlIdentifier}/tipo-bitacora`,
    observacionTipo: (urlIdentifier = ':urlIdentifier') => `/judicial/${urlIdentifier}/tipo-observacion`,
    observacion: (urlIdentifier = ':urlIdentifier', code = ':code') =>
      `/judicial/${urlIdentifier}/expediente/${code}/observacion`,
    bitacoraProceduralStage: (urlIdentifier = ':urlIdentifier') => `/judicial/${urlIdentifier}/etapa-procedimental`,
    bitacoraDefendantProceduralAction: (urlIdentifier = ':urlIdentifier') =>
      `/judicial/${urlIdentifier}/actuacion-procesal-demandado`,
    processReason: (urlIdentifier = ':urlIdentifier') => `/judicial/${urlIdentifier}/motivo-proceso`,
    sedes: (urlIdentifier = ':urlIdentifier') => `/judicial/${urlIdentifier}/sedes`,
    relatedProcess: (urlIdentifier = ':urlIdentifier', code = ':code') =>
      `/judicial/${urlIdentifier}/expediente/${code}/procesos-conexos`,
  },
  settings: {
    scheduldedNotifications: (urlIdentifier = `:urlIdentifier`) =>
      `/configuracion/${urlIdentifier}/notificationes-programadas`,
    compareExcel: (urlIdentifier = `:urlIdentifier`) => `/configuracion/${urlIdentifier}/comparar-excels`,
  },
}
