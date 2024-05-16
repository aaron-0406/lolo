import { useMutation, useQueryClient } from 'react-query'
import { AxiosError, AxiosResponse } from 'axios'
import notification from '@/ui/notification'
import Modal from '@/ui/Modal'
import Container from '@/ui/Container'
import Button from '@/ui/Button'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { useLoloContext } from '@/contexts/LoloProvider'
import { deleteProcessReason } from '@/services/judicial/judicial-process-reason.service'
import judicialProcessReasonCache from '../../ProcessReasonTable/utils/judicial-process-reason.cache'

type DeleteProcessReasonModalProps = {
  visible: boolean
  onClose: () => void
  idProcessReason?: number
}

const DeleteProcessReasonModal = ({ visible, idProcessReason = 0, onClose }: DeleteProcessReasonModalProps) => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const queryClient = useQueryClient()

  const {
    actions: { deleteProcessReasonCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = judicialProcessReasonCache(queryClient)

  const { isLoading: loadingDeleteProcessReason, mutate: deleteProcessReasonMutate } = useMutation<
    AxiosResponse<{ id: string }>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      return await deleteProcessReason(idProcessReason)
    },
    {
      onSuccess: (result) => {
        deleteProcessReasonCache(result.data.id, parseInt(chb))
        notification({ type: 'success', message: 'Motivo del proceso eliminado' })
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
    if (idProcessReason !== 0) {
      deleteProcessReasonMutate()
    }
  }

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      id="modal-delete"
      title="¿Desea eliminar esta Motivo?"
      contentOverflowY="auto"
      size="small"
      footer={
        <Container width="100%" justifyContent="space-around" display="flex" alignItems="center">
          <Button
            onClick={handleClickDelete}
            loading={loadingDeleteProcessReason}
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

export default DeleteProcessReasonModal
