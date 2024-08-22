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
    title: 'TIPO DE BIEN',
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
    id: 'judicialCollateral.datatable.header.electronicRecord',
    title: 'REGISTRO ELECTRÓNICO',
    width: '10%',
    justifyContent: 'left',
  },
  {
    id: 'judicialCollateral.datatable.header.dateOfPublicDeed',
    title: 'FECHA DE ESCRITURA PÚBLICA',
    width: '10%',
    justifyContent: 'left',
  },
  {
    id: 'judicialCollateral.datatable.header.registrationSeat',
    title: 'ASIENTO DE INSCRIPCIÓN',
    width: '10%',
    justifyContent: 'left',
  },
  {
    id: 'judicialCollateral.datatable.header.actions',
    title: 'ACCIONES',
    width: '10%',
    justifyContent: 'center',
  },
]
