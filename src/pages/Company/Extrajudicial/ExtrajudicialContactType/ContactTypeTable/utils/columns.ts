import { ColumProps } from '@/ui/Table/Table'

export const ContactTypeColumns: ColumProps[] = [
  {
    id: 'contacttype.datatable.header.id',
    title: 'ID',
    width: '20%',
    justifyContent: 'center',
  },
  {
    id: 'contacttype.datatable.header.contactType',
    title: 'NOMBRE',
    width: '20%',
    justifyContent: 'left',
  },
  {
    id: 'contacttype.datatable.header.date',
    title: 'FECHA DE REGISTRO',
    width: '30%',
    justifyContent: 'center',
  },
  {
    id: 'contacttype.datatable.header.actions',
    title: 'ACCIONES',
    width: '20%',
    justifyContent: 'center',
  },
]
