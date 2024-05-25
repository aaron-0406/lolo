import Container from '@/ui/Container'
import ObsTypeActions from './ObsTypeActions'
import ObsTypeTable from './ObsTypeTable'

const JudicialObsType = () => {
  return (
    <Container width="100%" height="calc(100% - 50px)" display="flex" flexDirection="column">
      <ObsTypeActions />
      <ObsTypeTable />
    </Container>
  )
}

export default JudicialObsType
