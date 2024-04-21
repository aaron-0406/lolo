import useModal from '@/hooks/useModal'
import { AxiosResponse } from 'axios'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { KEY_COBRANZA_URL_PRODUCT_CODE_CACHE } from './utils/company-products.cache'
import { ProductType } from '@/types/extrajudicial/product.type'
import { NegotiationType } from '@/types/extrajudicial/negotiation.type'
import notification from '@/ui/notification'
import { getProductsByClientId } from '@/services/extrajudicial/product.service'
import Table from '@/ui/Table'
import Container from '@/ui/Container'
import EmptyStateCell from '@/ui/Table/EmptyStateCell'
import BodyCell from '@/ui/Table/BodyCell'
import Text from '@/ui/Text'
import Button from '@/ui/Button'
import { productsColumns } from './utils/columns'
import CobranzaProductsModal from '../Modals/CobranzaProductsModal'
import DeleteCobranzaProductsModal from '../Modals/DeleteCobranzaProductsModal'

type CobranzaProductsTableProps = {
  clientId?: number
}

const CobranzaProductsTable = ({ clientId }: CobranzaProductsTableProps) => {
  const [idEdit, setIdEdit] = useState<number>(0)
  const [idDeletedProduct, setIdDeletedProduct] = useState<number>(0)

  const { visible: visibleModalProduct, showModal: showModalProduct, hideModal: hideModalProduct } = useModal()
  const { visible: visibleDeleteProduct, showModal: showDeleteProduct, hideModal: hideDeleteProduct } = useModal()

  const handleClickEdit = (id: number) => {
    setIdEdit(id)
    showModalProduct()
  }

  const onCloseModalEdit = () => {
    setIdEdit(0)
    hideModalProduct()
  }

  const handleClickDelete = (id: number) => {
    setIdDeletedProduct(id)
    showDeleteProduct()
  }

  const onCloseModalDelete = () => {
    setIdDeletedProduct(0)
    hideDeleteProduct()
  }

  const { data, isLoading } = useQuery<AxiosResponse<Array<ProductType & { negotiation: NegotiationType }>, Error>>(
    [KEY_COBRANZA_URL_PRODUCT_CODE_CACHE, clientId],
    async () => {
      return await getProductsByClientId(Number(clientId))
    },
    {
      onError: (error: any) => {
        if (!clientId) return
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )

  const products = data?.data ?? []

  return (
    <Container width="100%" height="calc(100% - 80px)" padding="20px">
      <Table
        top="195px"
        columns={productsColumns}
        loading={isLoading}
        isArrayEmpty={!products.length}
        emptyState={
          <EmptyStateCell colSpan={productsColumns.length}>
            <div>Vacio</div>
          </EmptyStateCell>
        }
      >
        {!!products?.length &&
          products.map((record: ProductType & { negotiation: NegotiationType }, key) => {
            return (
              <tr className="styled-data-table-row" key={record.id}>
                <BodyCell textAlign="center">{key + 1 || ''}</BodyCell>
                <BodyCell textAlign="left">
                  <Text.Body size="m" weight="regular">
                    {record.code || ''}
                  </Text.Body>
                </BodyCell>
                <BodyCell textAlign="center">
                  <Text.Body size="m" weight="bold" color="Primary5">
                    {record.name || ''}
                  </Text.Body>
                </BodyCell>
                <BodyCell textAlign="center">
                  <Text.Body size="m" weight="bold" color="Primary5">
                    {record?.negotiation?.name || '-'}
                  </Text.Body>
                </BodyCell>
                <BodyCell textAlign="center">
                  <Text.Body size="m" weight="bold" color="Primary5">
                    {record.state || ''}
                  </Text.Body>
                </BodyCell>
                <BodyCell textAlign="center">
                  {
                    <Container display="flex" gap="10px" justifyContent="space-around">
                      <Button
                        onClick={(event) => {
                          event.stopPropagation()
                          handleClickEdit(record.id)
                        }}
                        messageTooltip="Editar producto"
                        shape="round"
                        size="small"
                        leadingIcon="ri-pencil-fill"
                        permission="P02-02-07-02"
                      />
                      <Button
                        onClick={() => {
                          handleClickDelete(record.id)
                        }}
                        messageTooltip="Eliminar producto"
                        shape="round"
                        size="small"
                        leadingIcon="ri-delete-bin-line"
                        permission="P02-02-07-03"
                        display="danger"
                      />
                    </Container>
                  }
                </BodyCell>
              </tr>
            )
          })}
      </Table>

      <CobranzaProductsModal
        visible={visibleModalProduct}
        onClose={onCloseModalEdit}
        idProduct={idEdit}
        clientId={clientId}
        isEdit
      />

      <DeleteCobranzaProductsModal
        visible={visibleDeleteProduct}
        onClose={onCloseModalDelete}
        idProduct={idDeletedProduct}
        clientId={clientId}
      />
    </Container>
  )
}

export default CobranzaProductsTable
