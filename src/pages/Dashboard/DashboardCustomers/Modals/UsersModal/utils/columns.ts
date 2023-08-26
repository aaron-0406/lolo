import { ColumProps } from '@/ui/Table/Table'

export const usersColumns: ColumProps[] = [
  {
    id: 'users.datatable.name',
    title: 'NOMBRE',
    width: '20%',
    justifyContent: 'center',
  },
  {
    id: 'users.datatable.lastname',
    title: 'APELLIDOS',
    width: '40%',
  },
  {
    id: 'users.datatable.phone',
    title: 'TELEFONO',
    width: '20%',
    justifyContent: 'space-between',
  },
  {
    id: 'users.datatable.dni',
    title: 'DNI',
    width: '10%',
    justifyContent: 'space-between',
  },
  {
    id: 'users.datatable.email',
    title: 'CORREO',
    width: '20%',
  },
  {
    id: 'users.datatable.privilege',
    title: 'PRIVILEGIO',
    width: '20%',
    justifyContent: 'center',
  },
  {
    id: 'users.datatable.state',
    title: 'ESTADO',
    width: '20%',
    justifyContent: 'center',
  },
  {
    id: 'users.datatable.date',
    title: 'FECHA DE REGISTRO',
    width: '20%',
    justifyContent: 'center',
  },
]
