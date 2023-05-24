import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { CustomerType } from '../../../shared/types/customer.type'
import { ModalCustomersResolver } from './ModalCustomers.yup'
import Container from '../../../ui/Container'
import CustomersActions from './CustomersActions'
import CustomersSearch from './CustomersSearch'
import CustomersTable from './CustomersTable'
import { Opts } from '../../../ui/Pagination/interfaces'

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

  const [opts, setOpts] = useState<Opts>({ filter: '', limit: 50, page: 1 })

  return (
    <FormProvider {...formMethods}>
      <Container
        width="100%"
        height="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap="20px"
      >
        <Container display='flex' width="100%" padding="0 20px" justifyContent='space-around'>
          <CustomersSearch opts={opts} setOpts={setOpts} />
          <CustomersActions setLoad={setLoadingGlobal} />
        </Container>
        <CustomersTable opts={opts} setOpts={setOpts} load={loading} />
      </Container>
    </FormProvider>
  )
}

export default DashboardCustomers
