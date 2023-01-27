import paths from "../../../../shared/routes/paths";

export const getMenuItems = (urlIdentifier: string) => {
  return [
    {
      id: 1,
      title: "PERFIL",
      remixClass: "ri-user-6-fill",
      path: paths.company.perfil(urlIdentifier),
    },
    {
      id: 2,
      title: "CLIENTES",
      remixClass: "ri-group-fill",
      path: paths.company.clientes(urlIdentifier),
    },
    {
      id: 3,
      title: "COBRANZA",
      remixClass: "ri-pie-chart-2-fill",
      path: paths.company.cobranza(urlIdentifier),
    },
    {
      id: 4,
      title: "DOCUMENTOS",
      remixClass: "ri-file-text-line",
      path: paths.company.document(urlIdentifier),
    },
  ];
};
