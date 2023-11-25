import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import Container from '@/ui/Container'
import Modal from '@/ui/Modal'
import notification from '@/ui/notification'
import Button from '@/ui/Button'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { GoalApiResponse, deleteGoalService } from '@/services/extrajudicial/goal.service'
import { GoalFormType } from '../../hookform.type'
import { useFormContext } from 'react-hook-form'

type DeleteMetaModalProps = {
  visible: boolean
  onClose: () => void
}

const DeleteMetaModal = ({ visible, onClose }: DeleteMetaModalProps) => {
  const { watch, setValue } = useFormContext<GoalFormType>()

  const { isLoading: loadingDeleteGoal, mutate: deleteGoal } = useMutation<
    GoalApiResponse,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const {
        goal: { id },
      } = watch()
      return await deleteGoalService(id)
    },
    {
      onSuccess: ({ data }) => {
        setValue(
          'goals',
          watch('goals').filter((goal) => {
            return goal.id !== data.id
          })
        )
        notification({ type: 'success', message: 'Meta eliminada' })
        onClose()
      },
      onError: (error) => {
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )

  const onDeleteGoal = () => {
    deleteGoal()
  }

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      id="modal-delete"
      title="Desea eliminar la meta?"
      contentOverflowY="auto"
      size="small"
      footer={
        <Container width="100%" justifyContent="space-around" display="flex" alignItems="center">
          {
            <Button
              onClick={onDeleteGoal}
              loading={loadingDeleteGoal}
              display="danger"
              size="default"
              label="ACEPTAR"
            />
          }
          {<Button onClick={onClose} size="default" label="CANCELAR" />}
        </Container>
      }
    />
  )
}

export default DeleteMetaModal
