import { useState } from 'react'
import Container from '../../../ui/Container'
import { Opts } from '../../../ui/Pagination/interfaces'
import CustomersActions from './CustomersActions'
import CustomersTable from './CustomersTable'

const CompanyCustomers = () => {
  const [opts, setOpts] = useState<Opts>({ filter: '', limit: 50, page: 1 })
  return (
    <Container width="100%" height="100%" display="flex" flexDirection="column">
      <CustomersActions opts={opts} setOpts={setOpts} />

      <CustomersTable opts={opts} setOpts={setOpts} />
    </Container>
  )
}

export default CompanyCustomers
