import { useState } from 'react'
import Container from '@/ui/Container'
import Breadcrumbs from '@/ui/Breadcrumbs'
import { Opts } from '@/ui/Pagination/interfaces'
import { useLoloContext } from '@/contexts/LoloProvider'
import CustomersActions from './CustomersActions'
import CustomersTable from './CustomersTable'
import paths from 'shared/routes/paths'
import { LinkType } from '@/ui/Breadcrumbs/Breadcrumbs.type'

const ExtrajudicialCustomers = () => {
  const [opts, setOpts] = useState<Opts>({ filter: '', limit: 50, page: 1 })
  
  const {
    client: { customer },
  } = useLoloContext()

  const routers: LinkType[] = [
    {
      link: paths.cobranza.clientes(customer.urlIdentifier),
      name: 'Clientes',
    },
  ]

  return (
    <Container width="100%" height="100%" display="flex" flexDirection="column">
      <CustomersActions opts={opts} setOpts={setOpts} />
      <Breadcrumbs routes={routers} />
      <CustomersTable opts={opts} setOpts={setOpts} />
    </Container>
  )
}

export default ExtrajudicialCustomers
