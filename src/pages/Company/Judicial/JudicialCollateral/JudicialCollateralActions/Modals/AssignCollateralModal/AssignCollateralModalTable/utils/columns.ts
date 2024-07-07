import { ColumProps } from "@/ui/Table/Table";

const judicialCaseFileHasCollateralColumns: ColumProps[] = [
    {
      id: 'judicialCaseFileHasCollateral.datatable.header.checkbox',
      title: '',
      width: '5%',
      justifyContent: 'center', 
    },
    {
      id: 'judicialCaseFileHasCollateral.datatable.header.id',
      title: 'CODIGO',
      width: '10%',
      justifyContent: 'center', 
    }, 
    {
      id: 'judicialCaseFileHasCollateral.datatable.header.secretary',
      title: 'SECRETARIO',
      width: '10%',
      justifyContent: 'center',
    },
    {
      id: 'judicialCaseFileHasCollateral.datatable.header.client',
      title: 'CLIENTE',
      width: '10%',
      justifyContent: 'center',
    },
    {
      id: 'judicialCaseFileHasCollateral.datatable.header.actions',
      title: 'FECHA DE REGISTRO',
      width: '10%',
      justifyContent: 'center',
    },
]

export default judicialCaseFileHasCollateralColumns