import { ColumProps } from "@/ui/Table/Table";

export const judicialBinnacleCustomTariffColumns: ColumProps[] = [
  {
    id: 'customTariff.datatable.header.select',
    title: '',
    width: '1%',
    justifyContent: 'left',
  },
  {
    id:'customTariff.datatable.header.id',
    title:'CÓDIGO',
    width:'5%',
    justifyContent:'left',
  },
  {
    id:'customTariff.datatable.header.description',
    title:'TARIFA PERSONALIZADA',
    width:'10%',
    justifyContent:'left',
  }, 
  {
    id:'customTariff.datatable.header.cost',
    title:'COSTO PERSONALIZADO',
    width:'20%',
    justifyContent:'center',
  },
  {
    id:'customTariff.datatable.header.cost',
    title:'COSTO ACUMULADO',
    width:'20%',
    justifyContent:'center',
  },
  {
    id:'customTariff.datatable.header.counter',
    title:'VECES SELECCIONADOS',
    width:'20%',
    justifyContent:'center',
  }
]