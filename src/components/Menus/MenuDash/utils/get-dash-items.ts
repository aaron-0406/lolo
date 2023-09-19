import paths from '../../../../shared/routes/paths'

export const getDashItems = () => {
  return [
    {
      id: 10,
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
      id: 7,
      title: 'PERMISOS',
      remixClass: 'ri-key-2-line',
      path: paths.dash.permisos,
      admin: false,
    },
    {
      id: 8,
      title: 'ROLES',
      remixClass: 'ri-shield-user-line',
      path: paths.dash.roles,
      admin: false,
    },
  ]
}
