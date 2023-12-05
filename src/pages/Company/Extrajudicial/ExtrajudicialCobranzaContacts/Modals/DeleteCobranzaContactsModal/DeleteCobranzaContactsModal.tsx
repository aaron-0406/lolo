import { useMutation, useQueryClient } from 'react-query'
import companyContactsCache from '../../CobranzaContactsTable/utils/company-contacts.cache'
import Modal from '@/ui/Modal'
import Container from '@/ui/Container'
import Button from '@/ui/Button'
import notification from '@/ui/notification'
import { AxiosError } from 'axios'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { deleteExtContact } from '@/services/extrajudicial/ext-contact.service'

type DeleteCobranzaContactsModalProps = {
  visible: boolean
  onClose: () => void
  idContact?: number
  clientId?: number
}

const DeleteCobranzaContactsModal = ({
  visible,
  onClose,
  idContact = 0,
  clientId = 0,
}: DeleteCobranzaContactsModalProps) => {
  const queryClient = useQueryClient()

  const {
    actions: { deleteCobranzaContactCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = companyContactsCache(queryClient)

  const { isLoading: loadingDeleteContact, mutate: deleteContactMutate } = useMutation<
    any,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      return await deleteExtContact(idContact)
    },
    {
      onSuccess: () => {
        deleteCobranzaContactCache(idContact, clientId)
        notification({ type: 'success', message: 'Contacto eliminado' })
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

  const deleteContacts = () => {
    if (idContact !== 0) {
      deleteContactMutate()
    }
  }

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      id="modal-delete"
      title="¿Desea eliminar el contacto?"
      contentOverflowY="auto"
      size="small"
      footer={
        <Container width="100%" justifyContent="space-around" display="flex" alignItems="center">
          {
            <Button
              onClick={deleteContacts}
              loading={loadingDeleteContact}
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

export default DeleteCobranzaContactsModal
