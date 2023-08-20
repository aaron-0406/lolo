import { useMutation, useQueryClient } from 'react-query'
import { AxiosResponse } from 'axios'
import dashNegotiationCache from '../../NegotiationTable/utils/dash-negociaciones.cache'
import { deleteNegotiation } from '../../../../../shared/services/dash/negotiation.service'
import notification from '../../../../../ui/notification'
import Modal from '../../../../../ui/Modal'
import Container from '../../../../../ui/Container'
import Button from '../../../../../ui/Button'

type DeleteNegotiationModalProps = {
  visible: boolean
  onClose: () => void
  idNegociation?: number
  chb: number
}

const DeleteNegotiationModal = ({ visible, idNegociation = 0, onClose, chb }: DeleteNegotiationModalProps) => {
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
      return await deleteNegotiation(idNegociation)
    },
    {
      onSuccess: (result) => {
        deleteNegotiationCache(result.data.id, chb)
        notification({ type: 'success', message: 'Usuario eliminado' })
        onClose()
      },
      onMutate: () => {
        onMutateCache(chb)
      },
      onSettled: () => {
        onSettledCache(chb)
      },
      onError: (error: any, _, context: any) => {
        onErrorCache(context, chb)
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )

  const handleClickDelete = () => {
    if (idNegociation !== 0) {
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
