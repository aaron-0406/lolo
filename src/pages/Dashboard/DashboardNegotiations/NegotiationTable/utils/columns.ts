import { ColumProps } from '../../../../../ui/Table/Table'

export const negotiationColumns: ColumProps[] = [
  {
    id: 'negotiation.datatable.header.id',
    title: 'ID',
    width: '10%',
    justifyContent: 'center',
  },
  {
    id: 'negotiation.datatable.header.name',
    title: 'NOMBRE',
    width: '40%',
    justifyContent: 'left',
  },
  {
    id: 'negotiation.datatable.header.createdAt',
    title: 'Fecha de registro',
    width: '20%',
    justifyContent: 'center',
  },
  {
    id: 'negotiation.datatable.header.actions',
    title: 'Acciones',
    width: '30%',
    justifyContent: 'center',
  },
]
