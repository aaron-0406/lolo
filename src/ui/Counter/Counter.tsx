import styled, { css } from 'styled-components'
import Container from '@/ui/Container'
import Button from '../Button'

type CounterProps = {
  onChange: (id: number, index: 1 | -1) => void
  badge?: string
  value: number
  idEntity: number
}

const Counter = ( { onChange, value, badge = "", idEntity } : CounterProps) => {
  return (
    <StyledContainer>
      <Button shape="round" size="small" trailingIcon="ri-add-line" onClick={() => onChange(idEntity, 1)} />
      <Container minWidth="80px" display="flex" justifyContent="center" alignItems="center">
        {badge} {value.toFixed(2)}
      </Container>
      <Button shape="round" size="small" trailingIcon="ri-subtract-line" onClick={() => onChange(idEntity, -1)} />
    </StyledContainer>
  )
}

export default Counter

const StyledContainer = styled(Container)`
  ${({ theme }) => css`
    width: fit-content;
    height: 100%;
    display: flex;
    gap: 10px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  `}
`
