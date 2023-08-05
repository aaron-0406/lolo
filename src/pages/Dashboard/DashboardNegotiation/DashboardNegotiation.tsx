import { useState } from 'react'
import NegotiationTable from './NegotiationTable'
import Container from '../../../ui/Container'
import { Opts } from '../../../ui/Pagination/interfaces'

const DashboardNegotiation = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [opts, setOpts] = useState<Opts>({ filter: '', limit: 50, page: 1 })

  const setLoadingGlobal = (state: boolean) => {
    setLoading(state)
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
      <NegotiationTable opts={opts} setOpts={setOpts} loading={loading} setLoadingGlobal={setLoadingGlobal} />
    </Container>
  )
}

export default DashboardNegotiation
