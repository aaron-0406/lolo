import { ColumProps } from '@/ui/Table/Table'

export const customersColumns: ColumProps[] = [
  {
    id: 'customers.datatable.header.code',
    title: 'CÓDIGO',
    width: '10%',
    justifyContent: 'center',
  },
  {
    id: 'customers.datatable.header.name',
    title: 'CLIENTE',
    width: '50%',
  },
  {
    id: 'customers.datatable.header.negotiation',
    title: 'NEGOCIACIÓN',
    width: '30%',
    justifyContent: 'space-between',
    isThereFilter: true,
  },
  {
    id: 'customers.datatable.header.funcionario',
    title: 'FUNCIONARIO',
    width: '30%',
    justifyContent: 'space-between',
    isThereFilter: true,
  },
  {
    id: 'customers.datatable.header.user',
    title: 'GESTOR',
    width: '30%',
    justifyContent: 'space-between',
    isThereFilter: true,
  },
  {
    id: 'customers.datatable.header.city',
    title: 'CIUDAD',
    width: '30%',
    justifyContent: 'space-between',
    isThereFilter: true,
  },
  {
    id: 'customers.datatable.header.date',
    title: 'FECHA DE REGISTRO',
    width: '10%',
    justifyContent: 'center',
  },
]
