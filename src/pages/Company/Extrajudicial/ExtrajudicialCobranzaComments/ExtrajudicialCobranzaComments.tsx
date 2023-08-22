import CobranzaCommentsInfo from './CobranzaCommentsInfo/CobranzaCommentsInfo'
import Container from '../../../../ui/Container/Container'
import CobranzaCommentsTable from './CobranzaCommentsTable/CobranzaCommentsTable'

const ExtrajudicialCobranzaComments = () => {
  return (
    <Container
      width="100%"
      height="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap="20px"
    >
      <CobranzaCommentsInfo />
      <CobranzaCommentsTable />
    </Container>
  )
}

export default ExtrajudicialCobranzaComments
