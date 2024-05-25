import { useState } from 'react'
import { Opts } from '@/ui/Pagination/interfaces'
import Container from '@/ui/Container'
import FuncionariosSearch from './FuncionariosSearch/FuncionariosSearch'
import FuncionariosTable from './FuncionariosTable/FuncionariosTable'

const ExtrajudicialFuncionarios = () => {
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
      <FuncionariosSearch opts={opts} setOpts={setOpts} />
      <FuncionariosTable opts={opts} setOpts={setOpts} />
    </Container>
  )
}

export default ExtrajudicialFuncionarios
