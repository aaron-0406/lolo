import { ColumProps } from "@/ui/Table/Table";

export const judicialBinnacleContentiousProcessColumns: ColumProps[] = [
  {
    id: 'contentiousProcess.datatable.header.select',
    title: '',
    width: '10%',
    justifyContent: 'center',
  },
  {
    id:'contentiousProcess.datatable.header.id',
    title:'CÓDIGO',
    width:'10%',
    justifyContent:'center',
  },
  {
    id:'contentiousProcess.datatable.header.name',
    title:'PROCESOS CONTECIOSOS',
    width:'20%',
    justifyContent:'center',
    tooltipMessage: 'Seleccionar todos los procesos contenciosos',
  }, 
]