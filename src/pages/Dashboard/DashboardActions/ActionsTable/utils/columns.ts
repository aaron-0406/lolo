import { ColumProps } from '@/ui/Table/Table'

export const actionsColumns: ColumProps[] = [
  {
    id: 'actions.datatable.header.id',
    title: 'ID',
    width: '10%',
    justifyContent: 'center',
  },
  {
    id: 'actions.datatable.header.codeaction',
    title: 'CÓDIGO',
    width: '15%',
    justifyContent: 'center',
  },
  {
    id: 'actions.datatable.header.nameaction',
    title: 'NOMBRE',
    width: '40%',
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
    width: '20%',
    justifyContent: 'center',
  },
]
