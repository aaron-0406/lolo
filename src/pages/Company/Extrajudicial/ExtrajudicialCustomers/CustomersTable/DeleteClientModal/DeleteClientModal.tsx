import { AxiosError } from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import Container from '@/ui/Container'
import Modal from '@/ui/Modal'
import notification from '@/ui/notification'
import Button from '@/ui/Button'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { deleteClient } from '@/services/extrajudicial/client.service'
import { useLoloContext } from '@/contexts/LoloProvider'
import companyCustomersCache from '../utils/company-customers.cache'

type DeleteClientModalProps = {
  visible: boolean
  onClose: () => void
  code: string
  archived: boolean
}

const DeleteClientModal = ({ visible, onClose, code, archived }: DeleteClientModalProps) => {
  const queryClient = useQueryClient()
  const {
    client: { customer },
    bank: { selectedBank },
  } = useLoloContext()

  const {
    actions: { deleteCobranzaCustomerCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = companyCustomersCache(queryClient)

  const { isLoading: loadingDeleteClient, mutate: deleteCustomer } = useMutation<any, AxiosError<CustomErrorResponse>>(
    async () => {
      return await deleteClient(code, Number(selectedBank.idCHB), Number(customer.id))
    },
    {
      onSuccess: (data) => {
        deleteCobranzaCustomerCache(
          data.data?.id,
          selectedBank.idCHB?.length ? parseInt(selectedBank.idCHB) : 0,
          archived
        )
        notification({ type: 'success', message: 'Cliente eliminado' })
        onClose()
      },
      onMutate: () => {
        return onMutateCache(selectedBank.idCHB?.length ? parseInt(selectedBank.idCHB) : 0, archived)
      },
      onSettled: () => {
        onSettledCache(selectedBank.idCHB?.length ? parseInt(selectedBank.idCHB) : 0, archived)
      },
      onError: (error, _, context: any) => {
        onErrorCache(context, selectedBank.idCHB?.length ? parseInt(selectedBank.idCHB) : 0, archived)
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )

  const onDeleteClient = () => {
    deleteCustomer()
  }

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      id="modal-delete"
      title="Desea eliminar al cliente?"
      contentOverflowY="auto"
      size="small"
      footer={
        <Container width="100%" justifyContent="space-around" display="flex" alignItems="center">
          {
            <Button
              onClick={onDeleteClient}
              loading={loadingDeleteClient}
              display="danger"
              size="default"
              label="ACEPTAR"
            />
          }
          {<Button onClick={onClose} size="default" label="CANCELAR" />}
        </Container>
      }
    />
  )
}

export default DeleteClientModal
