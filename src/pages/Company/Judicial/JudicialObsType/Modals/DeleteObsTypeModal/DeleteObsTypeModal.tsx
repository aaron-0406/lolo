import { AxiosError, AxiosResponse } from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import Container from '@/ui/Container'
import Modal from '@/ui/Modal'
import notification from '@/ui/notification'
import Button from '@/ui/Button'
import { deleteObsType } from '@/services/judicial/judicial-obs-type.service'
import judicialObsTypeCache from '../../ObsTypeTable/utils/judicial-obs-type.cache'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { useLoloContext } from '@/contexts/LoloProvider'

type DeleteObsTypeModalProps = {
  visible: boolean
  onClose: () => void
  idObsType?: number
}

const DeleteObsTypeModal = ({ visible, idObsType = 0, onClose }: DeleteObsTypeModalProps) => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const chbNumber = parseInt(chb.length ? chb : '0')

  const queryClient = useQueryClient()

  const {
    actions: { deleteObsTypeCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = judicialObsTypeCache(queryClient)

  const { isLoading: loadingDeleteObsType, mutate: deleteObsTypeMutate } = useMutation<
    AxiosResponse<{ id: string }>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      return await deleteObsType(idObsType)
    },
    {
      onSuccess: () => {
        deleteObsTypeCache(String(idObsType), chbNumber)
        notification({ type: 'success', message: 'Tipo de observación eliminado' })
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
  const handleDeleteObsType = () => {
    if (idObsType !== 0) {
      deleteObsTypeMutate()
    }
  }

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      id="modal-delete"
      title="¿Desea eliminar el tipo de observación?"
      contentOverflowY="auto"
      size="small"
      footer={
        <Container width="100%" justifyContent="space-around" display="flex" alignItems="center">
          {
            <Button
              onClick={handleDeleteObsType}
              loading={loadingDeleteObsType}
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

export default DeleteObsTypeModal
