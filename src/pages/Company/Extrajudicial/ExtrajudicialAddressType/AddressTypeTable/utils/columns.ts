import { ColumProps } from '@/ui/Table/Table'

export const AddressTypeColumns: ColumProps[] = [
  {
    id: 'addresstype.datatable.header.id',
    title: 'ID',
    width: '20%',
    justifyContent: 'center',
  },
  {
    id: 'addresstype.datatable.header.type',
    title: 'NOMBRE',
    width: '20%',
    justifyContent: 'left',
  },
  {
    id: 'addresstype.datatable.header.date',
    title: 'FECHA DE REGISTRO',
    width: '30%',
    justifyContent: 'center',
  },
  {
    id: 'addresstype.datatable.header.actions',
    title: 'ACCIONES',
    width: '20%',
    justifyContent: 'center',
  },
]
