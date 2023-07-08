import useModal from '../../../../shared/hooks/useModal'
import Button from '../../../../ui/Button/Button'
import Container from '../../../../ui/Container/Container'
import Text from '../../../../ui/Text/Text'
import CompanyMetasModal from '../CompanyMetasModal/CompanyMetasModal'
import { useFormContext } from 'react-hook-form'
import { GoalFormType } from '../hookform.type'
import { useLoloContext } from '../../../../shared/contexts/LoloProvider'

const CompanyMetasActions = () => {
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
      createdAt: new Date(),
      customerId: id,
      endDate: new Date(),
      startDate: new Date(),
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
        <CompanyMetasModal visible={visibleModalAdd} onClose={handleClickModal} />
      </Container>
    </Container>
  )
}

export default CompanyMetasActions
