import { ColumProps } from '@/ui/Table/Table'

export const demandedProductsColumns: ColumProps[] = [
  {
    id: 'scheduled.notifications.datatable.header.id', 
    title: 'ID',
    width: '5%',
    justifyContent: 'center',
  },
  {
    id: 'scheduled.notifications.datatable.header.nameNotification',
    title: 'NOMBRE',
    width: '20%',
    justifyContent: 'center',
  },
  {
    id: 'scheduled.notifications.datatable.header.frequencyToNotify',
    title: 'FRECUENCIA',
    width: '30%',
    justifyContent: 'center',
  },
  {
    id: 'scheduled.notifications.datatable.header.hourTimeToNotify',
    title: 'HORA DE NOTIFICACIÓN',
    width: '30%',
    justifyContent: 'center',
  },
  {
    id: 'scheduled.notifications.datatable.header.logicKey',
    title: 'LLAVE LOGICA',
    width: '30%',
    justifyContent: 'center',
  },
  {
    id: 'scheduled.notifications.datatable.header.state',
    title: 'ESTADO',
    width: '20%',
    justifyContent: 'center',
  },
  {
    id: 'scheduled.notifications.datatable.header.actions',
    title: 'ACCIONES',
    width: '15%',
    justifyContent: 'center',
  },
]
