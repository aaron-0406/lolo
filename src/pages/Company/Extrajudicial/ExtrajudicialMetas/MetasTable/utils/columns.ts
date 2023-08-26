import { ColumProps } from '@/ui/Table/Table'

export const goalsColumns: ColumProps[] = [
  {
    id: 'goals.datatable.header.id',
    title: '#',
    width: '1%',
    justifyContent: 'center',
  },
  {
    id: 'goals.datatable.header.startDate',
    title: 'INICIO',
    width: '20%',
  },
  {
    id: 'goals.datatable.header.endDate',
    title: 'FIN',
    width: '20%',
  },
  {
    id: 'goals.datatable.header.total',
    title: 'TOTAL',
    width: '20%',
    justifyContent: 'space-between',
  },
  {
    id: 'goals.datatable.header.progress',
    title: 'PROGRESO',
    width: '20%',
    justifyContent: 'center',
  },
  {
    id: 'goals.datatable.header.bottons',
    title: 'ACCIONES',
    width: '20%',
    justifyContent: 'center',
  },
]
