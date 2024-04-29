import Container from '@/ui/Container'
import JudicialBinTypeSearch from './JudicialBinTypeSearch'
import JudicialBinTypeBinnacleTable from './JudicialBinTypeBinnacleTable'
import { useState } from 'react'
import { Opts } from '@/ui/Pagination/interfaces'

const JudicialBinTypeBinnacle = () => {
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
      <JudicialBinTypeSearch opts={opts} setOpts={setOpts} />
      <JudicialBinTypeBinnacleTable opts={opts} setOpts={setOpts} />
    </Container>
  )
}

export default JudicialBinTypeBinnacle
