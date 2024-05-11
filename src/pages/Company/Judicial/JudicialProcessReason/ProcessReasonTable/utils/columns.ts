import { ColumProps } from '@/ui/Table/Table'

export const judicialProcessColumns: ColumProps[] = [
  {
    id: 'process.reason.datatable.header.id',
    title: 'ID',
    width: '10%',
    justifyContent: 'center',
  },
  {
    id: 'process.reason.datatable.header.name',
    title: 'MOTIVO',
    width: '40%',
    justifyContent: 'left',
  },
  {
    id: 'process.reason.datatable.header.actions',
    title: 'ACCIONES',
    width: '30%',
    justifyContent: 'center',
  },
]
