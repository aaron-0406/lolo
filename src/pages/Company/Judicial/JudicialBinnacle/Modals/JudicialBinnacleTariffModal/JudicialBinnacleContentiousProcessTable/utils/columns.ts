import { ColumProps } from "@/ui/Table/Table";

export const judicialBinnacleContentiousProcessColumns: ColumProps[] = [
  {
    id: 'casesFiles.datatable.header.select',
    title: 'checkbox',
    width: '10%',
    justifyContent: 'center',
  },
  {
    id:'binnacle.datatable.header.id',
    title:'CÓDIGO',
    width:'10%',
    justifyContent:'center',
  },
  {
    id:'binnacle.datatable.header.name',
    title:'PROCESOS CONTECIOSOS',
    width:'20%',
    justifyContent:'center',
    tooltipMessage: 'Seleccionar todos los procesos contenciosos',
  }, 
]