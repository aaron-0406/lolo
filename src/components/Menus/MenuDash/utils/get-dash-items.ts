import paths from '../../../../shared/routes/paths'

export const getDashItems = () => {
  return [
    {
      id: 5,
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
      title: 'USUARIOS',
      remixClass: 'ri-user-settings-fill',
      path: paths.dash.usuarios,
      admin: false,
    },
    {
      id: 3,
      title: 'REPORTES',
      remixClass: 'ri-file-list-fill',
      path: paths.dash.reportes,
      admin: false,
    },
    {
      id: 4,
      title: 'ACCIONES',
      remixClass: 'ri-pencil-ruler-2-fill',
      path: paths.dash.acciones,
      admin: false,
    },
    {
      id: 5,
      title: 'COBRANZA',
      remixClass: 'ri-folder-2-fill',
      path: paths.dash.cobranza,
      admin: false,
    },
  ]
}
