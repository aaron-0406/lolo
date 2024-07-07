import { ColumProps } from '@/ui/Table/Table'

export const departmentColumns: ColumProps[] = [
  {
    id: 'department.datatable.header.id', 
    title: 'ID',
    width: '5%',
    justifyContent: 'center',
  },
  {
    id: 'department.datatable.header.name',
    title: 'NOMBRE',
    width: '20%',
    justifyContent: 'center',
  },
  {
    id: 'department.datatable.header.code',
    title: 'CÓDIGO',
    width: '20%',
    justifyContent: 'center',
  },
]