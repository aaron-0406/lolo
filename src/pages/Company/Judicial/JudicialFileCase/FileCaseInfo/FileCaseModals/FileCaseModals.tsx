import Button from '@/ui/Button'
import Container from '@/ui/Container'

const FileCaseModals = () => {
  return (
    <Container width="100%" height="48px" display="flex" alignItems="center" gap="10px">
      <Button label="Bitacora" />
      <Button label="Garantías" />
      <Button label="Procesos Conexos" />
      <Button label="Observaciones" />
      <Button label="Estatus Procesal" />
      <Button label="Productos Demandados" />
    </Container>
  )
}

export default FileCaseModals
