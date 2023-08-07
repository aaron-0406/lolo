import { useMutation } from 'react-query'
import Container from '../../../../../ui/Container'
import Modal from '../../../../../ui/Modal'
import notification from '../../../../../ui/notification'
import Button from '../../../../../ui/Button'
import { deleteManagementAction } from '../../../../../shared/services/management-action.service'

type DeleteActionsModalProps = {
  visible: boolean
  onClose: () => void
  isEdit?: boolean
  setLoadingGlobal: (state: boolean) => void
  idAction?: number
}

const DeleteActionsModal = ({ visible, idAction = 0, onClose, setLoadingGlobal }: DeleteActionsModalProps) => {
  const { isLoading: loadingDeleteAction, mutate: deleteActionMutate } = useMutation<any, Error>(
    async () => {
      return await deleteManagementAction(idAction)
    },
    {
      onSuccess: () => {
        notification({ type: 'success', message: 'Acción eliminada' })
        setLoadingGlobal(true)
        onClose()
      },
      onError: (error: any) => {
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )

  const deleteActions = () => {
    if (idAction !== 0) {
      deleteActionMutate()
    }
  }

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      id="modal-delete"
      title="¿Desea eliminar la acción?"
      contentOverflowY="auto"
      size="small"
      footer={
        <Container width="100%" justifyContent="space-around" display="flex" alignItems="center">
          {
            <Button
              onClick={deleteActions}
              loading={loadingDeleteAction}
              display="danger"
              size="default"
              label="ACEPTAR"
            />
          }
          {<Button onClick={onClose} size="default" label="CANCELAR" />}
        </Container>
      }
    ></Modal>
  )
}

export default DeleteActionsModal
