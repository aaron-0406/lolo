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
      id: 4,
      title: 'ACCIONES',
      remixClass: 'ri-pencil-ruler-2-fill',
      path: paths.dash.acciones,
      admin: false,
    },
    {
      id: 5,
      title: 'NEGOCIACIONES',
      remixClass: 'ri-folder-2-fill',
      path: paths.dash.negociaciones,
      admin: false,
    },
    {
      id: 6,
      title: 'FUNCIONARIOS',
      remixClass: 'ri-briefcase-fill',
      path: paths.dash.funcionarios,
      admin: false,
    },
    {
      id: 6,
      title: 'PERMISOS',
      remixClass: 'ri-key-2-line',
      path: paths.dash.permisos,
      admin: false,
    },
  ]
}
