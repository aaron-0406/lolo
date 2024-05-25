import Container from '@/ui/Container'
import JudicialFileCasesActions from './JudicialFileCasesActions'
import JudicialFileCasesTable from './JudicialFileCasesTable'

const JudicialFileCasesList = () => {
  return (
    <Container width="100%" height="calc(100% - 50px)" display="flex" flexDirection="column">
      <JudicialFileCasesActions />
      <JudicialFileCasesTable />
    </Container>
  )
}

export default JudicialFileCasesList
