import { useMutation, useQueryClient } from 'react-query'
import companyProductsCache from '../../CobranzaProductsTable/utils/company-products.cache'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { AxiosError } from 'axios'
import { deleteProduct } from '@/services/extrajudicial/product.service'
import notification from '@/ui/notification'
import Modal from '@/ui/Modal'
import Container from '@/ui/Container'
import Button from '@/ui/Button'

type DeleteCobranzaProductsModalProps = {
  visible: boolean
  onClose: () => void
  idProduct?: number
  clientId?: number
}

const DeleteCobranzaProductsModal = ({
  visible,
  onClose,
  idProduct = 0,
  clientId = 0,
}: DeleteCobranzaProductsModalProps) => {
  const queryClient = useQueryClient()

  const {
    actions: { deleteCobranzaProductCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = companyProductsCache(queryClient)

  const { isLoading: loadingDeleteProduct, mutate: deleteProductMutate } = useMutation<
    any,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      return await deleteProduct(idProduct)
    },
    {
      onSuccess: () => {
        deleteCobranzaProductCache(idProduct, clientId)
        notification({ type: 'success', message: 'Producto eliminado' })
        onClose()
      },
      onMutate: () => {
        return onMutateCache(clientId)
      },
      onSettled: () => {
        onSettledCache(clientId)
      },
      onError: (error, _, context: any) => {
        onErrorCache(context, clientId)
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )

  const deleteProducts = () => {
    if (idProduct !== 0) {
      deleteProductMutate()
    }
  }

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      id="modal-delete"
      title="¿Desea eliminar el producto?"
      contentOverflowY="auto"
      size="small"
      footer={
        <Container width="100%" justifyContent="space-around" display="flex" alignItems="center">
          {
            <Button
              onClick={deleteProducts}
              loading={loadingDeleteProduct}
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

export default DeleteCobranzaProductsModal
