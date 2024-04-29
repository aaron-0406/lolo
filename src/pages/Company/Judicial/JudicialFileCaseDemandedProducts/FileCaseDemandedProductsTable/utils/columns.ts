import { ColumProps } from '@/ui/Table/Table'

export const demandedProductsColumns: ColumProps[] = [
  {
    id: 'demanded.products.datatable.header.id',
    title: 'ID',
    width: '5%',
    justifyContent: 'center',
  },
  {
    id: 'demanded.products.datatable.header.code',
    title: 'CÓDIGO',
    width: '20%',
    justifyContent: 'left',
  },
  {
    id: 'demanded.products.datatable.header.name',
    title: 'NOMBRE',
    width: '30%',
    justifyContent: 'center',
  },
  {
    id: 'demanded.products.datatable.header.stateNegotiation',
    title: 'ESTADO NEGOCIACIÓN',
    width: '30%',
    justifyContent: 'center',
  },
  {
    id: 'demanded.products.datatable.header.state',
    title: 'ESTADO',
    width: '20%',
    justifyContent: 'center',
  },
  {
    id: 'demanded.products.datatable.header.actions',
    title: 'ACCIONES',
    width: '15%',
    justifyContent: 'center',
  },
]
