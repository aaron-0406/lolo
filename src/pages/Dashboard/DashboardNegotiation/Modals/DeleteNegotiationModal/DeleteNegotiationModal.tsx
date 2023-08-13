import { useMutation, useQueryClient } from 'react-query'
import { AxiosResponse } from 'axios'
import dashNegotiationCache from '../../NegotiationTable/utils/dash-cobranza.cache'
import { deleteNegotiation } from '../../../../../shared/services/negotiation.service'
import notification from '../../../../../ui/notification'
import Modal from '../../../../../ui/Modal'
import Container from '../../../../../ui/Container'
import Button from '../../../../../ui/Button'

type DeleteNegotiationModalProps = {
  visible: boolean
  onClose: () => void
  idUser?: number
}

const DeleteNegotiationModal = ({ visible, idUser = 0, onClose }: DeleteNegotiationModalProps) => {
  const queryClient = useQueryClient()
  const {
    actions: { deleteNegotiationCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = dashNegotiationCache(queryClient)

  const { isLoading: loadingDeleteNegotiation, mutate: deleteNegotiationMutate } = useMutation<
    AxiosResponse<{ id: string }>,
    Error
  >(
    async () => {
      return await deleteNegotiation(idUser)
    },
    {
      onSuccess: (result) => {
        deleteNegotiationCache(result.data.id)
        notification({ type: 'success', message: 'Usuario eliminado' })
        onClose()
      },
      onMutate: () => {
        onMutateCache()
      },
      onSettled: () => {
        onSettledCache()
      },
      onError: (error: any, _, context: any) => {
        onErrorCache(context)
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )

  const handleClickDelete = () => {
    if (idUser !== 0) {
      deleteNegotiationMutate()
    }
  }

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      id="modal-delete"
      title="¿Desea eliminar esta negociación?"
      contentOverflowY="auto"
      size="small"
      footer={
        <Container width="100%" justifyContent="space-around" display="flex" alignItems="center">
          <Button
            onClick={handleClickDelete}
            loading={loadingDeleteNegotiation}
            display="danger"
            size="default"
            label="ACEPTAR"
          />
          <Button onClick={onClose} size="default" label="CANCELAR" />
        </Container>
      }
    />
  )
}

export default DeleteNegotiationModal
