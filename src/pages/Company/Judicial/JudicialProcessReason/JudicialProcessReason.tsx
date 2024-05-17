import Container from '@/ui/Container'
import { Opts } from '@/ui/Pagination/interfaces'
import { useState } from 'react'
import ProcessReasonSearch from './ProcessReasonSearch'
import ProcessReasonTable from './ProcessReasonTable'

const JudicialProcessReason = () => {
  const [opts, setOpts] = useState<Opts>({ filter: '', limit: 50, page: 1 })

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
      <ProcessReasonSearch opts={opts} setOpts={setOpts} />
      <ProcessReasonTable opts={opts} setOpts={setOpts} />
    </Container>
  )
}

export default JudicialProcessReason
