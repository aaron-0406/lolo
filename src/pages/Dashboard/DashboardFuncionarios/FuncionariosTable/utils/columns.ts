import { ColumProps } from '../../../../../ui/Tables/Table/Table'

export const funcionariosColumns: ColumProps[] = [
  {
    id: 'funcionarios.datatable.header.id',
    title: 'ID',
    width: '10%',
    justifyContent: 'center',
  },
  {
    id: 'funcionarios.datatable.header.name',
    title: 'NOMBRE',
    width: '40%',
    justifyContent: 'center',
  },
  {
    id: 'funcionarios.datatable.header.date',
    title: 'FECHA DE REGISTRO',
    width: '20%',
    justifyContent: 'center',
  },
  {
    id: 'users.datatable.header.actions',
    title: 'ACCIONES',
    width: '30%',
    justifyContent: 'center',
  },
]
