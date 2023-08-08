import { ColumProps } from '../../../../../ui/Tables/Table/Table'

export const actionsColumns: ColumProps[] = [
  {
    id: 'actions.datatable.header.id',
    title: 'ID',
    width: '20%',
    justifyContent: 'center',
  },
  {
    id: 'actions.datatable.header.codeaction',
    title: 'CÓDIGO',
    width: '15%',
  },
  {
    id: 'actions.datatable.header.nameaction',
    title: 'NOMBRE',
    width: '30%',
    justifyContent: 'space-between',
  },
  {
    id: 'actions.datatable.header.codesubtypemanagement',
    title: 'CÓDIGO DE SUBTIPO',
    width: '10%',
    justifyContent: 'center',
  },
  {
    id: 'actions.datatable.header.actions',
    title: 'ACCIONES',
    width: '30%',
    justifyContent: 'center',
  },
]