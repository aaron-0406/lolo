import Container from '@/ui/Container'
import AddressTypeActions from './AddressTypeActions'
import AddressesTypeTable from './AddressTypeTable'

const ExtrajudicialAddressType = () => {
  return (
    <Container width="100%" height="calc(100% - 50px)" display="flex" flexDirection="column">
      <AddressTypeActions />
      <AddressesTypeTable />
    </Container>
  )
}

export default ExtrajudicialAddressType
