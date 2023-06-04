import { useState } from 'react'
import CustomersSearch from './CustomersSearch'
import CustomersTable from './CustomersTable'
import Container from '../../../ui/Container'
import { Opts } from '../../../ui/Pagination/interfaces'

const DashboardCustomers = () => {
  

  const [loading, setLoading] = useState<boolean>(false)
  const [opts, setOpts] = useState<Opts>({ filter: '', limit: 50, page: 1 })

  const setLoadingGlobal = (state: boolean) => {
    setLoading(state)
  }

  return (
    
      <Container
        width="100%"
        height="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap="20px"
      >
        <CustomersSearch opts={opts} setOpts={setOpts} setLoadingGlobal={setLoadingGlobal} />
        <CustomersTable opts={opts} setOpts={setOpts} load={loading} />
      </Container>
  )
}

export default DashboardCustomers
