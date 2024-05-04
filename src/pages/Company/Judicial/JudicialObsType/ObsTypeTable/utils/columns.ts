import { ColumProps } from '@/ui/Table/Table'

export const ObsTypeColumns: ColumProps[] = [
  {
    id: 'obstype.datatable.header.id',
    title: 'ID',
    width: '20%',
    justifyContent: 'center',
  },
  {
    id: 'obstype.datatable.header.contactType',
    title: 'NOMBRE',
    width: '20%',
    justifyContent: 'left',
  },
  {
    id: 'obstype.datatable.header.date',
    title: 'FECHA DE REGISTRO',
    width: '30%',
    justifyContent: 'center',
  },
  {
    id: 'obstype.datatable.header.actions',
    title: 'ACCIONES',
    width: '20%',
    justifyContent: 'center',
  },
]
