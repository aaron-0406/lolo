import useModal from '../../../../../shared/hooks/useModal'
import Button from '../../../../../ui/Button/Button'
import Container from '../../../../../ui/Container/Container'
import Text from '../../../../../ui/Text/Text'
import MetasModal from '../MetasModal/MetasModal'
import { useFormContext } from 'react-hook-form'
import { GoalFormType } from '../hookform.type'
import { useLoloContext } from '../../../../../shared/contexts/LoloProvider'
import moment from 'moment'

const MetasActions = () => {
  const {
    client: {
      customer: { id },
    },
  } = useLoloContext()
  const { setValue } = useFormContext<GoalFormType>()
  const { visible: visibleModalAdd, showModal: showModalAdd, hideModal: hideModalAdd } = useModal()
  const handleClickModal = () => {
    hideModalAdd()
  }
  const handleClickButton = () => {
    setValue('goal', {
      id: 0,
      createdAt: moment(new Date()).format('DD-MM-YYYY'),
      customerId: id,
      endDate: moment(new Date()).format('DD-MM-YYYY'),
      startDate: moment(new Date()).format('DD-MM-YYYY'),
      week: 0,
    })
    showModalAdd()
  }

  return (
    <Container justifyContent="space-between" alignItems="center" width="100%" display="flex" flexDirection="row">
      <Container>
        <Text.Body size="m" weight="bold" className="label__text">
          LISTA DE METAS
        </Text.Body>
      </Container>
      <Container>
        <Button onClick={handleClickButton} trailingIcon="ri-add-fill" shape="round" label=""></Button>
        <MetasModal visible={visibleModalAdd} onClose={handleClickModal} />
      </Container>
    </Container>
  )
}

export default MetasActions
