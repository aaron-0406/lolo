import { ColumProps } from '@/ui/Table/Table'

export const addressesColumns: ColumProps[] = [
  {
    id: 'addresses.datatable.header.id',
    title: 'ID',
    width: '5%',
    justifyContent: 'center',
  },
  {
    id: 'addresses.datatable.header.type',
    title: 'TIPO',
    width: '10%',
    justifyContent: 'center',
  },
  {
    id: 'addresses.datatable.header.direction',
    title: 'NOMBRE',
    width: '60%',
    justifyContent: 'left',
  },
  {
    id: 'addresses.datatable.header.createdat',
    title: 'FECHA DE CREACIÓN',
    width: '20%',
    justifyContent: 'center',
  },
]
