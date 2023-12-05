import { ColumProps } from '@/ui/Table/Table'

export const contactsColumns: ColumProps[] = [
  {
    id: 'contacts.datatable.header.id',
    title: 'ID',
    width: '5%',
    justifyContent: 'center',
  },
  {
    id: 'contacts.datatable.header.name',
    title: 'NAME',
    width: '40%',
    justifyContent: 'left',
  },
  {
    id: 'contacts.datatable.header.phone',
    title: 'TELÉFONO',
    width: '20%',
    justifyContent: 'center',
  },
  {
    id: 'contacts.datatable.header.email',
    title: 'CORREO',
    width: '20%',
    justifyContent: 'center',
  },
  {
    id: 'contacts.datatable.header.date',
    title: 'FECHA DE CREACIÓN',
    width: '10%',
    justifyContent: 'center',
  },
  {
    id: 'contacts.datatable.header.actions',
    title: 'ACCIONES',
    width: '15%',
    justifyContent: 'center',
  },
]
