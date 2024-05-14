import Container from '@/ui/Container/Container'
import Button from '@/ui/Button'
import useModal from '@/hooks/useModal'
import ModalManagement from './Modal/ModalManagement'
import { ClientType } from '@/types/extrajudicial/client.type'
import Text from '@/ui/Text'
import { JudicialCaseFileType } from '@/types/judicial/judicial-case-file.type'
import { useFormContext } from 'react-hook-form'
import { useLoloContext } from '@/contexts/LoloProvider'
import { useNavigate } from 'react-router-dom'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { device } from '@/breakpoints/responsive'
import paths from 'shared/routes/paths'

type FileCaseOwnerProps = {
  setOwnerFileCase: (value: (ClientType & { customerUser: { id: number; name: string } }) | undefined) => void
  ownerFileCase?: ClientType & { customerUser: { id: number; name: string } }
}
const FileCaseOwner = ({ ownerFileCase, setOwnerFileCase }: FileCaseOwnerProps) => {
  const { setValue, getValues } = useFormContext<JudicialCaseFileType>()
  const greaterThanDesktopS = useMediaQuery(device.desktopS)
  const greaterThanTabletS = useMediaQuery(device.tabletS)
  const navigate = useNavigate()
  const { visible: visibleModalClients, showModal: showModalClients, hideModal: hideModalClients } = useModal()

  const clearClient = () => {
    setOwnerFileCase(undefined)
    setValue('clientId', 0)
  }

  const {
    client: {
      customer: { urlIdentifier },
    },
  } = useLoloContext()

  const clientId = getValues('id')

  const onClickComment = () => {
    navigate(`${paths.cobranza.cobranzaComments(urlIdentifier, ownerFileCase?.code)}`)
  }

  const onClickContact = () => {
    navigate(`${paths.cobranza.cobranzaContacts(urlIdentifier, ownerFileCase?.code)}`)
  }

  return (
    <Container
      width="100%"
      height="100%"
      display="flex"
      justifyContent="space-between"
      flexDirection={greaterThanTabletS ? 'row' : 'column'}
      alignItems={greaterThanDesktopS ? 'start' : 'center'}
      padding={greaterThanDesktopS ? '20px 40px' : '5px 10px'}
    >
      <Container display="flex" width="100%" gap="10px" alignItems="center" justifyContent="start">
        <Button
          width={ownerFileCase ? undefined : '200px'}
          label={ownerFileCase ? undefined : 'Buscar Cliente'}
          shape={ownerFileCase ? 'round' : undefined}
          hierarchy="tertiary"
          display={ownerFileCase ? 'warning' : 'default'}
          trailingIcon={ownerFileCase ? 'ri-delete-bin-line' : 'ri-search-line'}
          onClick={ownerFileCase ? clearClient : showModalClients}
          messageTooltip="Buscar cliente por Código o por Nombre"
        />

        <Container display="flex" flexDirection="column" gap="10px">
          <Container display="flex" gap="10px">
            <Text.Body size={greaterThanTabletS ? 'm' : 's'} weight="bold" color="Primary5">
              CLIENTE:
            </Text.Body>
            <Text.Body size={greaterThanTabletS ? 'm' : 's'} weight="regular">
              {ownerFileCase?.name ?? '-'}
            </Text.Body>
          </Container>
          <Container display="flex" gap="10px">
            <Text.Body size={greaterThanTabletS ? 'm' : 's'} weight="bold" color="Primary5">
              GESTOR:
            </Text.Body>
            <Text.Body size={greaterThanTabletS ? 'm' : 's'} weight="regular">
              {ownerFileCase?.customerUser?.name ?? '-'}
            </Text.Body>
          </Container>
        </Container>
      </Container>

      <Container position="relative" display="flex" width="100%" gap="10px" justifyContent="end" alignItems="end">
        <Container>
          <Button
            trailingIcon="ri-discuss-line"
            width="170px"
            size={greaterThanTabletS ? 'default' : 'small'}
            label={greaterThanDesktopS && 'Comentarios'}
            shape={greaterThanDesktopS ? 'default' : 'round'}
            disabled={!clientId}
            onClick={onClickComment}
            permission="P02-02-01"
          />
        </Container>

        <Container>
          <Button
            trailingIcon="ri-customer-service-2-line"
            width="150px"
            size={greaterThanTabletS ? 'default' : 'small'}
            label={greaterThanDesktopS && 'Contactos'}
            shape={greaterThanDesktopS ? 'default' : 'round'}
            disabled={!clientId}
            onClick={onClickContact}
            permission="P02-02-07"
          />
        </Container>
      </Container>

      <ModalManagement visible={visibleModalClients} onClose={hideModalClients} setOwnerFileCase={setOwnerFileCase} />
    </Container>
  )
}

export default FileCaseOwner
