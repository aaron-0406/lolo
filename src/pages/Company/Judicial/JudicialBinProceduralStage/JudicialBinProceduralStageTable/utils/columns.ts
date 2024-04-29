import { ColumProps } from '@/ui/Table/Table'

export const binProceduralStagesColumns: ColumProps[] = [
  {
    id: 'bin-procedural-stage.datatable.header.id',
    title: 'ID',
    width: '10%',
    justifyContent: 'center',
  },
  {
    id: 'bin-procedural-stage.datatable.header.proceduralStage',
    title: 'ETAPA PROCEDIMENTAL',
    width: '40%',
    justifyContent: 'left',
  },
  {
    id: 'bin-procedural-stage.datatable.header.createdAt',
    title: 'Fecha de registro',
    width: '20%',
    justifyContent: 'center',
  },
  {
    id: 'bin-procedural-stage.datatable.header.actions',
    title: 'Acciones',
    width: '30%',
    justifyContent: 'center',
  },
]
