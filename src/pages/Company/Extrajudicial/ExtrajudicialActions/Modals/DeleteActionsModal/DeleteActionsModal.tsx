import { useMutation, useQueryClient } from 'react-query'
import Container from '@/ui/Container'
import Modal from '@/ui/Modal'
import notification from '@/ui/notification'
import Button from '@/ui/Button'
import { deleteManagementAction } from '@/services/extrajudicial/management-action.service'
import extAccionesCache from '../../ActionsTable/utils/ext-acciones.cache'
import { useLoloContext } from '@/contexts/LoloProvider'

type DeleteActionsModalProps = {
  visible: boolean
  onClose: () => void
  isEdit?: boolean
  idAction?: number
}

const DeleteActionsModal = ({ visible, idAction = 0, onClose }: DeleteActionsModalProps) => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const queryClient = useQueryClient()

  const {
    actions: { deleteActionCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = extAccionesCache(queryClient)

  const { isLoading: loadingDeleteAction, mutate: deleteActionMutate } = useMutation<any, Error>(
    async () => {
      return await deleteManagementAction(idAction)
    },
    {
      onSuccess: () => {
        deleteActionCache(String(idAction), parseInt(chb))
        notification({ type: 'success', message: 'Acción eliminada' })
        onClose()
      },
      onMutate: () => {
        return onMutateCache(parseInt(chb))
      },
      onSettled: () => {
        onSettledCache(parseInt(chb))
      },
      onError: (error: any, _, context: any) => {
        onErrorCache(context, parseInt(chb))
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
