import { useLoloContext } from '@/contexts/LoloProvider'
import Container from '@/ui/Container'
import Text from '@/ui/Text'

const LoginHeader = () => {
  const {
    client: {
      customer: { companyName },
    },
  } = useLoloContext()

  return (
    <Container
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      gap="20px"
      padding="20px 0"
    >
      <Text.Body size="l" weight="bold" style={{ textAlign: 'center' }}>
        {companyName}
      </Text.Body>
    </Container>
  )
}

export default LoginHeader
