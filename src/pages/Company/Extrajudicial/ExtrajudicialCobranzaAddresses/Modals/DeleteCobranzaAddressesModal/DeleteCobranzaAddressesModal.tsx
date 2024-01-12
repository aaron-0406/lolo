import { useMutation, useQueryClient } from 'react-query'
import companyAddressesCache from '../../CobranzaAddressesTable/utils/company-addresses.cache'
import { AxiosError } from 'axios'
import { CustomErrorResponse } from 'types/customErrorResponse'
import notification from '@/ui/notification'
import { deleteDirection } from '@/services/extrajudicial/direction.service'
import Modal from '@/ui/Modal'
import Container from '@/ui/Container'
import Button from '@/ui/Button'

type DeleteCobranzaAddressesModalProps = {
  visible: boolean
  onClose: () => void
  idAddress?: number
  clientId?: number
}

const DeleteCobranzaAddressesModal = ({
  visible,
  onClose,
  idAddress = 0,
  clientId = 0,
}: DeleteCobranzaAddressesModalProps) => {
  const queryClient = useQueryClient()

  const {
    actions: { deleteCobranzaAddressCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = companyAddressesCache(queryClient)

  const { isLoading: loadingDeleteAddress, mutate: deleteAddressMutate } = useMutation<
    any,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      return await deleteDirection(idAddress)
    },
    {
      onSuccess: () => {
        deleteCobranzaAddressCache(idAddress, clientId)
        notification({ type: 'success', message: 'Dirección eliminada' })
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

  const deleteAddresses = () => {
    if (idAddress !== 0) {
      deleteAddressMutate()
    }
  }

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      id="modal-delete"
      title="¿Desea eliminar la dirección?"
      contentOverflowY="auto"
      size="small"
      footer={
        <Container width="100%" justifyContent="space-around" display="flex" alignItems="center">
          {
            <Button
              onClick={deleteAddresses}
              loading={loadingDeleteAddress}
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

export default DeleteCobranzaAddressesModal
