import { AxiosError, AxiosResponse } from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import Modal from '@/ui/Modal/Modal'
import Container from '@/ui/Container/Container'
import Button from '@/ui/Button/Button'
import { notification } from '@/ui/notification/notification'
import extIpAddressCache from '../../IpAddressBankTable/utils/dash-ip-address-bank.cache'
import { deleteIpAddress } from '@/services/extrajudicial/ext-ip-address-bank.service'
import { CustomErrorResponse } from 'types/customErrorResponse'

type DeleteRoleModalProps = {
  visible: boolean
  onClose: () => void
  idIpAddress?: number
}
const DeleteIpAddressBankModal = ({ visible, idIpAddress = 0, onClose }: DeleteRoleModalProps) => {
  const queryClient = useQueryClient()

  const {
    actions: { deleteIpAddressBankCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = extIpAddressCache(queryClient)

  const { isLoading: loadingDeleteAddress, mutate: deleteIpAddressMutate } = useMutation<
    AxiosResponse<{ id: string }>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      return await deleteIpAddress(idIpAddress)
    },
    {
      onSuccess: (result) => {
        deleteIpAddressBankCache(result.data.id)
        notification({ type: 'success', message: 'dirección IP eliminada' })
        onClose()
      },
      onMutate: () => {
        return onMutateCache()
      },
      onSettled: () => {
        onSettledCache()
      },
      onError: (error, _, context: any) => {
        onErrorCache(context)
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )

  const handleClickDelete = () => {
    if (idIpAddress !== 0) deleteIpAddressMutate()
  }

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      id="modal-delete-ip-address"
      title="¿Desea eliminar esta dirección IP?"
      contentOverflowY="auto"
      size="small"
      footer={
        <Container width="100%" justifyContent="space-around" display="flex" alignItems="center">
          <Button
            onClick={handleClickDelete}
            loading={loadingDeleteAddress}
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

export default DeleteIpAddressBankModal
