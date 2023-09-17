import { useMutation, useQueryClient } from 'react-query'
import { AxiosError, AxiosResponse } from 'axios'
import extNegotiationCache from '../../NegotiationTable/utils/ext-negociaciones.cache'
import { deleteNegotiation } from '@/services/extrajudicial/negotiation.service'
import notification from '@/ui/notification'
import Modal from '@/ui/Modal'
import Container from '@/ui/Container'
import Button from '@/ui/Button'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { useLoloContext } from '@/contexts/LoloProvider'

type DeleteNegotiationModalProps = {
  visible: boolean
  onClose: () => void
  idNegociation?: number
}

const DeleteNegotiationModal = ({ visible, idNegociation = 0, onClose }: DeleteNegotiationModalProps) => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const queryClient = useQueryClient()

  const {
    actions: { deleteNegotiationCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = extNegotiationCache(queryClient)

  const { isLoading: loadingDeleteNegotiation, mutate: deleteNegotiationMutate } = useMutation<
    AxiosResponse<{ id: string }>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      return await deleteNegotiation(idNegociation)
    },
    {
      onSuccess: (result) => {
        deleteNegotiationCache(result.data.id, parseInt(chb))
        notification({ type: 'success', message: 'Usuario eliminado' })
        onClose()
      },
      onMutate: () => {
        return onMutateCache(parseInt(chb))
      },
      onSettled: () => {
        onSettledCache(parseInt(chb))
      },
      onError: (error, _, context: any) => {
        onErrorCache(context, parseInt(chb))
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
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
