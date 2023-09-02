import Button from '@/ui/Button'
import Container from '@/ui/Container'

const FileCaseModals = () => {
  return (
    <Container width="100%" height="100%" display="flex" flexDirection="row" gap="10px">
      <Button width="215px" label="Bitacora" />
      <Button width="215px" label="Garantías" />
      <Button width="215px" label="Procesos Conexos" />
      <Button width="215px" label="Observaciones" />
      <Button width="215px" label="Estatus Procesal" />
      <Button width="215px" label="Productos Demandados" />
    </Container>
  )
}

export default FileCaseModals
