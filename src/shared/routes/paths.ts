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
    dash: (urlIdentifier = ":urlIdentifier") => `/${urlIdentifier}/dash`,
    perfil: (urlIdentifier = ":urlIdentifier") => `/${urlIdentifier}/perfil`,
    clientes: (urlIdentifier = ":urlIdentifier") =>
      `/${urlIdentifier}/clientes`,
    cobranza: (urlIdentifier = ":urlIdentifier") =>
      `/${urlIdentifier}/cobranza`,
  },
};
