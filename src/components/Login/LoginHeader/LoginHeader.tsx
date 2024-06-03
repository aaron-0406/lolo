import Container from '@/ui/Container'
import Text from '@/ui/Text'

type LoginHeaderProps = {
  title: string
}

const LoginHeader: React.FC<LoginHeaderProps> = ({ title }) => {
  return (
    <Container
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Text.Body size="l" weight="bold">
        {title}
      </Text.Body>
    </Container>
  )
}

export default LoginHeader

