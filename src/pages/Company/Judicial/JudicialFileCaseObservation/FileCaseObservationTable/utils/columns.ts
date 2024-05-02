import { ColumProps } from '@/ui/Table/Table'

export const judicialObservationColumns: ColumProps[] = [
  {
    id: 'judicial.observation.datatable.header.id',
    title: '#',
    width: '5%',
    justifyContent: 'center',
  },
  {
    id: 'judicial.observation.datatable.header.date',
    title: 'FECHA DE OBSERVACION',
    width: '20%',
    justifyContent: 'left',
  },
  {
    id: 'judicial.observation.datatable.header.typeobservation',
    title: 'TIPO OBSERVACIÓN',
    width: '30%',
    justifyContent: 'center',
  },
  {
    id: 'judicial.observation.datatable.header.comentario',
    title: 'COMENTARIO',
    width: '30%',
    justifyContent: 'center',
  },
  {
    id: 'judicial.observation.datatable.header.attachment',
    title: 'DOCUMENTO(S) ADJUNTO(S)',
    width: '20%',
    justifyContent: 'center',
  },
  {
    id: 'judicial.observation.datatable.header.actions',
    title: 'ACCIONES',
    width: '20%',
    justifyContent: 'center',
  },
]
