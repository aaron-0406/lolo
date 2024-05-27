import Container from '@/ui/Container'
import JudicialBinProceduralStageTable from './JudicialBinProceduralStageTable'
import JudicialBinProceduralStageSearch from './JudicialBinProceduralStageSearch'
import { Opts } from '@/ui/Pagination/interfaces'
import { useState } from 'react'

const JudicialBinProceduralStage = () => {
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
      <JudicialBinProceduralStageSearch opts={opts} setOpts={setOpts} />
      <JudicialBinProceduralStageTable opts={opts} setOpts={setOpts} />
    </Container>
  )
}

export default JudicialBinProceduralStage
