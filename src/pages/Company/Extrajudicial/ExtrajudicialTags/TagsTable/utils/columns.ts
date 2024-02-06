import { ColumProps } from '@/ui/Table/Table'

export const tagsColumns: ColumProps[] = [
  {
    id: 'tags.datatable.header.id',
    title: 'ID',
    width: '5%',
    justifyContent: 'center',
  },
  {
    id: 'tags.datatable.header.name',
    title: 'NOMBRE',
    width: '40%',
    justifyContent: 'left',
  },
  {
    id: 'tags.datatable.header.color',
    title: 'COLOR',
    width: '20%',
    justifyContent: 'center',
  },
  {
    id: 'tags.datatable.header.group',
    title: 'GRUPO',
    width: '20%',
    justifyContent: 'center',
  },
  {
    id: 'tags.datatable.header.action',
    title: 'ACTION',
    width: '10%',
    justifyContent: 'center',
  },
  {
    id: 'tags.datatable.header.date',
    title: 'FECHA DE CREACIÓN',
    width: '10%',
    justifyContent: 'center',
  },
  {
    id: 'tags.datatable.header.actions',
    title: 'ACCIONES',
    width: '15%',
    justifyContent: 'center',
  },
]
