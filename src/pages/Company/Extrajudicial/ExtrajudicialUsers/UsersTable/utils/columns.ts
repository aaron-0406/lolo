import { ColumProps } from '@/ui/Table/Table'

export const usersColumns: ColumProps[] = [
  {
    id: 'users.datatable.header.id',
    title: 'N°',
    width: '10%',
    justifyContent: 'center',
  },
  {
    id: 'users.datatable.header.name',
    title: 'NOMBRE',
    width: '20%',
    justifyContent: 'center',
  },
  {
    id: 'users.datatable.header.lastname',
    title: 'Apellidos',
    width: '20%',
  },
  {
    id: 'users.datatable.header.cellphone',
    title: 'TELEFONO',
    width: '20%',
  },
  {
    id: 'users.datatable.header.dni',
    title: 'DNI',
    width: '15%',
  },
  {
    id: 'users.datatable.header.email',
    title: 'CORREO',
    width: '30%',
  },
  {
    id: 'users.datatable.header.priviligue',
    title: 'PRIVILEGIO',
    width: '10%',
    justifyContent: 'center',
  },
  {
    id: 'users.datatable.header.state',
    title: 'ESTADO',
    width: '10%',
    justifyContent: 'center',
  },
  {
    id: 'users.datatable.header.date',
    title: 'FECHA DE REGISTROS',
    width: '20%',
    justifyContent: 'space-between',
  },
  {
    id: 'users.datatable.header.actions',
    title: 'ACCIONES',
    width: '40%',
    justifyContent: 'center',
  },
]
