import { ColumProps } from '../../../../../ui/Table/Table'

export const customersColumns: ColumProps[] = [
  {
    id: 'customers.datatable.header.ruc',
    title: 'RUC',
    width: '20%',
    justifyContent: 'center',
  },
  {
    id: 'customers.datatable.header.company',
    title: 'COMPAÑIA',
    width: '30%',
  },
  {
    id: 'customers.datatable.header.urlidentifier',
    title: 'URL',
    width: '15%',
    justifyContent: 'space-between',
  },
  {
    id: 'customers.datatable.header.state',
    title: 'ESTADO',
    width: '10%',
    justifyContent: 'center',
  },
  {
    id: 'customers.datatable.header.date',
    title: 'FECHA DE REGISTRO',
    width: '10%',
    justifyContent: 'center',
  },
  {
    id: 'customers.datatable.header.editcliente',
    title: 'ACCIONES',
    width: '30%',
    justifyContent: 'center',
  },
]
