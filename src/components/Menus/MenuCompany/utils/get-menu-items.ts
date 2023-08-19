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
      path: paths.cobranza.perfil(urlIdentifier),
      admin: false,
    },
    {
      id: 2,
      title: 'CLIENTES',
      remixClass: 'ri-group-fill',
      path: paths.cobranza.clientes(urlIdentifier),
      admin: false,
    },
    {
      id: 3,
      title: 'COBRANZA',
      remixClass: 'ri-folder-info-fill',
      path: paths.cobranza.cobranza(urlIdentifier),
      admin: false,
    },
    {
      id: 4,
      title: 'METAS',
      remixClass: 'ri-bar-chart-fill',
      path: paths.cobranza.metas(urlIdentifier),
      admin: false,
    },
    {
      id: 6,
      title: 'DOCUMENTOS',
      remixClass: 'ri-file-text-line',
      path: paths.cobranza.document(urlIdentifier),
      admin: false,
    },
  ]
}
