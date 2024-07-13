import { ColumProps } from '@/ui/Table/Table'

export const userLogsColumns: ColumProps[] = [
  {
    id: 'user.logs.datatable.header.id',
    title: 'ID',
    width: '10%',
    justifyContent: 'center',
  },
  {
    id: 'user.logs.datatable.header.action',
    title: 'ACCIÓN',
    width: '30%',
    justifyContent: 'center',
    isThereFilter: true,  
  },
  {
    id: 'user.logs.datatable.header.user',
    title: 'USUARIO',
    width: '30%',
    justifyContent: 'center',
    isThereFilter: true,
  },
  {
    id: 'user.logs.datatable.header.sumary',
    title: 'RESUMEN',
    width: '30%',
    justifyContent: 'center',
  },
  {
    id: 'user.logs.datatable.header.date',
    title: 'FECHA',
    width: '20%',
    justifyContent: 'center',
  },
  {
    id: 'user.logs.datatable.header.hour',
    title: 'HORA',
    width: '20%',
    justifyContent: 'center',
  },
  {
    id: 'user.logs.datatable.header.ip',
    title: 'IP',
    width: '30%',
    justifyContent: 'center',
  },
]
