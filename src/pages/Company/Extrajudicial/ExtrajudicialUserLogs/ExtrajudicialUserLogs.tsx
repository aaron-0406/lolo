import { useState } from 'react'
import Container from '@/ui/Container'
import UserLogsActions from './UserLogsActions'
import UserLogsTable from './UserLogsTable'
import { Opts } from '@/ui/Pagination/interfaces'

const ExtrajudicialUserLogs = () => {
  const [opts, setOpts] = useState<Opts>({ filter: '', limit: 20, page: 1 })

  return (
    <Container width="100%" height="calc(100% - 50px)" display="flex" flexDirection="column">
      <UserLogsActions />
      <UserLogsTable opts={opts} setOpts={setOpts} />
    </Container>
  )
}

export default ExtrajudicialUserLogs
