import styled, { css } from 'styled-components'
import Container from '../../../../ui/Container'
import TextField from '../../../../ui/fields/TextField'
import Text from '../../../../ui/Text'
import { useMediaQuery } from '../../../../shared/hooks/useMediaQuery'
import { device } from '../../../../shared/breakpoints/reponsive'

const CustomersSearch = () => {
  const greaterThanMobile = useMediaQuery(device.tabletS)
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
  }

  return (
    <StyledContainer className="search__textfield" width="75%" display="flex" justifyContent="space-around">
      <Container display={greaterThanMobile ? 'block' : 'none'} padding="0 5px 0 0">
        <Text.Body className="actions__texfield-label" size="l" weight="bold">
          Buscar:
        </Text.Body>
      </Container>
      <TextField
        onChange={onChangeSearch}
        width={greaterThanMobile ? '85%' : '100%'}
        placeholder="Buscar cliente por nombre"
      />
    </StyledContainer>
  )
}

export default CustomersSearch

const StyledContainer = styled(Container)`
  ${({ theme }) => css`
    @media ${theme.device.tabletS} {
      .search__textfield {
        width: 80%;
      }
    }
  `}
`
