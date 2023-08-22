import Container from '../../../../../ui/Container/Container'
import Text from '../../../../../ui/Text'
import { useQuery } from 'react-query'
import Button from '../../../../../ui/Button/Button'
import useModal from '../../../../../shared/hooks/useModal'
import CobranzaCommentsModal from '../Modals/CobranzaCommentsModal/CobranzaCommentsModal'
import { useParams } from 'react-router-dom'

type CobranzaCommentsInfoProps = {
  name?: string
}

const CobranzaCommentsInfo = ({ name }: CobranzaCommentsInfoProps) => {
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
      <Container display="flex" flexDirection="row" gap="20px" alignItems="center">
        <Text.Body size="l" weight="bold" ellipsis>
          {code}
        </Text.Body>
        <Text.Body size="l" weight="bold" ellipsis>
          /
        </Text.Body>
        <Text.Body size="l" weight="regular" color="Primary5" ellipsis>
          {name ?? '-'}
        </Text.Body>
      </Container>

      <Container>
        <Button onClick={onShowModal} disabled={!name} width="100px" shape="round" trailingIcon="ri-add-fill" />
        <CobranzaCommentsModal visible={visibleModalAdd} onClose={onCloseModal} />
      </Container>
    </Container>
  )
}

export default CobranzaCommentsInfo
