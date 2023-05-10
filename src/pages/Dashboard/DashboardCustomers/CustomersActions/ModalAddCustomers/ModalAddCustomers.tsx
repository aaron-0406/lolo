import AddCcustomersActions from './AddCustomersActions'
import AddCustomerInfo from './AddCustomersInfo'
import Container from '../../../../../ui/Container'

const ModalAddCustomers = () => {

  return (
      <Container
        width="100%"
        height="410px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        gap="20px"
      >
        <AddCustomerInfo />
        <AddCcustomersActions />
      </Container>
  )
}
export default ModalAddCustomers
