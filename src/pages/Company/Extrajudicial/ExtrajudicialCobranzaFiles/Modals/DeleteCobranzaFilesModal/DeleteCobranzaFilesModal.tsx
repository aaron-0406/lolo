import { useMutation, useQueryClient } from 'react-query'
import companyFilesCache from '../../CobranzaFilesTable/utils/company-files.cache'
import { AxiosError } from 'axios'
import { CustomErrorResponse } from 'types/customErrorResponse'
import notification from '@/ui/notification'
import { deleteFile } from '@/services/extrajudicial/file.service'
import { useLoloContext } from '@/contexts/LoloProvider'
import Modal from '@/ui/Modal'
import Container from '@/ui/Container'
import Button from '@/ui/Button'

type DeleteCobranzaFilesModalProps = {
  visible: boolean
  onClose: () => void
  idFile?: number
  clientId?: number
  clientCode?: number
}

const DeleteCobranzaFilesModal = ({
  visible,
  onClose,
  idFile = 0,
  clientId = 0,
  clientCode = 0,
}: DeleteCobranzaFilesModalProps) => {
  const {
    client: { customer },
    bank: { selectedBank },
  } = useLoloContext()

  const queryClient = useQueryClient()

  const {
    actions: { deleteCobranzaFilesCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = companyFilesCache(queryClient)

  const { isLoading: loadingDeleteFile, mutate: deleteFileMutate } = useMutation<any, AxiosError<CustomErrorResponse>>(
    async () => {
      return await deleteFile(Number(customer.id), Number(selectedBank.idCHB), clientCode, idFile)
    },
    {
      onSuccess: () => {
        deleteCobranzaFilesCache(idFile, clientId)
        notification({ type: 'success', message: 'Archivo eliminado' })
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

  const deleteFiles = () => {
    if (idFile !== 0) {
      deleteFileMutate()
    }
  }

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      id="modal-delete"
      title="¿Desea eliminar el archivo?"
      contentOverflowY="auto"
      size="small"
      footer={
        <Container width="100%" justifyContent="space-around" display="flex" alignItems="center">
          {<Button onClick={deleteFiles} loading={loadingDeleteFile} display="danger" size="default" label="ACEPTAR" />}
          {<Button onClick={onClose} size="default" label="CANCELAR" />}
        </Container>
      }
    ></Modal>
  )
}

export default DeleteCobranzaFilesModal
