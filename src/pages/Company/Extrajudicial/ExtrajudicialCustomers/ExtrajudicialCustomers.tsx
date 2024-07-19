import { useState } from 'react'
import Container from '@/ui/Container'
import CustomersActions from './CustomersActions'
import CustomersTable from './CustomersTable'
import { ClientType } from '@/types/extrajudicial/client.type'

const ExtrajudicialCustomers = () => {
  const [archived, setArchived] = useState<boolean>(false)
  const [selectedCustomers, setSelectedCustomers] = useState<ClientType[]>([])

  const onChangeArchivedState = () => {
    setArchived(!archived)
    setSelectedCustomers([])
  }

  return (
    <Container width="100%" height="100%" display="flex" flexDirection="column">
      <CustomersActions archived={archived} onChangeArchivedState={onChangeArchivedState} />
      <CustomersTable
        archived={archived}
        setArchived={setArchived}
        selectedCustomers={selectedCustomers}
        setSelectedCustomers={setSelectedCustomers}
      />
    </Container>
  )
}

export default ExtrajudicialCustomers
