import { useParams } from 'react-router-dom'
import CobranzaCommentsInfo from './CobranzaCommentsInfo/CobranzaCommentsInfo'
import Container from '../../../../ui/Container/Container'

const ExtrajudicialCobranzaComments = () => {
  const { code } = useParams()
  const chb: string = ''

  return (
    <Container width="100%" display="flex" flexDirection="column" padding="30px">
      <CobranzaCommentsInfo code={code} chb={chb} />
    </Container>
  )
}

export default ExtrajudicialCobranzaComments
