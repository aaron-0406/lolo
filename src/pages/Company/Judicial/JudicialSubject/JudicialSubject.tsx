import Container from '@/ui/Container'
import { Opts } from '@/ui/Pagination/interfaces'
import { useState } from 'react'
import SubjectSearch from './SubjectSearch'
import SubjectTable from './SubjectTable'

const JudicialSubject = () => {
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
      <SubjectSearch opts={opts} setOpts={setOpts} />
      <SubjectTable opts={opts} setOpts={setOpts} />
    </Container>
  )
}

export default JudicialSubject
