import { deleteFileCase } from '@/services/judicial/judicial-file-case.service'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import Modal from '@/ui/Modal'
import notification from '@/ui/notification'
import { AxiosError, AxiosResponse } from 'axios'
import { FC } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { CustomErrorResponse } from 'types/customErrorResponse'
import judicialFileCaseCache from '../utils/file-cases.cache'
import { useLoloContext } from '@/contexts/LoloProvider'

type DeleteExpedienteModalProps = {
  visible: boolean
  onClose: () => void
  idFileCase?: number
}

const DeleteExpedienteModal: FC<DeleteExpedienteModalProps> = ({ visible, idFileCase = 0, onClose }) => {
  const queryClient = useQueryClient()

  const {
    bank: { selectedBank },
  } = useLoloContext()

  const {
    actions: { deleteFileCaseCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = judicialFileCaseCache(queryClient)

  const { isLoading: loadingDeleteUser, mutate: deleteUserMutate } = useMutation<
    AxiosResponse<{ id: string }>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      return await deleteFileCase(idFileCase)
    },
    {
      onSuccess: (result) => {
        deleteFileCaseCache(result.data.id, selectedBank.idCHB?.length ? parseInt(selectedBank.idCHB) : 0)
        notification({ type: 'success', message: 'Expediente eliminado' })
        onClose()
      },
      onMutate: () => {
        return onMutateCache(selectedBank.idCHB?.length ? parseInt(selectedBank.idCHB) : 0)
      },
      onSettled: () => {
        onSettledCache(selectedBank.idCHB?.length ? parseInt(selectedBank.idCHB) : 0)
      },
      onError: (error, _, context: any) => {
        onErrorCache(context, selectedBank.idCHB?.length ? parseInt(selectedBank.idCHB) : 0)
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )

  const deleteUsers = () => {
    if (idFileCase !== 0) {
      deleteUserMutate()
    }
  }
  return (
    <Modal
      visible={visible}
      onClose={onClose}
      id="modal-delete"
      title="Desea eliminar este expediente?"
      contentOverflowY="auto"
      size="small"
      footer={
        <Container width="100%" justifyContent="space-around" display="flex" alignItems="center">
          {<Button onClick={deleteUsers} loading={loadingDeleteUser} display="danger" size="default" label="ACEPTAR" />}
          {<Button onClick={onClose} size="default" label="CANCELAR" />}
        </Container>
      }
    ></Modal>
  )
}

export default DeleteExpedienteModal
