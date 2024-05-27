import Container from '@/ui/Container'
import IpAddressBankTable from './IpAddressBankTable'
import IpAddressBankActions from './IpAddressBankActions'

const ExtrajudicialIpAddressBank = () => {
  return (
    <Container width="100%" height="calc(100% - 50px)" display="flex" flexDirection="column">
      <IpAddressBankActions />
      <IpAddressBankTable />
    </Container>
  )
}

export default ExtrajudicialIpAddressBank
