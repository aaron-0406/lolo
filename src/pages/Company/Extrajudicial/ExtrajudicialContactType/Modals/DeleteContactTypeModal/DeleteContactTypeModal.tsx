import { AxiosError, AxiosResponse } from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import Container from '@/ui/Container'
import Modal from '@/ui/Modal'
import notification from '@/ui/notification'
import Button from '@/ui/Button'
import { deleteContactType } from '@/services/extrajudicial/ext-contact-type.service'
import extContactTypeCache from '../../ContactTypeTable/utils/ext-contact-type.cache'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { useLoloContext } from '@/contexts/LoloProvider'

type DeleteContactTypeModalProps = {
  visible: boolean
  onClose: () => void
  idContactType?: number
}

const DeleteContactTypeModal = ({ visible, idContactType = 0, onClose }: DeleteContactTypeModalProps) => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const chbNumber = parseInt(chb.length ? chb : '0')

  const queryClient = useQueryClient()

  const {
    actions: { deleteContactTypeCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = extContactTypeCache(queryClient)

  const { isLoading: loadingDeleteContactType, mutate: deleteContactTypeMutate } = useMutation<
    AxiosResponse<{ id: string }>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      return await deleteContactType(idContactType)
    },
    {
      onSuccess: () => {
        deleteContactTypeCache(String(idContactType), chbNumber)
        notification({ type: 'success', message: 'Tipo de contacto eliminado' })
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
  const handleDeleteContactType = () => {
    if (idContactType !== 0) {
      deleteContactTypeMutate()
    }
  }

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      id="modal-delete"
      title="¿Desea eliminar el tipo de contacto?"
      contentOverflowY="auto"
      size="small"
      footer={
        <Container width="100%" justifyContent="space-around" display="flex" alignItems="center">
          {
            <Button
              onClick={handleDeleteContactType}
              loading={loadingDeleteContactType}
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

export default DeleteContactTypeModal
