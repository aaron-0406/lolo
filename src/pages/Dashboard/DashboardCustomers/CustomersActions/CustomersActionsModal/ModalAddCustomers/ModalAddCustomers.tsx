import { FormProvider, useForm } from 'react-hook-form'
import { CustomersFirmFormType } from './hookforms.interfaces'
import { ModalCustomersResolver } from './ModalCustomers.yup'
import AddCcustomersActions from './AddCustomersActions'
import AddCustomerInfo from './AddCustomersInfo'

const ModalAddCustomers = () => {
  const formMethods = useForm<CustomersFirmFormType>({
    resolver: ModalCustomersResolver,
    mode: 'all',
    defaultValues: {
      ruc: '',
      companyName: '',
      urlIdentifier: '',
      description: '',
      state: false,
      customersfirm: [],
    },
  })

  return (
    <FormProvider {...formMethods}>
      <>
        <AddCustomerInfo />
        <AddCcustomersActions />
      </>
    </FormProvider>
  )
}
export default ModalAddCustomers
