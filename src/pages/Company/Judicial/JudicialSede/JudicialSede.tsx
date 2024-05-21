import Container from '@/ui/Container'
import SedeActions from './SedeActions'
import SedeTable from './SedeTable'

const JudicialSede = () => {
  return (
    <Container width="100%" height="100%" display="flex" flexDirection="column">
      <SedeActions />
      <SedeTable />
    </Container>
  )
}

export default JudicialSede
