import paths from '../../../../shared/routes/paths'

export const getDashItems = () => {
  return [
    {
      id: 4,
      title: 'DASHBOARD',
      remixClass: 'ri-dashboard-line',
      path: paths.dash.root,
      admin: true,
    },
    {
      id: 1,
      title: 'CLIENTES',
      remixClass: 'ri-group-fill',
      path: paths.dash.clientes,
      admin: false,
    },
    {
      id: 2,
      title: 'GESTIONES',
      remixClass: 'ri-survey-fill',
      path: paths.dash.gestiones,
      admin: false,
    },
    {
      id: 3,
      title: 'REPORTES',
      remixClass: 'ri-file-list-fill',
      path: paths.dash.reportes,
      admin: false,
    },
  ]
}
