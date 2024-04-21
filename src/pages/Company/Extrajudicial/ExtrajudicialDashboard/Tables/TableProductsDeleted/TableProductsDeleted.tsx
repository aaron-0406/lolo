import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useMutation } from 'react-query'
import { AxiosError } from 'axios'
import { deleteProductsDash } from '@/services/extrajudicial/dashboard.service'
import { DashFormType } from '../../Dashboard/hookform.type'
import { Props } from '../Props.type'
import { ProductType } from '@/types/extrajudicial/product.type'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import notification from '@/ui/notification'
import Table from '@/ui/Table'
import Actions from '../../Dashboard/Actions'
import { Columns } from './utils/columns'
import EmptyStateCell from '@/ui/Table/EmptyStateCell'
import BodyCell from '@/ui/Table/BodyCell'
import { CustomErrorResponse } from 'types/customErrorResponse'

const TableProductsDeleted = ({ globalLoad }: Props) => {
  const { watch, setValue } = useFormContext<DashFormType>()
  const [filter, setFilter] = useState('')
  const [products, setProducts] = useState(watch('productsDeleted'))
  const [product, setProduct] = useState<ProductType>(products[0])

  const { isLoading: loadingDeleteProducts, mutate: deleteProducts } = useMutation<
    any,
    AxiosError<CustomErrorResponse>
  >(
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
      onError: (error) => {
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )

  const { isLoading: loadingDeleteProduct, mutate: deleteProduct } = useMutation<any, AxiosError<CustomErrorResponse>>(
    async () => {
      return await deleteProductsDash([product.code])
    },
    {
      onSuccess: () => {
        setValue(
          'productsDeleted',
          watch('productsDeleted').filter((item) => item.code !== product.code)
        )
        notification({ type: 'success', message: 'Producto Eliminado' })
      },
      onError: (error) => {
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )

  const handleDeleteProducts = () => {
    deleteProducts()
  }

  const handleDeleteProduct = (index: number) => {
    products.filter((record: ProductType) => {
      if (record.id === index) {
        setProduct(record)
        deleteProduct()
      }
      return null
    })
  }

  useEffect(() => {
    setProducts(watch('productsDeleted'))
  }, [globalLoad, watch])

  return (
    <Container width="100%" height="calc(100% - 112px)" padding="10px 0">
      <Actions
        setFilter={(e) => {
          setFilter(e.target.value)
        }}
        handleClick={handleDeleteProducts}
        isLoading={loadingDeleteProducts}
        state={true}
      />
      <Table
        top="300px"
        columns={Columns}
        loading={loadingDeleteProducts || globalLoad || loadingDeleteProduct}
        isArrayEmpty={!products}
        emptyState={
          <EmptyStateCell colSpan={Columns.length}>
            <div>Vacio</div>
          </EmptyStateCell>
        }
      >
        {!!products?.length &&
          products
            .filter(
              (item) =>
                item.code.toLowerCase().includes(filter.toLowerCase()) ||
                String(item.clientId).toLowerCase().includes(filter.toLowerCase()) ||
                item.name.toLowerCase().includes(filter.toLowerCase())
            )
            .map((record: ProductType, index: number) => {
              return (
                <tr className="styled-data-table-row" key={index}>
                  <BodyCell textAlign="center">{`${index + 1 || ''}`}</BodyCell>
                  <BodyCell>{`${record.clientId || ''}`}</BodyCell>
                  <BodyCell>{`${record.code || ''}`}</BodyCell>
                  <BodyCell>{`${record.name || ''}`}</BodyCell>
                  <BodyCell textAlign="center">
                    {
                      <Button
                        display="default"
                        size="small"
                        shape="round"
                        onClick={() => {
                          handleDeleteProduct(record.id)
                        }}
                        disabled={loadingDeleteProduct}
                        loading={loadingDeleteProduct}
                        trailingIcon="ri-add-fill"
                      />
                    }
                  </BodyCell>
                </tr>
              )
            })}
      </Table>
    </Container>
  )
}

export default TableProductsDeleted
