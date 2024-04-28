import { ExtProductNameType } from '@/types/extrajudicial/ext-product-name'
import { NegotiationType } from '@/types/extrajudicial/negotiation.type'
import { ProductType } from '@/types/extrajudicial/product.type'
import { AxiosError, AxiosResponse } from 'axios'
import { useFormContext } from 'react-hook-form'
import { useQuery } from 'react-query'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { KEY_JUDICIAL_URL_DEMANDED_PRODUCT_CODE_CACHE } from '../../../FileCaseDemandedProductsTable/utils/file-case-demanded-products.cache'
import { getProductsByClientId } from '@/services/extrajudicial/product.service'
import notification from '@/ui/notification'
import Table from '@/ui/Table'
import EmptyStateCell from '@/ui/Table/EmptyStateCell'
import BodyCell from '@/ui/Table/BodyCell'
import Text from '@/ui/Text'
import { formDemandedProductsColumns } from './utils/columns'
import Checkbox from '@/ui/Checkbox'

type DemandedProductsInfoFormProps = {
  judicialCaseFileId?: number
  clientId?: number
}

const DemandedProductsInfoForm = ({ clientId = 0, judicialCaseFileId = 0 }: DemandedProductsInfoFormProps) => {
  const { getValues, setValue } = useFormContext<{ products: Array<number> }>()

  const onCheckBox = (state: boolean, productId: number) => {
    const ids = getValues('products')

    if (state) {
      setValue('products', [...ids, productId], { shouldValidate: true })
    } else {
      setValue(
        'products',
        ids.filter((id) => id != productId),
        { shouldValidate: true }
      )
    }
  }

  const { data, isLoading } = useQuery<
    AxiosResponse<Array<ProductType & { negotiation: NegotiationType; extProductName: ExtProductNameType }>>,
    AxiosError<CustomErrorResponse>
  >(
    [`${KEY_JUDICIAL_URL_DEMANDED_PRODUCT_CODE_CACHE}_UNASSIGNED_PRODUCTS`, judicialCaseFileId],
    async () => {
      return await getProductsByClientId(clientId)
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

  const products = (data?.data ?? []).filter((product) => product.judicialCaseFileId != judicialCaseFileId)

  return (
    <Table
      columns={formDemandedProductsColumns}
      loading={isLoading}
      isArrayEmpty={!products.length}
      emptyState={
        <EmptyStateCell colSpan={formDemandedProductsColumns.length}>
          <div>Vacio</div>
        </EmptyStateCell>
      }
    >
      {!!products?.length &&
        products.map(
          (record: ProductType & { negotiation: NegotiationType; extProductName: ExtProductNameType }, key) => {
            return (
              <tr className="styled-data-table-row" key={record.id}>
                <BodyCell textAlign="center">
                  <Checkbox
                    width="100%"
                    onChange={(key) => {
                      onCheckBox(key.currentTarget.checked, record.id)
                    }}
                  />
                </BodyCell>
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
              </tr>
            )
          }
        )}
    </Table>
  )
}

export default DemandedProductsInfoForm
