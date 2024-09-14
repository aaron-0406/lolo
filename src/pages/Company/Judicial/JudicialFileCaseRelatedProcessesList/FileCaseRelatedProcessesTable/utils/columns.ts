import { ColumProps } from '@/ui/Table/Table'

export const judicialCaseFileColumns: ColumProps[] = [
  {
    id: 'casesFiles.datatable.header.numberCaseFile',
    title: 'Nº EXPEDIENTE',
    width: '10%',
    justifyContent: 'center',
  },
  {
    id: 'casesFiles.datatable.header.client',
    title: 'CLIENTE',
    width: '10%',
    justifyContent: 'left',
  },
  {
    id: 'casesFiles.datatable.header.court',
    title: 'JUZGADO',
    width: '10%',
    justifyContent: 'left',
    isThereFilter: true,
  },
  {
    id: 'casesFiles.datatable.header.subject',
    title: 'MATERIA',
    width: '10%',
    justifyContent: 'left',
    isThereFilter: true,
  },
  {
    id: 'casesFiles.datatable.header.user',
    title: 'ABOGADO',
    width: '10%',
    justifyContent: 'left',
    isThereFilter: true,
  },
  {
    id: 'casesFiles.datatable.header.responsible',
    title: 'RESPONSABLE',
    width: '10%',
    justifyContent: 'left',
    isThereFilter: true,
  },
  {
    id: 'casesFiles.datatable.header.judicialVenue',
    title: 'CIUDAD',
    width: '10%',
    justifyContent: 'left',
  },
  {
    id: 'casesFiles.datatable.header.proceduralWay',
    title: 'VIA PROCEDIMENTAL',
    width: '10%',
    justifyContent: 'left',
    isThereFilter: true,
  },
  {
    id: 'casesFiles.datatable.header.actions',
    title: 'ACCIONES',
    width: '10%',
    justifyContent: 'center',
  },
]
