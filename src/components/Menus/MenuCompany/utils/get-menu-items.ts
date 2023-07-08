import paths from '../../../../shared/routes/paths'

export const getMenuItems = (urlIdentifier: string) => {
  return [
    {
      id: 5,
      title: 'DASHBOARD',
      remixClass: 'ri-dashboard-line',
      path: paths.companyDashboard.dashboard(urlIdentifier),
      admin: true,
    },
    {
      id: 1,
      title: 'PERFIL',
      remixClass: 'ri-user-6-fill',
      path: paths.company.perfil(urlIdentifier),
      admin: false,
    },
    {
      id: 2,
      title: 'CLIENTES',
      remixClass: 'ri-group-fill',
      path: paths.company.clientes(urlIdentifier),
      admin: false,
    },
    {
      id: 3,
      title: 'COBRANZA',
      remixClass: 'ri-pie-chart-2-fill',
      path: paths.company.cobranza(urlIdentifier),
      admin: false,
    },
    {
      id: 4,
      title: 'METAS',
      remixClass: 'ri-pie-chart-2-fill',
      path: paths.company.metas(urlIdentifier),
      admin: false,
    },
    {
      id: 5,
      title: 'DOCUMENTOS',
      remixClass: 'ri-file-text-line',
      path: paths.company.document(urlIdentifier),
      admin: false,
    },
  ]
}
