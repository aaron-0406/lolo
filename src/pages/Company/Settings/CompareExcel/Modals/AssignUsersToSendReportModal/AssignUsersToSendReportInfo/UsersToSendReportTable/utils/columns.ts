import { ColumProps } from '../../../../../../../../../ui/Table/Table';

export const usersColumns: ColumProps[] = [
  {
    id: 'users.datatable.header.id',
    title: '',
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
    justifyContent: 'center',
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
]
