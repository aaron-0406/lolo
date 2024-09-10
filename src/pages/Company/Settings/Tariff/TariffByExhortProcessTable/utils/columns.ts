import { ColumProps } from "@/ui/Table/Table";

export const judicialBinnacleByExhortProcessColumns: ColumProps[] = [
  {
    id: 'byExhortProcess.datatable.header.select',
    title: '',
    width: '1%',
    justifyContent: 'left',
  },
  {
    id:'byExhortProcess.datatable.header.id',
    title:'CÓDIGO',
    width:'5%',
    justifyContent:'left',
  },
  {
    id:'byExhortProcess.datatable.header.description',
    title:'POR TRAMITE DE EXHORTO',
    width:'10%',
    justifyContent:'left',
    tooltipMessage: 'Seleccionar todos los procesos por tramite de exhorto',
  }, 
  {
    id:'byExhortProcess.datatable.header.cost',
    title:'COSTO',
    width:'20%',
    justifyContent:'center',
  },
  {
    id:'byExhortProcess.datatable.header.actions',
    title:'ACCIONES',
    width:'20%',
    justifyContent:'center',
  }
]