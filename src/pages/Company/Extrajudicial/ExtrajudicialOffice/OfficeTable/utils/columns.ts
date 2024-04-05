import { ColumProps } from '@/ui/Table/Table'

export const officeColumns: ColumProps[] = [
  {
    id: 'office.datatable.header.id',
    title: 'N°',
    width: '10%',
    justifyContent: 'center',
  },
  {
    id: 'office.datatable.header.name',
    title: 'NOMBRE OFICINA',
    width: '20%',
    justifyContent: 'center',
  },
  {
    id: 'office.datatable.header.address',
    title: 'DIRECCIÓN',
    width: '20%',
    justifyContent: 'center',
  },
  {
    id: 'office.datatable.header.city',
    title: 'CIUDAD',
    width: '20%',
    justifyContent: 'center',
  },
  {
    id: 'office.datatable.header.state',
    title: 'ESTADO',
    width: '15%',
    justifyContent: 'center',
  },
  {
    id: 'office.datatable.header.date',
    title: 'FECHA DE CREACIÓN',
    width: '20%',
    justifyContent: 'center',
  },
  {
    id: 'office.datatable.header.actions',
    title: 'ACCIONES',
    width: '20%',
    justifyContent: 'center',
  },
]
