import Container from '../../../ui/Container'
import CustomersActions from './CustomersActions'

const DashboardCustomers = () => {
  return (
    <Container width="100%" height="100%" display="flex" flexDirection="column">
      <CustomersActions />
    </Container>
  )
}

export default DashboardCustomers
