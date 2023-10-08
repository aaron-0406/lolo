import styled, { css } from 'styled-components'
import Container from '@/ui/Container/Container'
import Button from '@/ui/Button'
import Img from '@/ui/Img'
import ErrorIcon from '@/assets/icons/carpeta-error.png'
import { useLoloContext } from '@/contexts/LoloProvider'
import paths from 'shared/routes/paths'
import { useNavigate } from 'react-router-dom'

const Unauthorized = () => {
  const {
    client: {
      customer: { urlIdentifier },
    },
  } = useLoloContext()

  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`${paths.company.login(urlIdentifier)}`)
  }

  return (
    <Container width="100vw" height="100vh" display="flex" alignItems="center" justifyContent="center">
      <StyledContainer
        width="80%"
        height="350px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="start"
        position="relative"
      >
        <Img width="300px" placeholderImage="" src={ErrorIcon} />
        <h2>Contenido restringido</h2>
        <Button className="btn-login" label="Volver al menú principal" onClick={handleClick} />
      </StyledContainer>
    </Container>
  )
}

export default Unauthorized

export const StyledContainer = styled(Container)`
  ${({ theme }) => css`
    padding-top: 20px;
    border: 1.5px black solid;
    border-color: black;
    border-radius: 20px;

    .btn-login {
      position: absolute;
      top: calc(100% - 24px);
    }

    h2 {
      text-align: center;
      font-size: 32px;
    }

    @media ${theme.device.tabletS} {
      width: 70%;
      padding-top: 5px;
      box-shadow: 5px 4px 5px grey;

      img {
        width: 350px;
      }

      h2 {
        font-size: 5vw;
      }
    }

    @media ${theme.device.tabletL} {
      h2 {
        font-size: 4vw;
      }
    }

    @media ${theme.device.desktopS} {
      h2 {
        font-size: 3vw;
      }
    }
  `}
`
