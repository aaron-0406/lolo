import { useForm, FormProvider } from 'react-hook-form'
import styled, { css } from 'styled-components'
import { device } from '../../../../shared/breakpoints/reponsive'
import { useMediaQuery } from '../../../../shared/hooks/useMediaQuery'
import Button from '../../../../ui/Button'
import Container from '../../../../ui/Container'
import Form from './Form'
import { DashFormType } from './hookform.type'
import TableClientsAdded from './TableClientsAdded'
import TableClientsDeleted from './TableClientsDeleted'
import TableProductsCastigo from './TableProductCastigo/TableProductsCastigo'
import TableProductsAdded from './TableProductsAdded'
import TableProductsDeleted from './TableProductsDeleted'

const Dashboard = () => {
  const formMethods = useForm<DashFormType>({
    defaultValues: {
      clientsAdded: [],
      clientsDeleted: [],
      productsAdded: [],
      productsCastigo: [],
      productsDeleted: [],
      selected: {
        clientAddedButton: true,
        clientDeletedButton: false,
        productAddedButton: false,
        productDeletedButton: false,
        productCastigoButton: false,
      },
    },
  })

  const { watch, setValue } = formMethods
  const greaterThanDesktopS = useMediaQuery(device.desktopS)

  const handleChangeTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    onResetTabs()
    setValue(e.currentTarget.dataset.name as any, true)
  }

  const onResetTabs = () => {
    setValue('selected', {
      clientAddedButton: false,
      clientDeletedButton: false,
      productAddedButton: false,
      productCastigoButton: false,
      productDeletedButton: false,
    })
  }

  return (
    <FormProvider {...formMethods}>
      <Container
        flexDirection="column"
        display="flex"
        gap="10px"
        padding="10px"
        width="100%"
        overFlowY="auto"
        height="100%"
      >
        <Form />
        <Container width="100%" display="flex" flexDirection={greaterThanDesktopS ? 'row' : 'column-reverse'}>
          <StyledButton
            onClick={handleChangeTab}
            data-name="selected.clientAddedButton"
            $selected={watch('selected.clientAddedButton')}
            label="Clientes Agregados"
          />
          <StyledButton
            onClick={handleChangeTab}
            data-name="selected.clientDeletedButton"
            $selected={watch('selected.clientDeletedButton')}
            label="Clientes Eliminados"
          />
          <StyledButton
            onClick={handleChangeTab}
            data-name="selected.productAddedButton"
            $selected={watch('selected.productAddedButton')}
            label="Productos Agregados"
          />
          <StyledButton
            onClick={handleChangeTab}
            data-name="selected.productDeletedButton"
            $selected={watch('selected.productDeletedButton')}
            label="Productos Eliminados"
          />
          <StyledButton
            onClick={handleChangeTab}
            data-name="selected.productCastigoButton"
            $selected={watch('selected.productCastigoButton')}
            label="Productos Castigo"
          />
        </Container>
        <Container width="100%" display="flex" flexDirection="column" gap="10px">
          {watch('selected.clientAddedButton') && <TableClientsAdded />}
          {watch('selected.clientDeletedButton') && <TableClientsDeleted />}
          {watch('selected.productAddedButton') && <TableProductsAdded />}
          {watch('selected.productDeletedButton') && <TableProductsDeleted />}
          {watch('selected.productCastigoButton') && <TableProductsCastigo />}
        </Container>
      </Container>
    </FormProvider>
  )
}

export default Dashboard

const StyledButton = styled(Button)<{ $selected: boolean }>`
  ${({ theme, $selected }) => css`
    border-radius: 0%;
    transition: all 500ms;
    width: 100%;
    background-color: ${$selected ? theme.colors.Primary5 : theme.colors.Neutral0};
    color: ${$selected ? '#fff' : theme.colors.Primary5};
  `}
`
