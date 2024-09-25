import { ColumProps } from '@/ui/Table/Table'

export const judicialBinNotificationListColumns: ColumProps[] = [
  {
    id: 'judicialCollateral.datatable.header.id',
    title: 'ID',
    width: '10%',
    justifyContent: 'center',
  },
  {
    id: 'judicialCollateral.datatable.header.notificationCode',
    title: 'CÓDIGO DE NOTIFICACIÓN',
    width: '10%',
    justifyContent: 'center',
  },
  {
    id: 'judicialCollateral.datatable.header.addressee',
    title: 'DESTINATARIO',
    width: '10%',
    justifyContent: 'left',
  },
  {
    id: 'judicialCollateral.datatable.header.attachments',
    title: 'ANEXOS',
    width: '10%',
    justifyContent: 'left',
  },
  {
    id: 'judicialCollateral.datatable.header.shipDate',
    title: 'FECHA DE ENVIO',
    width: '10%',
    justifyContent: 'left',
  },
  {
    id: 'judicialCollateral.datatable.header.deliveryMethod',
    title: 'FORMA DE ENTREGA',
    width: '10%',
    justifyContent: 'left',
  },
  {
    id: 'judicialCollateral.datatable.header.actions',
    title: 'ACCIONES',
    width: '10%',
    justifyContent: 'left',
  },
]
