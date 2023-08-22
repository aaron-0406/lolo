import Container from '../../../../../ui/Container/Container'
import Text from '../../../../../ui/Text'
import Button from '../../../../../ui/Button/Button'
import useModal from '../../../../../shared/hooks/useModal'
import CobranzaCommentsModal from '../Modals/CobranzaCommentsModal/CobranzaCommentsModal'
import { useParams } from 'react-router-dom'

type CobranzaCommentsInfoProps = {
  name?: string
  clientId?: number
}

const CobranzaCommentsInfo = ({ name, clientId }: CobranzaCommentsInfoProps) => {
  const { code } = useParams()

  const { visible: visibleModalAdd, showModal: showModalAdd, hideModal: hideModalAdd } = useModal()

  const onShowModal = () => {
    showModalAdd()
  }
  const onCloseModal = () => {
    hideModalAdd()
  }

  return (
    <Container
      width="100%"
      display="flex"
      flexDirection="row"
      gap="20px"
      justifyContent="space-between"
      padding="0 20px"
    >
      <Container width="80%" display="flex" flexDirection="row" gap="20px" alignItems="center">
        <Text.Body size="l" weight="bold">
          {code}
        </Text.Body>
        <Text.Body size="l" weight="bold">
          /
        </Text.Body>
        <Text.Body size="l" weight="regular" color="Primary5" ellipsis>
          {name ?? '-'}
        </Text.Body>
      </Container>

      <Container>
        <Button onClick={onShowModal} disabled={!name} width="100px" shape="round" trailingIcon="ri-add-fill" />

        {clientId && <CobranzaCommentsModal visible={visibleModalAdd} onClose={onCloseModal} clientId={clientId} />}
      </Container>
    </Container>
  )
}

export default CobranzaCommentsInfo
