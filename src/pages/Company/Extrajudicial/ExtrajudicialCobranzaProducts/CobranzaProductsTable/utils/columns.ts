import { ColumProps } from '@/ui/Table/Table'

export const productsColumns: ColumProps[] = [
  {
    id: 'products.datatable.header.id',
    title: 'ID',
    width: '5%',
    justifyContent: 'center',
  },
  {
    id: 'products.datatable.header.code',
    title: 'CÓDIGO',
    width: '20%',
    justifyContent: 'left',
  },
  {
    id: 'products.datatable.header.name',
    title: 'NOMBRE',
    width: '40%',
    justifyContent: 'center',
  },
  {
    id: 'products.datatable.header.state',
    title: 'STATE',
    width: '20%',
    justifyContent: 'center',
  },
  {
    id: 'contacts.datatable.header.actions',
    title: 'ACCIONES',
    width: '15%',
    justifyContent: 'center',
  },
]
