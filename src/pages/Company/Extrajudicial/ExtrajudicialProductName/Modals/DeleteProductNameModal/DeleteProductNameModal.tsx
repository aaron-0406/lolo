import { AxiosError, AxiosResponse } from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import Container from '@/ui/Container'
import Modal from '@/ui/Modal'
import notification from '@/ui/notification'
import Button from '@/ui/Button'
import { deleteProductName } from '@/services/extrajudicial/ext-product-name.service'
import extProductNameCache from '../../ProductNameTable/utils/ext-product-name.cache'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { useLoloContext } from '@/contexts/LoloProvider'

type DeleteProductNameModalProps = {
  visible: boolean
  onClose: () => void
  idProductName?: number
}

const DeleteProductNameModal = ({ visible, idProductName = 0, onClose }: DeleteProductNameModalProps) => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const chbNumber = parseInt(chb.length ? chb : '0')

  const queryClient = useQueryClient()

  const {
    actions: { deleteProductNameCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = extProductNameCache(queryClient)

  const { isLoading: loadingDeleteProductName, mutate: deleteProductNameMutate } = useMutation<
    AxiosResponse<{ id: string }>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      return await deleteProductName(idProductName)
    },
    {
      onSuccess: () => {
        deleteProductNameCache(String(idProductName), chbNumber)
        notification({ type: 'success', message: 'Nombre de producto eliminado' })
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
  const handleDeleteProductName = () => {
    if (idProductName !== 0) {
      deleteProductNameMutate()
    }
  }

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      id="modal-delete"
      title="¿Desea eliminar el nombre de producto?"
      contentOverflowY="auto"
      size="small"
      footer={
        <Container width="100%" justifyContent="space-around" display="flex" alignItems="center">
          {
            <Button
              onClick={handleDeleteProductName}
              loading={loadingDeleteProductName}
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

export default DeleteProductNameModal
