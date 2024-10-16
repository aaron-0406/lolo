import { ColumProps } from '@/ui/Table/Table'

export const judicialCollateralColumns: ColumProps[] = [
  {
    id: 'judicialCollateral.datatable.header.id',
    title: 'ID',
    width: '10%',
    justifyContent: 'center',
  },
  {
    id: 'judicialCollateral.datatable.header.kindOfProperty',
    title: 'TIPO DE BIEN',
    width: '10%',
    justifyContent: 'center',
  },
  {
    id: 'judicialCollateral.datatable.header.numberOfCollateral',
    title: 'NÚMERO DE GARANTÍA',
    width: '10%',
    justifyContent: 'left',
  },
  {
    id: 'judicialCollateral.datatable.header.propertyAddress',
    title: 'DIRECCIÓN DEL BIEN',
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
