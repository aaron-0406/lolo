import { ColumProps } from '@/ui/Table/Table'

export const courtColumns: ColumProps[] = [
  {
    id: 'court.datatable.header.id',
    title: 'ID',
    width: '10%',
    justifyContent: 'center',
  },
  {
    id: 'court.datatable.header.name',
    title: 'NOMBRE',
    width: '40%',
    justifyContent: 'left',
  },
  {
    id: 'court.datatable.header.city',
    title: 'JURISDICCIÓN',
    width: '40%',
    justifyContent: 'left',
  },
  {
    id: 'court.datatable.header.actions',
    title: 'ACCIONES',
    width: '30%',
    justifyContent: 'center',
  },
]
