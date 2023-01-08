// eslint-disable-next-line import/no-anonymous-default-export
export default {
  root: "/",
  error: "/error",
  general: {
    validate: "/validate-token",
    notFound: "/not-found",
  },
  dash: {
    root: "/dash",
    login: "/dash/login",
  },
  company: {
    root: (urlIdentifier = ":urlIdentifier") => `/${urlIdentifier}`,
    login: (urlIdentifier = ":urlIdentifier") => `/${urlIdentifier}/login`,
    perfil: (urlIdentifier = ":urlIdentifier") => `/${urlIdentifier}/perfil`,
    clientes: (urlIdentifier = ":urlIdentifier") =>
      `/${urlIdentifier}/clientes`,
    cobranza: (urlIdentifier = ":urlIdentifier") =>
      `/${urlIdentifier}/cobranza`,
    cobranzaCode: (urlIdentifier = ":urlIdentifier", code = ":code") =>
      `/${urlIdentifier}/cobranza/${code}`,
  },
};
