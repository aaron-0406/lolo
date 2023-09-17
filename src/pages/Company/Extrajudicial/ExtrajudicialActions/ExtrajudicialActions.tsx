import { useState } from 'react'
import ActionsSearch from './ActionsSearch/ActionsSearch'
import { Opts } from '@/ui/Pagination/interfaces'
import Container from '@/ui/Container'
import ActionsTable from './ActionsTable/ActionsTable'

const ExtrajudicialActions = () => {
  const [opts, setOpts] = useState<Opts>({ filter: '', limit: 50, page: 1 })
  const [chb, setChb] = useState<number>(0)

  const setChbGlobal = (chb: number) => {
    setChb(chb)
  }

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
      <ActionsSearch opts={opts} setOpts={setOpts} selectedBank={{ chb, setChb: setChbGlobal }} />
      <ActionsTable opts={opts} setOpts={setOpts} selectedBank={{ chb, setChb: setChbGlobal }} />
    </Container>
  )
}

export default ExtrajudicialActions
