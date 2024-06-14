import { ColumProps } from '@/ui/Table/Table'

export const judicialBinnacleColumns: ColumProps[] = [
  {
    id: 'binnacle.datatable.header.id',
    title: 'ID',
    width: '5%',
    justifyContent: 'center',
  },
  {
    id: 'binnacle.datatable.header.bin-type-binnacle-type',
    title: 'TIPO',
    width: '10%',
    justifyContent: 'left',
  },
  {
    id: 'binnacle.datatable.header.bin-defendant-procedural-action-type',
    title: 'ÚLTIMO ACTUADO',
    width: '30%',
    justifyContent: 'left',
  },
  {
    id: 'binnacle.datatable.header.bin-procedural-stage',
    title: 'ETAPA PROCEDIMENTAL',
    width: '20%',
    justifyContent: 'center',
  },
  {
    id: 'binnacle.datatable.header.date',
    title: 'FECHA',
    width: '20%',
    justifyContent: 'center',
    isSortable: true,
  },
  {
    id: 'binnacle.datatable.header.actions',
    title: 'ACCIONES',
    width: '20%',
    justifyContent: 'center',
  },
]
