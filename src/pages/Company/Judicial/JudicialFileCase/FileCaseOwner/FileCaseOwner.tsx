import Container from '@/ui/Container/Container'
import Button from '@/ui/Button'
import useModal from '@/hooks/useModal'
import ModalManagement from './Modal/ModalManagement'
import { ClientType } from '@/types/extrajudicial/client.type'
import Text from '@/ui/Text'
import { JudicialCaseFileType } from '@/types/judicial/judicial-case-file.type'
import { useFormContext } from 'react-hook-form'

type FileCaseOwnerProps = {
  setOwnerFileCase: (value: (ClientType & { customerUser: { id: number; name: string } }) | undefined) => void
  ownerFileCase?: ClientType & { customerUser: { id: number; name: string } }
}

const FileCaseOwner = ({ ownerFileCase, setOwnerFileCase }: FileCaseOwnerProps) => {
  const { setValue } = useFormContext<JudicialCaseFileType>()

  const { visible: visibleModalClients, showModal: showModalClients, hideModal: hideModalClients } = useModal()

  const clearClient = () => {
    setOwnerFileCase(undefined)
    setValue('clientId', 0)
  }

  return (
    <Container
      width="100%"
      height="100%"
      display="flex"
      flexDirection="row"
      alignItems="center"
      padding="20px 40px"
      gap="20px"
    >
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
          <Text.Body size="m" weight="bold" color="Primary5">
            CLIENTE:
          </Text.Body>
          <Text.Body size="m" weight="regular">
            {ownerFileCase?.name ?? '-'}
          </Text.Body>
        </Container>
        <Container display="flex" gap="10px">
          <Text.Body size="m" weight="bold" color="Primary5">
            GESTOR:
          </Text.Body>
          <Text.Body size="m" weight="regular">
            {ownerFileCase?.customerUser?.name ?? '-'}
          </Text.Body>
        </Container>
      </Container>

      <ModalManagement visible={visibleModalClients} onClose={hideModalClients} setOwnerFileCase={setOwnerFileCase} />
    </Container>
  )
}

export default FileCaseOwner
