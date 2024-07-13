import Container from '@/ui/Container'
import CustomersActions from './CustomersActions'
import CustomersTable from './CustomersTable'
import { useState } from 'react'
import { Opts } from '@/ui/Pagination/interfaces'

const ExtrajudicialCustomers = () => {
  const [opts, setOpts] = useState<Opts>({ filter: '', limit: 20, page: 1 })
  return (
    <Container width="100%" height="100%" display="flex" flexDirection="column">
      <CustomersActions />
      <CustomersTable  
        opts={opts}
        setOpts={setOpts}
      />
    </Container>
  )
}

export default ExtrajudicialCustomers
