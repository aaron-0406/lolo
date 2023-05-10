import { FormProvider, useForm } from 'react-hook-form'
import { CustomerType } from '../../../../../../shared/types/customer.type'
import { ModalCustomersResolver } from './ModalCustomers.yup'
import AddCcustomersActions from './AddCustomersActions'
import AddCustomerInfo from './AddCustomersInfo'
import Container from '../../../../../../ui/Container'

const ModalAddCustomers = () => {
  const formMethods = useForm<CustomerType>({
    resolver: ModalCustomersResolver,
    mode: 'all',
    defaultValues: {
      id: 0,
      ruc: '',
      companyName: '',
      urlIdentifier: '',
      description: '',
      state: undefined,
    },
  })

  return (
    <FormProvider {...formMethods}>
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
    </FormProvider>
  )
}
export default ModalAddCustomers
