import Button from '../../ui/Button'
import Container from '../../ui/Container'
import ErrorIcon from '../../shared/assets/icons/404.png'
import Img from '../../ui/Img'

const NotFound = () => {
  const PreviusPage = () => {
    window.history.back()
  }

  return (
    <Container
      position="absolute"
      width="100%"
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      backgroundColor="#eff0f6ff"
    >
      <Container alignItems="center" maxWidth="85%">
        <Img placeholderImage="" src={ErrorIcon} />
      </Container>
      <Container textAlign="center" padding={'1%'}>
        <text style={{ fontSize: '90%' }}>PÁGINA NO ENCONTRADA</text> <br />
        <text style={{ fontSize: '80%' }}>
          La página que está buscando podría haber sido eliminada,
          <br />
          cambió su nombre o no está disponible temporalmente.
        </text>
      </Container>
      <Container>
        <Button width="" label="Página anterior" onClick={PreviusPage} />
      </Container>
    </Container>
  )
}

export default NotFound
