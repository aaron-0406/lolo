import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useQuery } from 'react-query'
import styled, { css } from 'styled-components'
import { getProductsByClientCode } from '../../../../../../../shared/services/extrajudicial/product.service'
import { ProductType } from '../../../../../../../shared/types/product.type'
import Container from '../../../../../../../ui/Container'
import { ProductFormType } from '../hookforms.interfaces'
import ModalProductsRow from './ModalProductsRow'

const ModalProductsTable = () => {
  const { setValue, watch } = useFormContext<ProductFormType>()

  const products = watch('products')
  const { refetch, isLoading } = useQuery(
    'query-get-products-by-client-code',
    async () => {
      return await getProductsByClientCode(watch('clientCode'))
    },
    {
      enabled: false,
      onSuccess: (data) => {
        setValue('products', data.data)
      },
      onError: () => {},
    }
  )

  useEffect(() => {
    refetch()
    // eslint-disable-next-line
  }, [])
  if (isLoading) return <div>Loading</div>

  return (
    <StyledContainer width="100%" minHeight="100px" maxHeight="300px" overFlowY="auto">
      <div>
        {products.map((product: Omit<ProductType, 'funcionarioId' | 'cityId'>, index: number) => {
          return (
            <ModalProductsRow
              name={product.name}
              key={index}
              id={index + 1}
              productId={product.id}
              selected={product.id === watch('id')}
              state={product.state}
              code={product.code}
            />
          )
        })}
      </div>
    </StyledContainer>
  )
}

export default ModalProductsTable

const StyledContainer = styled(Container)`
  ${({ theme }) => css`
    border-radius: 8px;
    border: 2px solid ${theme.colors.Neutral4};
  `}
`
