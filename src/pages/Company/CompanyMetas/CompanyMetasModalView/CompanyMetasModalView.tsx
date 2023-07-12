import Container from '../../../../ui/Container/Container'
import Modal from '../../../../ui/Modal/Modal'

type PModalAddGoal = {
  visible: boolean
  onClose: () => void
}

const CompanyMetasModalView = ({ onClose, visible }: PModalAddGoal) => {
  const handleClickCloseModal = () => {
    onClose()
  }
  return (
    <Modal
      visible={visible}
      onClose={handleClickCloseModal}
      id="modal-goal-view"
      title={'Meta'}
      contentOverflowY="auto"
    >
      <Container
        width="100%"
        height="100%"
        display="flex"
        justifyContent="space-around"
        flexDirection="column"
        alignItems="center"
        padding="20px"
        gap="20px"
      >
        <Container width="100%" display="flex" flexDirection="column" gap="25px">
          {/* <Controller
            name="goal.week"
            control={control}
            render={({ field }) => (
              <TextField
                width="100%"
                label="Cantidad de Semanas"
                required
                value={field.value}
                helperText={errors.goal?.week?.message ? errors.goal?.week.message : ''}
                hasError={!!errors.goal?.week}
                onChange={field.onChange}
              />
            )}
          /> */}
        </Container>
        {/* <StyledContainerButton
          width="100%"
          height="75px"
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          gap="20px"
        >
        </StyledContainerButton> */}
      </Container>
    </Modal>
  )
}

export default CompanyMetasModalView
