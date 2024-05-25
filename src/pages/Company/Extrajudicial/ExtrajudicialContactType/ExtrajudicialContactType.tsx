import Container from '@/ui/Container'
import ContactTypeActions from './ContactTypeActions'
import ContactTypeTable from './ContactTypeTable'

const ExtrajudicialContactType = () => {
  return (
    <Container width="100%" height="calc(100% - 50px)" display="flex" flexDirection="column">
      <ContactTypeActions />
      <ContactTypeTable />
    </Container>
  )
}

export default ExtrajudicialContactType
