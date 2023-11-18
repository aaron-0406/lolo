import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import Container from '@/ui/Container'
import Modal from '@/ui/Modal'
import notification from '@/ui/notification'
import Button from '@/ui/Button'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { deleteClient } from '@/services/extrajudicial/client.service'
import { useLoloContext } from '@/contexts/LoloProvider'

type DeleteClientModalProps = {
  visible: boolean
  onClose: () => void
  code: string
}

const DeleteClientModal = ({ visible, onClose, code }: DeleteClientModalProps) => {
  const {
    client: { customer },
    bank: { selectedBank },
  } = useLoloContext()

  const { isLoading: loadingDeleteClient, mutate: deleteCustomer } = useMutation<any, AxiosError<CustomErrorResponse>>(
    async () => {
      return await deleteClient(code, Number(selectedBank.idCHB), Number(customer.id))
    },
    {
      onSuccess: () => {
        notification({ type: 'success', message: 'Cliente eliminado' })
        onClose()
      },
      onError: (error) => {
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
      title="Desea eliminar al usuario?"
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
