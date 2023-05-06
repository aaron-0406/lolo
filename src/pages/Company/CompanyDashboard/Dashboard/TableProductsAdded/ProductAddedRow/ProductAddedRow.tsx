import { FC } from 'react'
import { useFormContext } from 'react-hook-form'
import { useMutation } from 'react-query'
import styled, { css } from 'styled-components'
import { useLoloContext } from '../../../../../../shared/contexts/LoloProvider'
import { createProductsDash } from '../../../../../../shared/services/dashboard.service'
import Button from '../../../../../../ui/Button'
import notification from '../../../../../../ui/notification'
import Row from '../../../../../../ui/Table/Row'
import { DashFormType } from '../../hookform.type'
import { ProductAddedRowProps } from './ProductAddedRow.type'

const ProductAddedRow: FC<ProductAddedRowProps> = (props) => {
  const {
    product: { code, clientCode, clientName, name, state },
    index,
  } = props

  const {
    client: {
      customer: { id },
    },
    customerUser: {
      user: { id: customerUserId },
    },
    bank: {
      selectedBank: { idBank, idCHB },
    },
  } = useLoloContext()

  const { setValue, watch } = useFormContext<DashFormType>()

  const handleAddProduct = () => {
    createProducts()
  }

  const { isLoading, mutate: createProducts } = useMutation<any, Error>(
    async () => {
      return await createProductsDash(
        [{ code, name, clientCode, clientName, customerId: id, state }],
        customerUserId,
        +idCHB,
        +idBank
      )
    },
    {
      onSuccess: () => {
        setValue(
          'productsAdded',
          watch('productsAdded').filter((item) => item.code !== code)
        )
        notification({ type: 'success', message: 'Producto Agregado' })
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
      <Row>{clientName}</Row>
      <Row>{code}</Row>
      <Row>{name}</Row>
      <Row>{state}</Row>
      <Row>
        <Button
          onClick={handleAddProduct}
          display="default"
          shape="round"
          disabled={isLoading}
          loading={isLoading}
          trailingIcon="ri-add-fill"
        />
      </Row>
    </StyledTr>
  )
}

export default ProductAddedRow

const StyledTr = styled.tr<{ index: number }>`
  ${({ theme, index }) => css`
    background-color: ${index % 2 === 0 ? `${theme.colors.Neutral3}` : `#fff`};
    :hover {
      background-color: ${theme.colors.Neutral4};
    }
  `}
`
