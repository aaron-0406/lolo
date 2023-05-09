import { FormProvider, useForm } from 'react-hook-form'
import { CustomersFirmFormType } from './hookforms.interfaces'
import { ModalCustomersResolver } from './ModalCustomers.yup'
import AddCcustomersActions from './AddCustomersActions'
import AddCustomerInfo from './AddCustomersInfo'
import Container from '../../../../../../ui/Container'

const ModalAddCustomers = () => {
  const formMethods = useForm<CustomersFirmFormType>({
    resolver: ModalCustomersResolver,
    mode: 'all',
    defaultValues: {
      ruc: '',
      companyName: '',
      urlIdentifier: '',
      description: '',
      state: undefined,
      customersfirm: [],
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
