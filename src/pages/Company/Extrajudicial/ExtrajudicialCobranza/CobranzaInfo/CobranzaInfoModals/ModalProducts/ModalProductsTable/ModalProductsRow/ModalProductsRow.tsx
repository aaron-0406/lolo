import { useFormContext } from 'react-hook-form'
import styled, { css } from 'styled-components'
import Container from '@/ui/Container'
import Text from '@/ui/Text'
import { ProductFormType } from '../../hookforms.interfaces'

type ModalProductsRowProps = {
  id: number
  code: string
  productId: number
  name: string
  state: string
  selected?: boolean
  onClick?: (productId: number) => void
}
const ModalProductsRow: React.FC<ModalProductsRowProps> = (props) => {
  const { setValue } = useFormContext<ProductFormType>()
  const { id, code, productId, name, state, onClick, selected = false } = props
  const onClickRow = () => {
    onClick?.(productId)
    setValue('name', name)
    setValue('code', code)
    setValue('id', productId)
    setValue('state', state)
  }
  return (
    <StyledContainer $selected={selected} width="100%" height="60px" display="flex" onClick={onClickRow}>
      <Container width="20%" height="100%" display="flex" alignItems="center" justifyContent="center">
        {id}
      </Container>
      <Container width="80%" height="100%" display="flex" alignItems="center">
        <Text.Body size="m" weight="regular" ellipsis>
          {code} - {name}
        </Text.Body>
      </Container>
    </StyledContainer>
  )
}

export default ModalProductsRow

const StyledContainer = styled(Container)<{ $selected: boolean }>`
  ${({ theme, $selected }) => css`
    cursor: pointer;
    border-bottom: 2px solid ${theme.colors.Neutral4};
    background-color: ${$selected ? theme.colors.Neutral3 : '#fff'};
    &:hover {
      background-color: ${theme.colors.Neutral3};
    }
  `}
`
