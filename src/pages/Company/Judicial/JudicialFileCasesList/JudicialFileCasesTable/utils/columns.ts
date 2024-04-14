import { ColumProps } from '@/ui/Table/Table'

export const judicialCaseFileColumns: ColumProps[] = [
  {
    id: 'casesFiles.datatable.header.code',
    title: 'Nº DE JUICIO',
    width: '10%',
    justifyContent: 'center',
  },
  {
    id: 'casesFiles.datatable.header.numberCaseFile',
    title: 'Nº EXPEDIENTE',
    width: '10%',
    justifyContent: 'center',
  },
  {
    id: 'casesFiles.datatable.header.court',
    title: 'JUZGADO',
    width: '10%',
    justifyContent: 'center',
    isThereFilter: true,
  },
  {
    id: 'casesFiles.datatable.header.subject',
    title: 'MATERIA',
    width: '10%',
    justifyContent: 'center',
    isThereFilter: true,
  },
  {
    id: 'casesFiles.datatable.header.judicialVenue',
    title: 'SEDE JUDICIAL',
    width: '10%',
    justifyContent: 'center',
  },
  {
    id: 'casesFiles.datatable.header.proceduralWay',
    title: 'VIA PROCEDIMENTAL',
    width: '10%',
    justifyContent: 'center',
    isThereFilter: true,
  },
  {
    id: 'casesFiles.datatable.header.actions',
    title: 'ACCIONES',
    width: '10%',
    justifyContent: 'center',
  },
]
