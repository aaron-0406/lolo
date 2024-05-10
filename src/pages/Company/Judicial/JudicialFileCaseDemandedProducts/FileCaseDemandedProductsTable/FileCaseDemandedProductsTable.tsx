import useModal from '@/hooks/useModal'
import { getProductsByJudicialCaseFileId } from '@/services/extrajudicial/product.service'
import { ExtProductNameType } from '@/types/extrajudicial/ext-product-name'
import { NegotiationType } from '@/types/extrajudicial/negotiation.type'
import { ProductType } from '@/types/extrajudicial/product.type'
import notification from '@/ui/notification'
import { AxiosError, AxiosResponse } from 'axios'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { KEY_JUDICIAL_URL_DEMANDED_PRODUCT_CODE_CACHE } from './utils/file-case-demanded-products.cache'
import Container from '@/ui/Container'
import Table from '@/ui/Table'
import EmptyStateCell from '@/ui/Table/EmptyStateCell'
import BodyCell from '@/ui/Table/BodyCell'
import Text from '@/ui/Text'
import Button from '@/ui/Button'
import { demandedProductsColumns } from './utils/columns'
import RemoveDemandedProductModal from '../Modals/RemoveDemandedProductModal'
import EmptyState from '@/ui/EmptyState'

type FileCaseDemandedProductsTableProps = {
  caseFileId: number
}

const FileCaseDemandedProductsTable = ({ caseFileId }: FileCaseDemandedProductsTableProps) => {
  const [idRemoveProduct, setIdRemoveProduct] = useState<number>(0)

  const { visible: visibleRemoveProduct, showModal: showRemoveProduct, hideModal: hideRemoveProduct } = useModal()

  const handleClickRemove = (id: number) => {
    setIdRemoveProduct(id)
    showRemoveProduct()
  }

  const onCloseModalRemove = () => {
    setIdRemoveProduct(0)
    hideRemoveProduct()
  }

  const { data, isLoading } = useQuery<
    AxiosResponse<Array<ProductType & { negotiation: NegotiationType; extProductName: ExtProductNameType }>>,
    AxiosError<CustomErrorResponse>
  >(
    [KEY_JUDICIAL_URL_DEMANDED_PRODUCT_CODE_CACHE, caseFileId],
    async () => {
      return await getProductsByJudicialCaseFileId(caseFileId)
    },
    {
      onError: (error) => {
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )

  const products = data?.data ?? []

  return (
    <Container width="100%" height="calc(100% - 80px)" padding="20px">
      <Table
        top="195px"
        columns={demandedProductsColumns}
        loading={isLoading}
        isArrayEmpty={true}
        emptyState={
          <EmptyStateCell colSpan={demandedProductsColumns.length}>
            <EmptyState
              title="No hay recursos disponibles"
              description="No se encontraron productos demandados, por favor seleccione otros filtros."
              buttonLabel="Limpiar filtros"
              buttonAction={() => {}}
            />
          </EmptyStateCell>
        }
        emptyFirstState={
          <EmptyStateCell colSpan={demandedProductsColumns.length}>
            <EmptyState title="No hay recursos disponibles" description="No se encontraron Productos Demandados" />
          </EmptyStateCell>
        }
      >
        {!!products?.length &&
          products.map(
            (record: ProductType & { negotiation: NegotiationType; extProductName: ExtProductNameType }, key) => {
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
                      {record?.extProductName?.productName || '-'}
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
                          onClick={() => {
                            handleClickRemove(record.id)
                          }}
                          messageTooltip="Remover producto demandado del expediente"
                          shape="round"
                          size="small"
                          leadingIcon="ri-delete-bin-line"
                          permission="P13-01-03-03"
                          display="danger"
                        />
                      </Container>
                    }
                  </BodyCell>
                </tr>
              )
            }
          )}
      </Table>

      <RemoveDemandedProductModal
        visible={visibleRemoveProduct}
        onClose={onCloseModalRemove}
        idProduct={idRemoveProduct}
        judicialCaseFileId={caseFileId}
      />
    </Container>
  )
}

export default FileCaseDemandedProductsTable
