import { useState } from 'react'
import NegotiationTable from './NegotiationTable'
import Container from '@/ui/Container'
import { Opts } from '@/ui/Pagination/interfaces'
import NegotiationSearch from './NegotiationSearch'

const DashboardNegotiations = () => {
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
      <NegotiationSearch opts={opts} setOpts={setOpts} selectedBank={{ chb, setChb: setChbGlobal }} />
      <NegotiationTable opts={opts} setOpts={setOpts} selectedBank={{ chb, setChb: setChbGlobal }} />
    </Container>
  )
}

export default DashboardNegotiations
