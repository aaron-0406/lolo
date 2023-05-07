import { ColumProps } from '../../../../../ui/Tables/Table/Table'

export const customersColumns: ColumProps[] = [
  {
    id: 'customers.datatable.header.code',
    title: 'Código',
    width: '10%',
    textAlign: 'center',
  },
  {
    id: 'customers.datatable.header.name',
    title: 'Cliente',
    width: '50%',
  },
  {
    id: 'customers.datatable.header.negotiation',
    title: 'Negociación',
    width: '30%',
  },
  {
    id: 'customers.datatable.header.date',
    title: 'Date',
    width: '10%',
  },
]
