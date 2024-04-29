import { ColumProps } from '@/ui/Table/Table'

export const formDemandedProductsColumns: ColumProps[] = [
  {
    id: 'form.demanded.products.datatable.header.id',
    title: '#',
    width: '5%',
    justifyContent: 'center',
  },
  {
    id: 'form.demanded.products.datatable.header.code',
    title: 'CÓDIGO',
    width: '20%',
    justifyContent: 'left',
  },
  {
    id: 'form.demanded.products.datatable.header.name',
    title: 'NOMBRE',
    width: '30%',
    justifyContent: 'center',
  },
  {
    id: 'form.demanded.products.datatable.header.stateNegotiation',
    title: 'ESTADO NEGOCIACIÓN',
    width: '30%',
    justifyContent: 'center',
  },
  {
    id: 'form.demanded.products.datatable.header.state',
    title: 'ESTADO',
    width: '20%',
    justifyContent: 'center',
  },
]
