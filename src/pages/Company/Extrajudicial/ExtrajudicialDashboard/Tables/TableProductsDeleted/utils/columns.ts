import { ColumProps } from '@/ui/Table/Table'

export const Columns: ColumProps[] = [
  {
    id: 'company.dashboard.ProductsDeleted.number',
    title: '#',
    width: '10%',
    justifyContent: 'center',
  },
  {
    id: 'company.dashboard.ProductsDeleted.codeClient',
    title: 'Codigo Cliente',
    width: '15%',
  },
  {
    id: 'company.dashboard.ProductsDeleted.codeProduct',
    title: 'Código Producto',
    width: '25%',
  },
  {
    id: 'company.dashboard.ProductsDeleted.nameProduct',
    title: 'Nombre Producto',
    width: '50%',
  },
  {
    id: 'company.dashboard.ProductsDeleted.button',
    title: 'Acciones',
    width: '10%',
  },
]
