import Container from '@/ui/Container'
import { Opts } from '@/ui/Pagination/interfaces'
import { useState } from 'react'
import ProceduralWaySearch from './ProceduralWaySearch'
import ProceduralWayTable from './ProceduralWayTable'

const JudicialProceduralWay = () => {
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
      <ProceduralWaySearch opts={opts} setOpts={setOpts} />
      <ProceduralWayTable opts={opts} setOpts={setOpts} />
    </Container>
  )
}

export default JudicialProceduralWay
