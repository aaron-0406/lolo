import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { CustomerType } from '../../../shared/types/customer.type'
import { ModalCustomersResolver } from './ModalCustomers.yup'
import Container from '../../../ui/Container'
import CustomersActions from './CustomersActions'
import CustomersSearch from './CustomersSearch'

const DashboardCustomers = () => {
  const formMethods = useForm<CustomerType>({
    resolver: ModalCustomersResolver,
    mode: 'all',
    defaultValues: {
      id: 0,
      ruc: '',
      companyName: '',
      urlIdentifier: '',
      description: 'no description',
      state: undefined,
    },
  })

  const [loading, setLoading] = useState<boolean>(false)

  const setLoadingGlobal = (state: boolean) => {
    setLoading(state)
  }

  return (
    <FormProvider {...formMethods}>
      <Container
        width="100%"
        height="15%"
        display="flex"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="space-around"
        gap="20px"
      >
        <CustomersSearch />
        <CustomersActions />
      </Container>
    </FormProvider>
  )
}

export default DashboardCustomers
