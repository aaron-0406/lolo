import { useMutation, useQueryClient } from 'react-query'
import { AxiosError, AxiosResponse } from 'axios'
import notification from '@/ui/notification'
import Modal from '@/ui/Modal'
import Container from '@/ui/Container'
import Button from '@/ui/Button'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { useLoloContext } from '@/contexts/LoloProvider'
import judicialCourtCache from '../../CourtTable/utils/ext-court.cache'
import { deleteCourt } from '@/services/judicial/judicial-court.service'

type DeleteCourtModalProps = {
  visible: boolean
  onClose: () => void
  idNegociation?: number
}

const DeleteCourtModal = ({ visible, idNegociation = 0, onClose }: DeleteCourtModalProps) => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const queryClient = useQueryClient()

  const {
    actions: { deleteCourtCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = judicialCourtCache(queryClient)

  const { isLoading: loadingDeleteCourt, mutate: deleteCourtMutate } = useMutation<
    AxiosResponse<{ id: string }>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      return await deleteCourt(idNegociation)
    },
    {
      onSuccess: (result) => {
        deleteCourtCache(result.data.id, parseInt(chb))
        notification({ type: 'success', message: 'Juzgado eliminada' })
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
      deleteCourtMutate()
    }
  }

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      id="modal-delete"
      title="¿Desea eliminar este Juzgado?"
      contentOverflowY="auto"
      size="small"
      footer={
        <Container width="100%" justifyContent="space-around" display="flex" alignItems="center">
          <Button
            onClick={handleClickDelete}
            loading={loadingDeleteCourt}
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

export default DeleteCourtModal
