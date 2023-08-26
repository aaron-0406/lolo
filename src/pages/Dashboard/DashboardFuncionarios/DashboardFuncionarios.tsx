import { useState } from 'react'
import { Opts } from '@/ui/Pagination/interfaces'
import Container from '@/ui/Container'
import FuncionariosSearch from './FuncionariosSearch/FuncionariosSearch'
import FuncionariosTable from './FuncionariosTable/FuncionariosTable'

const DashboardFuncionarios = () => {
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
      <FuncionariosSearch opts={opts} setOpts={setOpts} selectedBank={{ chb, setChb: setChbGlobal }} />
      <FuncionariosTable opts={opts} setOpts={setOpts} selectedBank={{ chb, setChb: setChbGlobal }} />
    </Container>
  )
}

export default DashboardFuncionarios
