import { ColumProps } from '@/ui/Table/Table'

export const ipAddressBankColumns: ColumProps[] = [
  {
    id: 'users.datatable.header.id',
    title: 'N°',
    width: '10%',
    justifyContent: 'center',
  },
  {
    id: 'users.datatable.header.ip-name',
    title: 'NOMBRE IP',
    width: '20%',
    justifyContent: 'center',
  },
  {
    id: 'users.datatable.header.ip',
    title: 'IP',
    width: '20%',
  },
  {
    id: 'users.datatable.header.state',
    title: 'ESTADO',
    width: '20%',
  },
  {
    id: 'users.datatable.header.date',
    title: 'FECHA DE CREACIÓN',
    width: '20%',
    justifyContent: 'space-between',
  },
]
