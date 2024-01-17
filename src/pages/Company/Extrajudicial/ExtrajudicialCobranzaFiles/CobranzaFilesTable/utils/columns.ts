import { ColumProps } from '@/ui/Table/Table'

export const filesColumns: ColumProps[] = [
  {
    id: 'files.datatable.header.id',
    title: 'ID',
    width: '5%',
    justifyContent: 'center',
  },
  {
    id: 'files.datatable.header.type',
    title: 'TIPO',
    width: '5%',
    justifyContent: 'center',
  },
  {
    id: 'files.datatable.header.name',
    title: 'NAME',
    width: '40%',
    justifyContent: 'left',
  },
  {
    id: 'files.datatable.header.date',
    title: 'FECHA DE CREACIÓN',
    width: '10%',
    justifyContent: 'center',
  },
  {
    id: 'files.datatable.header.actions',
    title: 'ACCIONES',
    width: '15%',
    justifyContent: 'center',
  },
]
