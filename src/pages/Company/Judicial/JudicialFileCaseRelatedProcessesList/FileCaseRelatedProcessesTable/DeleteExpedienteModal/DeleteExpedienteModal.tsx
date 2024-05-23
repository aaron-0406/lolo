import { deleteFileCase } from '@/services/judicial/judicial-file-case-related-process.service'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import Modal from '@/ui/Modal'
import notification from '@/ui/notification'
import { AxiosError, AxiosResponse } from 'axios'
import { FC } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { CustomErrorResponse } from 'types/customErrorResponse'
import judicialFileCaseRelatedProcessCache from '../utils/file-cases-related-Process.cache'

type DeleteExpedienteModalProps = {
  visible: boolean
  onClose: () => void
  idFileCase?: number
  caseFileRelatedProcessId: number
}

const DeleteExpedienteModal: FC<DeleteExpedienteModalProps> = ({
  visible,
  idFileCase = 0,
  caseFileRelatedProcessId = 0,
  onClose,
}) => {
  const queryClient = useQueryClient()

  const {
    actions: { deleteFileCaseRelatedProcessCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = judicialFileCaseRelatedProcessCache(queryClient)

  const { isLoading: loadingDeleteUser, mutate: deleteUserMutate } = useMutation<
    AxiosResponse<{ id: string }>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      return await deleteFileCase(idFileCase)
    },
    {
      onSuccess: (result) => {
        deleteFileCaseRelatedProcessCache(result.data.id, caseFileRelatedProcessId ? caseFileRelatedProcessId : 0)
        notification({ type: 'success', message: 'Expediente eliminado' })
        onClose()
      },
      onMutate: () => {
        return onMutateCache(caseFileRelatedProcessId ? caseFileRelatedProcessId : 0)
      },
      onSettled: () => {
        onSettledCache(caseFileRelatedProcessId ? caseFileRelatedProcessId : 0)
      },
      onError: (error, _, context: any) => {
        onErrorCache(context, caseFileRelatedProcessId ? caseFileRelatedProcessId : 0)
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
