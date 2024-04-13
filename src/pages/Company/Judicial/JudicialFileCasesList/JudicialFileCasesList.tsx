import Container from '@/ui/Container'
import JudicialFileCasesActions from './JudicialFileCasesActions'
import JudicialFileCasesTable from './JudicialFileCasesTable'
import { useState } from 'react'
import { Opts } from '@/ui/Pagination/interfaces'

const JudicialFileCasesList = () => {
  const [opts, setOpts] = useState<Opts>({ filter: '', limit: 50, page: 1 })

  return (
    <Container width="100%" height="100%" display="flex" flexDirection="column">
      <JudicialFileCasesActions opts={opts} setOpts={setOpts} />
      <JudicialFileCasesTable opts={opts} setOpts={setOpts} />
    </Container>
  )
}

export default JudicialFileCasesList
