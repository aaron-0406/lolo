import { AxiosError, AxiosResponse } from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import Container from '@/ui/Container'
import Modal from '@/ui/Modal'
import notification from '@/ui/notification'
import Button from '@/ui/Button'
import judicialNotaryCache from '../../JudicialNotaryTable/utils/judicial-notary.cache'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { useLoloContext } from '@/contexts/LoloProvider'
import { deleteJudicialNotary } from '@/services/judicial/judicial-notary.service'

type DeleteNotaryModalProps = {
  isOpen: boolean
  onClose: () => void
  id?: number
}

const DeleteNotaryModal = ({ isOpen, id = 0, onClose }: DeleteNotaryModalProps) => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const chbNumber = parseInt(chb.length ? chb : '0')

  const queryClient = useQueryClient()

  const {
    actions: { deleteNotaryCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = judicialNotaryCache(queryClient)

  const { isLoading: loadingDeleteNotary, mutate: deleteNotaryMutate } = useMutation<
    AxiosResponse<{ id: string }>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      return await deleteJudicialNotary(id)
    },
    {
      onSuccess: () => {
        deleteNotaryCache(String(id), chbNumber)
        notification({ type: 'success', message: 'Notaria eliminada' })
        onClose()
      },
      onMutate: () => {
        return onMutateCache(chbNumber)
      },
      onSettled: () => {
        onSettledCache(chbNumber)
      },
      onError: (error, _, context: any) => {
        onErrorCache(context, chbNumber)
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )
  const handleDeleteNotary = () => {
    if (id !== 0) {
      deleteNotaryMutate()
    }
  }

  return (
    <Modal
      visible={isOpen}
      onClose={onClose}
      id="modal-delete"
      title="¿Desea eliminar la notaria?"
      contentOverflowY="auto"
      size="small"
      footer={
        <Container width="100%" justifyContent="space-around" display="flex" alignItems="center">
          {
            <Button
              onClick={handleDeleteNotary}
              loading={loadingDeleteNotary}
              display="danger"
              size="default"
              label="ACEPTAR"
              permission='P41-03'
            />
          }
          {<Button onClick={onClose} size="default" label="CANCELAR" />}
        </Container>
      }
    ></Modal>
  )
}

export default DeleteNotaryModal
