import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useMutation } from 'react-query'
import { device } from '../../../../../shared/breakpoints/reponsive'
import { useMediaQuery } from '../../../../../shared/hooks/useMediaQuery'
import { deleteProductsDash } from '../../../../../shared/services/dashboard.service'
import Button from '../../../../../ui/Button'
import Container from '../../../../../ui/Container'
import InputText from '../../../../../ui/inputs/InputText'
import notification from '../../../../../ui/notification'
import Table from '../../../../../ui/Table'
import Column from '../../../../../ui/Table/Column'
import { DashFormType } from '../hookform.type'
import ProductDeletedRow from './ProductDeletedRow'

const TableProductsDeleted = () => {
  const { watch, setValue } = useFormContext<DashFormType>()
  const [filter, setFilter] = useState('')
  const greaterThanDesktopS = useMediaQuery(device.desktopS)

  const columns = (
    <tr>
      <Column align="left" width="1%" text="#" />
      <Column align="left" width="10%" text="Codigo Cliente" />
      <Column align="left" width="29%" text="Código Producto" />
      <Column align="left" width="60%" text="Nombre Producto" />
      <Column align="left" width="45%" text="Acciones" />
    </tr>
  )
  const handleChangeInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
  }

  const rows = watch('productsDeleted')
    .filter(
      (item) =>
        item.code.toLowerCase().includes(filter.toLowerCase()) ||
        item.clientCode.toLowerCase().includes(filter.toLowerCase()) ||
        item.name.toLowerCase().includes(filter.toLowerCase())
    )
    .map((product, index) => {
      return <ProductDeletedRow product={product} key={index + product.code} index={index} />
    })
  const { isLoading, mutate: deleteProducts } = useMutation<any, Error>(
    async () => {
      const QUANTITY_DATA_SENT = 40
      const DATA_GROUPS = Math.ceil(watch('productsDeleted').length / QUANTITY_DATA_SENT)
      for (let i = 0; i < DATA_GROUPS; i++) {
        const start = i * QUANTITY_DATA_SENT
        const end = start + QUANTITY_DATA_SENT
        const chunk = watch('productsDeleted')
          .map((item) => {
            return item.code
          })
          .slice(start, end)
        await deleteProductsDash(chunk)
      }
    },
    {
      onSuccess: () => {
        notification({ type: 'success', message: 'Productos Eliminados' })
        setValue('productsDeleted', [])
      },
      onError: (error: any) => {
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )
  const handleDeleteProduct = () => {
    deleteProducts()
  }
  return (
    <>
      <Container
        display="flex"
        flexDirection={greaterThanDesktopS ? 'row' : 'column'}
        gap={greaterThanDesktopS ? '0px' : '10px'}
        width="100%"
        justifyContent="space-between"
      >
        <InputText placeholder="Buscar Producto..." name="filter" onChange={handleChangeInputText} />
        <Button
          display="danger"
          trailingIcon="ri-close-line"
          label="Eliminar Todos"
          shape="default"
          disabled={isLoading}
          loading={isLoading}
          onClick={handleDeleteProduct}
        />
      </Container>
      <Table columns={columns} count={rows.length} rows={rows} />
    </>
  )
}

export default TableProductsDeleted
