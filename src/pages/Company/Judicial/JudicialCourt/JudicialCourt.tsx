import Container from '@/ui/Container'
import { Opts } from '@/ui/Pagination/interfaces'
import { useState } from 'react'
import CourtSearch from './CourtSearch'
import CourtTable from './CourtTable'

const JudicialCourt = () => {
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
      <CourtSearch opts={opts} setOpts={setOpts} />
      <CourtTable opts={opts} setOpts={setOpts} />
    </Container>
  )
}

export default JudicialCourt
