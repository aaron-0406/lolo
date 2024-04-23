import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useMutation } from 'react-query'
import { AxiosError } from 'axios'
import { useLoloContext } from '@/contexts/LoloProvider'
import { createProductsDash } from '@/services/extrajudicial/dashboard.service'
import { DashFormType } from '../../Dashboard/hookform.type'
import { Props } from '../Props.type'
import { ProductTypeName } from '@/types/extrajudicial/product.type'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import notification from '@/ui/notification'
import Table from '@/ui/Table'
import Actions from '../../Dashboard/Actions'
import { Columns } from './utils/columns'
import EmptyStateCell from '@/ui/Table/EmptyStateCell'
import BodyCell from '@/ui/Table/BodyCell'
import { CustomErrorResponse } from 'types/customErrorResponse'

const TableProductsAdded = ({ globalLoad }: Props) => {
  const { watch, setValue } = useFormContext<DashFormType>()
  const [filter, setFilter] = useState('')
  const [products, setProducts] = useState(watch('productsAdded'))
  const [product, setProduct] = useState<ProductTypeName>(products[0])

  const {
    customerUser: {
      user: { id: customerUserId },
    },
    client: {
      customer: { id: customerId },
    },
    bank: {
      selectedBank: { idBank, idCHB },
    },
  } = useLoloContext()

  const { isLoading: loadCreateProducts, mutate: createProducts } = useMutation<any, AxiosError<CustomErrorResponse>>(
    async () => {
      const QUANTITY_DATA_SENT = 40
      const DATA_GROUPS = Math.ceil(watch('productsAdded').length / QUANTITY_DATA_SENT)
      for (let i = 0; i < DATA_GROUPS; i++) {
        const start = i * QUANTITY_DATA_SENT
        const end = start + QUANTITY_DATA_SENT
        const chunk = watch('productsAdded')
          .map((item) => {
            return {
              clientName: item.clientName,
              state: item.state,
              customerId: customerId,
              clientId: item.clientId,
            }
          })
          .slice(start, end)
        await createProductsDash(chunk, customerUserId, +idCHB, +idBank)
      }
    },
    {
      onSuccess: () => {
        notification({ type: 'success', message: 'Productos Agregados' })
        setValue(
          'clientsAdded',
          watch('clientsAdded').filter(
            (item) => !watch('productsAdded').some((item2) => item2.clientId === item.clientId)
          )
        )
        setValue('productsAdded', [])
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

  const { isLoading: loadCreateProduct, mutate: createProduct } = useMutation<any, AxiosError<CustomErrorResponse>>(
    async () => {
      return await createProductsDash(
        [
          {
            clientId: product.clientId,
            clientName: product.clientName,
            customerId: product.id,
            state: product.state,
          },
        ],
        customerUserId,
        +idCHB,
        +idBank
      )
    },
    {
      onSuccess: () => {
        setValue(
          'productsAdded',
          watch('productsAdded').filter((item) => item.clientId !== product.clientId)
        )
        notification({ type: 'success', message: 'Producto Agregado' })
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

  const handleAddProducts = () => {
    createProducts()
  }

  const handleAddProduct = (index: number) => {
    products.filter((record: ProductTypeName) => {
      if (record.id === index) {
        setProduct(record)
        createProduct()
      }
      return null
    })
  }

  useEffect(() => {
    setProducts(watch('productsAdded'))
  }, [globalLoad, watch])

  return (
    <Container width="100%" height="calc(100% - 112px)" padding="10px 0">
      <Actions
        setFilter={(e) => {
          setFilter(e.target.value)
        }}
        handleClick={handleAddProducts}
        isLoading={loadCreateProducts}
        state={true}
      />
      <Table
        top="300px"
        columns={Columns}
        loading={loadCreateProducts || globalLoad || loadCreateProduct}
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
                String(item.clientId).includes(filter.toLowerCase()) ||
                item.clientName.toLowerCase().includes(filter.toLowerCase())
            )
            .map((record: ProductTypeName, index: number) => {
              return (
                <tr className="styled-data-table-row" key={index}>
                  <BodyCell textAlign="center">{`${index + 1 || ''}`}</BodyCell>
                  <BodyCell>{`${record.clientId || ''}`}</BodyCell>
                  <BodyCell>{`${record.clientName || ''}`}</BodyCell>
                  <BodyCell>{`${record.clientId || ''}`}</BodyCell>
                  <BodyCell>{`${record.state || ''}`}</BodyCell>
                  <BodyCell textAlign="center">
                    {
                      <Button
                        display="default"
                        size="small"
                        shape="round"
                        onClick={() => {
                          handleAddProduct(record.id)
                        }}
                        disabled={loadCreateProduct}
                        loading={loadCreateProduct}
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

export default TableProductsAdded
