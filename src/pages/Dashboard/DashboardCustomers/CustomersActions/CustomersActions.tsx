import styled, { css } from 'styled-components'
import Container from '../../../../ui/Container'
import TextField from '../../../../ui/fields/TextField'
import Button from '../../../../ui/Button'
import Text from '../../../../ui/Text/Text'
import { useMediaQuery } from '../../../../shared/hooks/useMediaQuery'
import { device } from '../../../../shared/breakpoints/reponsive'

const CustomersActions = () => {
  const greaterThanMobile = useMediaQuery(device.tabletS)

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
  }

  return (
    <StyledContainer alignItems="center" justifyContent="space-around" display="flex" padding="20px">
      <Container
        className="actions__textfield"
        width="75%"
        display="flex"
        alignItems="center"
        justifyContent="space-around"
      >
        <Container display={greaterThanMobile ? 'block' : 'none'} padding="0 5px 0 0">
          <Text.Body className="actions__texfield-label" size="l" weight="bold">
            Buscar:{' '}
          </Text.Body>
        </Container>
        <TextField
          onChange={onChangeSearch}
          width={greaterThanMobile ? '85%' : '100%'}
          placeholder="Buscar cliente por nombre"
        />
      </Container>
      <Button width="15%" className="actions-button" label="+" size="small" />
    </StyledContainer>
  )
}

export default CustomersActions

const StyledContainer = styled(Container)`
  ${({ theme }) => css`
    @media ${theme.device.tabletS} {
      .actions__textfield {
        width: 80%;
      }

      .actions-button {
        width: 10%;
      }
    }

    @media ${theme.device.tabletL} {
    }

    @media ${theme.device.desktopS} {
    }
  `}
`
