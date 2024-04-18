import { ColumProps } from '@/ui/Table/Table'

export const ProductNameColumns: ColumProps[] = [
  {
    id: 'productname.datatable.header.id',
    title: 'ID',
    width: '20%',
    justifyContent: 'center',
  },
  {
    id: 'productname.datatable.header.name',
    title: 'NOMBRE',
    width: '20%',
    justifyContent: 'left',
  },
  {
    id: 'productname.datatable.header.date',
    title: 'FECHA DE REGISTRO',
    width: '30%',
    justifyContent: 'center',
  },
  {
    id: 'productname.datatable.header.actions',
    title: 'ACCIONES',
    width: '20%',
    justifyContent: 'center',
  },
]
