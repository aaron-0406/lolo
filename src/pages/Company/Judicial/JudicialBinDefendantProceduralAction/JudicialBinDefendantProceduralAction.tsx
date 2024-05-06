import Container from '@/ui/Container'
import JudicialBinDefendantProceduralActionTable from './JudicialBinDefendantProceduralActionTable'
import JudicialBinDefendantProceduralActionSearch from './JudicialBinDefendantProceduralActionSearch'
import { Opts } from '@/ui/Pagination/interfaces'
import { useState } from 'react'

const JudicialBinDefendantProceduralAction = () => {
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
      <JudicialBinDefendantProceduralActionSearch opts={opts} setOpts={setOpts} />
      <JudicialBinDefendantProceduralActionTable opts={opts} setOpts={setOpts} />
    </Container>
  )
}

export default JudicialBinDefendantProceduralAction
