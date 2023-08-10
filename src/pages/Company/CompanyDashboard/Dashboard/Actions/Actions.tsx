import { useMediaQuery } from '../../../../../shared/hooks/useMediaQuery'
import { device } from '../../../../../shared/breakpoints/reponsive'
import Button from '../../../../../ui/Button'
import Container from '../../../../../ui/Container'
import InputText from '../../../../../ui/inputs/InputText'

type propsActions = {
  setFilter: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleClick: () => void
  isLoading: boolean
  state: boolean
}

const Actions = ({ setFilter, handleClick, isLoading, state }: propsActions) => {
  const greaterThanDesktopS = useMediaQuery(device.desktopS)

  return (
    <Container
      display="flex"
      flexDirection={greaterThanDesktopS ? 'row' : 'column'}
      gap={greaterThanDesktopS ? '0px' : '10px'}
      width="100%"
      justifyContent="space-between"
      margin="0 0 10px 0"
    >
      <InputText
        placeholder="Buscar..."
        name="filter"
        onChange={(e) => {
          setFilter(e)
        }}
      />
      <Button
        display={state ? 'default' : 'danger'}
        trailingIcon={state ? 'ri-add-fill' : 'ri-close-line'}
        label={state ? 'Agregar Todos' : 'Eliminar Todos'}
        shape="default"
        disabled={isLoading}
        loading={isLoading}
        onClick={handleClick}
      />
    </Container>
  )
}

export default Actions
