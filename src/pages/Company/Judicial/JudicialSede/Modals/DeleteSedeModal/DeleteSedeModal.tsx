import { AxiosError, AxiosResponse } from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import Container from '@/ui/Container'
import Modal from '@/ui/Modal'
import notification from '@/ui/notification'
import Button from '@/ui/Button'
import { deleteSede } from '@/services/judicial/judicial-sede.service'
import judicialSedeCache from '../../SedeTable/utils/judicial-sede.cache'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { useLoloContext } from '@/contexts/LoloProvider'

type DeleteSedeModalProps = {
  visible: boolean
  onClose: () => void
  idSede?: number
}

const DeleteSedeModal = ({ visible, idSede = 0, onClose }: DeleteSedeModalProps) => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const chbNumber = parseInt(chb.length ? chb : '0')

  const queryClient = useQueryClient()

  const {
    actions: { deleteSedeCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = judicialSedeCache(queryClient)

  const { isLoading: loadingDeleteSede, mutate: deleteSedeMutate } = useMutation<
    AxiosResponse<{ id: string }>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      return await deleteSede(idSede)
    },
    {
      onSuccess: () => {
        deleteSedeCache(String(idSede), chbNumber)
        notification({ type: 'success', message: 'Sede judicial eliminada' })
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
  const handleDeleteSede = () => {
    if (idSede !== 0) {
      deleteSedeMutate()
    }
  }

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      id="modal-delete"
      title="¿Desea eliminar la Sede Judicial?"
      contentOverflowY="auto"
      size="small"
      footer={
        <Container width="100%" justifyContent="space-around" display="flex" alignItems="center">
          {
            <Button
              onClick={handleDeleteSede}
              loading={loadingDeleteSede}
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

export default DeleteSedeModal
