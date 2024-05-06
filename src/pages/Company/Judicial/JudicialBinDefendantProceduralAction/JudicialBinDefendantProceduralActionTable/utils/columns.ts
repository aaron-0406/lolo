import { ColumProps } from '@/ui/Table/Table'

export const binDefendantProceduralActionsColumns: ColumProps[] = [
  {
    id: 'bin-defendant-procedural-action.datatable.header.id',
    title: 'ID',
    width: '10%',
    justifyContent: 'center',
  },
  {
    id: 'bin-defendant-procedural-action.datatable.header.defendantProceduralAction',
    title: 'ACTUACION PROCESAL DEMANDADO',
    width: '40%',
    justifyContent: 'left',
  },
  {
    id: 'bin-defendant-procedural-action.datatable.header.createdAt',
    title: 'Fecha de registro',
    width: '20%',
    justifyContent: 'center',
  },
  {
    id: 'bin-defendant-procedural-action.datatable.header.actions',
    title: 'Acciones',
    width: '30%',
    justifyContent: 'center',
  },
]
