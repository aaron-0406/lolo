import { ColumProps } from '@/ui/Table/Table'

export const ipAddressBankColumns: ColumProps[] = [
  {
    id: 'ipaddress.datatable.header.id',
    title: 'N°',
    width: '10%',
    justifyContent: 'center',
  },
  {
    id: 'ipaddress.datatable.header.ip-name',
    title: 'NOMBRE IP',
    width: '20%',
    justifyContent: 'center',
  },
  {
    id: 'ipaddress.datatable.header.ip',
    title: 'IP',
    width: '15%',
    justifyContent: 'center',
  },
  {
    id: 'ipaddress.datatable.header.state',
    title: 'ESTADO',
    width: '15%',
    justifyContent: 'center',
  },
  {
    id: 'ipaddress.datatable.header.date',
    title: 'FECHA DE CREACIÓN',
    width: '20%',
    justifyContent: 'center',
  },
  {
    id: 'ipaddress.datatable.header.actions',
    title: 'ACCIONES',
    width: '20%',
    justifyContent: 'center',
  },
]
