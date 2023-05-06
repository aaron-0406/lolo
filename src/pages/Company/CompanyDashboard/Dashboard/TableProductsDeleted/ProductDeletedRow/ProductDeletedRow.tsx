import { FC } from 'react'
import { useFormContext } from 'react-hook-form'
import { useMutation } from 'react-query'
import styled, { css } from 'styled-components'
import { deleteProductsDash } from '../../../../../../shared/services/dashboard.service'
import Button from '../../../../../../ui/Button'
import notification from '../../../../../../ui/notification'
import Row from '../../../../../../ui/Table/Row'
import { DashFormType } from '../../hookform.type'
import { ProductDeletedRowProps } from './ProductDeletedRow.type'

const ProductDeletedRow: FC<ProductDeletedRowProps> = (props) => {
  const {
    product: { code, clientCode, name },
    index,
  } = props
  const { setValue, watch } = useFormContext<DashFormType>()
  const handleDeleteProduct = () => {
    deleteProduct()
  }
  const { isLoading, mutate: deleteProduct } = useMutation<any, Error>(
    async () => {
      return await deleteProductsDash([code])
    },
    {
      onSuccess: () => {
        setValue(
          'productsDeleted',
          watch('productsDeleted').filter((item) => item.code !== code)
        )
        notification({ type: 'success', message: 'Producto Eliminado' })
      },
      onError: (error: any) => {
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )
  return (
    <StyledTr index={index}>
      <Row>{index + 1}</Row>
      <Row>{clientCode}</Row>
      <Row>{code}</Row>
      <Row>{name}</Row>
      <Row>
        <Button
          display="danger"
          shape="round"
          trailingIcon="ri-close-line"
          onClick={handleDeleteProduct}
          disabled={isLoading}
          loading={isLoading}
        />
      </Row>
    </StyledTr>
  )
}

export default ProductDeletedRow

const StyledTr = styled.tr<{ index: number }>`
  ${({ theme, index }) => css`
    background-color: ${index % 2 === 0 ? `${theme.colors.Neutral3}` : `#fff`};
    :hover {
      background-color: ${theme.colors.Neutral4};
    }
  `}
`
