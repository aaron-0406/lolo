import { useState } from 'react'
import moment from 'moment'
import { useQuery } from 'react-query'
import { ExtProductNameType } from '@/types/extrajudicial/ext-product-name'
import useModal from '@/hooks/useModal'
import { getProductNameByCHB } from '@/services/extrajudicial/ext-product-name.service'
import Container from '@/ui/Container'
import Table from '@/ui/Table'
import EmptyStateCell from '@/ui/Table/EmptyStateCell'
import BodyCell from '@/ui/Table/BodyCell'
import Button from '@/ui/Button'
import notification from '@/ui/notification'
import ProductNameModal from '../Modals/ProductNameModal'
import DeleteProductNameModal from '../Modals/DeleteProductNameModal'
import { ProductNameColumns } from './utils/columns'
import { KEY_EXT_PRODUCT_NAME_CACHE } from './utils/ext-product-name.cache'
import { useLoloContext } from '@/contexts/LoloProvider'
import { AxiosResponse } from 'axios'
import EmptyState from '@/ui/EmptyState'

const ProductNameTable = () => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const [idProductName, setIdProductName] = useState<number>(0)
  const [idDeletedProductName, setIdDeletedProductName] = useState<number>(0)

  const {
    visible: visibleModalProductName,
    showModal: showModalProductName,
    hideModal: hideModalProductName,
  } = useModal()
  const {
    visible: visibleDeleteProductName,
    showModal: showDeleteProductName,
    hideModal: hideDeleteProductName,
  } = useModal()

  const handleClickButtonEdit = (id: number) => {
    setIdProductName(id)
    showModalProductName()
  }

  const handleClickDeleteProductName = (id: number) => {
    setIdDeletedProductName(id)
    showDeleteProductName()
  }

  const onCloseDeleteProductName = () => {
    setIdDeletedProductName(0)
    hideDeleteProductName()
  }

  const onCloseModal = () => {
    setIdProductName(0)
    hideModalProductName()
  }

  const { isLoading, data } = useQuery<AxiosResponse<Array<ExtProductNameType>, Error>>(
    [KEY_EXT_PRODUCT_NAME_CACHE, parseInt(chb.length ? chb : '0')],
    async () => {
      return await getProductNameByCHB(parseInt(chb.length ? chb : '0'), true)
    },
    {
      onError: (error: any) => {
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )

  const productsName = data?.data ?? []

  return (
    <Container width="100%" height="calc(100% - 112px)" padding="20px">
      <Table
        top="260px"
        columns={ProductNameColumns}
        loading={isLoading}
        isArrayEmpty={!productsName.length}
        emptyState={
          <EmptyStateCell colSpan={ProductNameColumns.length}>
            <EmptyState
              title="No hay recursos disponibles"
              description="No se encontraron productos disponibles, por favor seleccione otros filtros."
              buttonLabel="Limpiar filtros"
              buttonAction={() => {}}
            />
          </EmptyStateCell>
        }
        emptyFirstState={
          <EmptyStateCell colSpan={ProductNameColumns.length}>
            <EmptyState
              title="No hay recursos disponibles"
              description="No se encontraron productos disponibles"
            />
          </EmptyStateCell>
        }
      >
        {!!productsName?.length &&
          productsName.map((record: ExtProductNameType, key: number) => {
            return (
              <tr className="styled-data-table-row" key={record.id}>
                <BodyCell textAlign="center">{`${key + 1 || ''}`}</BodyCell>
                <BodyCell textAlign="left">{`${record.productName || ''}`}</BodyCell>
                <BodyCell textAlign="center">{`${moment(record.createdAt).format('DD-MM-YYYY') || ''}`}</BodyCell>
                <BodyCell textAlign="center">
                  {
                    <Container display="flex" gap="10px" justifyContent="space-around">
                      <Button
                        onClick={() => {
                          handleClickButtonEdit(record.id)
                        }}
                        messageTooltip="Editar nombre de producto"
                        shape="round"
                        size="small"
                        leadingIcon="ri-pencil-fill"
                        permission="P19-02"
                      />
                      <Button
                        onClick={() => {
                          handleClickDeleteProductName(record.id)
                        }}
                        messageTooltip="Eliminar nombre de producto"
                        shape="round"
                        size="small"
                        leadingIcon="ri-delete-bin-line"
                        permission="P19-03"
                        display="danger"
                      />
                    </Container>
                  }
                </BodyCell>
              </tr>
            )
          })}
      </Table>

      <ProductNameModal visible={visibleModalProductName} onClose={onCloseModal} idProductName={idProductName} isEdit />
      <DeleteProductNameModal
        visible={visibleDeleteProductName}
        onClose={onCloseDeleteProductName}
        idProductName={idDeletedProductName}
      />
    </Container>
  )
}

export default ProductNameTable
