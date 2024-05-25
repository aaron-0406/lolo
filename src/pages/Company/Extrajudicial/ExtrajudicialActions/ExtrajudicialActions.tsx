import { useState } from 'react'
import ActionsSearch from './ActionsSearch/ActionsSearch'
import { Opts } from '@/ui/Pagination/interfaces'
import Container from '@/ui/Container'
import ActionsTable from './ActionsTable/ActionsTable'

const ExtrajudicialActions = () => {
  const [opts, setOpts] = useState<Opts>({ filter: '', limit: 50, page: 1 })

  return (
    <Container
      width="100%"
      height="calc(100% - 50px)"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap="20px"
    >
      <ActionsSearch opts={opts} setOpts={setOpts} />
      <ActionsTable opts={opts} setOpts={setOpts} />
    </Container>
  )
}

export default ExtrajudicialActions
