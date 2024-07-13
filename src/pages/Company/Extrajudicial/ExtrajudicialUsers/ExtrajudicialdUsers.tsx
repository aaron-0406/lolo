import { useState } from 'react'
import UsersSearch from './UsersSearch'
import UsersTable from './UsersTable'
import Container from '@/ui/Container'
import { Opts } from '@/ui/Pagination/interfaces'

const ExtrajudicialdUsers = () => {
  const [opts, setOpts] = useState<Opts>({ filter: '', limit: 20, page: 1 })

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
      <UsersSearch opts={opts} setOpts={setOpts} />
      <UsersTable opts={opts} setOpts={setOpts} />
    </Container>
  )
}

export default ExtrajudicialdUsers
