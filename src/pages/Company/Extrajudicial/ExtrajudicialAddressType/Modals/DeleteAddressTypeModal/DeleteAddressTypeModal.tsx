import { AxiosError, AxiosResponse } from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import Container from '@/ui/Container'
import Modal from '@/ui/Modal'
import notification from '@/ui/notification'
import Button from '@/ui/Button'
import { deleteAddressType } from '@/services/extrajudicial/ext-address-type.service'
import extAddressTypeCache from '../../AddressTypeTable/utils/ext-address-type.cache'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { useLoloContext } from '@/contexts/LoloProvider'

type DeleteAddressTypeModalProps = {
  visible: boolean
  onClose: () => void
  idAddressType?: number
}

const DeleteAddressTypeModal = ({ visible, idAddressType = 0, onClose }: DeleteAddressTypeModalProps) => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const chbNumber = parseInt(chb.length ? chb : '0')

  const queryClient = useQueryClient()

  const {
    actions: { deleteAddressTypeCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = extAddressTypeCache(queryClient)

  const { isLoading: loadingDeleteAddressType, mutate: deleteAddressTypeMutate } = useMutation<
    AxiosResponse<{ id: string }>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      return await deleteAddressType(idAddressType, chbNumber)
    },
    {
      onSuccess: () => {
        deleteAddressTypeCache(String(idAddressType), chbNumber)
        notification({ type: 'success', message: 'Tipo de dirección eliminada' })
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
  const deleteAddressesType = () => {
    if (idAddressType !== 0) {
      deleteAddressTypeMutate()
    }
  }

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      id="modal-delete"
      title="¿Desea eliminar el tipo de dirección?"
      contentOverflowY="auto"
      size="small"
      footer={
        <Container width="100%" justifyContent="space-around" display="flex" alignItems="center">
          {
            <Button
              onClick={deleteAddressesType}
              loading={loadingDeleteAddressType}
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

export default DeleteAddressTypeModal
