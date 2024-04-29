import { ColumProps } from '@/ui/Table/Table'

export const binTypeBinnaclesColumns: ColumProps[] = [
  {
    id: 'bin-type-binnacle.datatable.header.id',
    title: 'ID',
    width: '10%',
    justifyContent: 'center',
  },
  {
    id: 'bin-type-binnacle.datatable.header.typeBinnacle',
    title: 'TIPO DE BITACORA',
    width: '40%',
    justifyContent: 'left',
  },
  {
    id: 'bin-type-binnacle.datatable.header.createdAt',
    title: 'Fecha de registro',
    width: '20%',
    justifyContent: 'center',
  },
  {
    id: 'bin-type-binnacle.datatable.header.actions',
    title: 'Acciones',
    width: '30%',
    justifyContent: 'center',
  },
]
