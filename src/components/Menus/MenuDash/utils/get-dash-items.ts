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
      title: 'USUARIOS',
      remixClass: 'ri-user-settings-fill',
      path: paths.dash.usuarios,
      admin: false,
    },
    {
      id: 3,
      title: 'COBRANZA',
      remixClass: 'ri-folder-2-fill',
      path: paths.dash.cobranza,
      admin: false,
    },
  ]
}
