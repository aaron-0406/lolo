import { useMutation, useQueryClient } from 'react-query'
import judicialDemandedProductsCache from '../../FileCaseDemandedProductsTable/utils/file-case-demanded-products.cache'
import { AxiosError } from 'axios'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { removeCaseFileOfTheProduct } from '@/services/extrajudicial/product.service'
import notification from '@/ui/notification'
import Modal from '@/ui/Modal'
import Container from '@/ui/Container'
import Button from '@/ui/Button'

type RemoveDemandedProductModalProps = {
  visible: boolean
  onClose: () => void
  idProduct?: number
  judicialCaseFileId?: number
}

const RemoveDemandedProductModal = ({
  visible,
  onClose,
  idProduct = 0,
  judicialCaseFileId = 0,
}: RemoveDemandedProductModalProps) => {
  const queryClient = useQueryClient()

  const {
    actions: { removeProductOfTheCaseFileCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = judicialDemandedProductsCache(queryClient)

  const { isLoading: loadingRemoveProduct, mutate: removeProductMutate } = useMutation<
    any,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      return await removeCaseFileOfTheProduct({ productRemovedId: idProduct, judicialCaseFileId })
    },
    {
      onSuccess: () => {
        removeProductOfTheCaseFileCache(idProduct, judicialCaseFileId)
        notification({ type: 'success', message: 'Producto demandado removido del expediente' })
        onClose()
      },
      onMutate: () => {
        return onMutateCache(judicialCaseFileId)
      },
      onSettled: () => {
        onSettledCache(judicialCaseFileId)
      },
      onError: (error, _, context: any) => {
        onErrorCache(context, judicialCaseFileId)
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )

  const removeProduct = () => {
    if (idProduct !== 0) {
      removeProductMutate()
    }
  }

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      id="modal-delete"
      title="¿Desea remover el producto demandado?"
      contentOverflowY="auto"
      size="small"
      footer={
        <Container width="100%" justifyContent="space-around" display="flex" alignItems="center">
          {
            <Button
              onClick={removeProduct}
              loading={loadingRemoveProduct}
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

export default RemoveDemandedProductModal
