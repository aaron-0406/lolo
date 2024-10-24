import { useMutation, useQueryClient } from 'react-query'
import { AxiosError, AxiosResponse } from 'axios'
import notification from '@/ui/notification'
import Modal from '@/ui/Modal'
import Container from '@/ui/Container'
import Button from '@/ui/Button'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { useLoloContext } from '@/contexts/LoloProvider'
import { deleteSubject } from '@/services/judicial/judicial-subject.service'
import judicialSubjectCache from '../../SubjectTable/utils/judicial-subject.cache'

type DeleteSubjectModalProps = {
  visible: boolean
  onClose: () => void
  idSubject?: number
}

const DeleteSubjectModal = ({ visible, idSubject = 0, onClose }: DeleteSubjectModalProps) => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const queryClient = useQueryClient()

  const {
    actions: { deleteSubjectCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = judicialSubjectCache(queryClient)

  const { isLoading: loadingDeleteSubject, mutate: deleteSubjectMutate } = useMutation<
    AxiosResponse<{ id: string }>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      return await deleteSubject(idSubject)
    },
    {
      onSuccess: (result) => {
        deleteSubjectCache(result.data.id, parseInt(chb))
        notification({ type: 'success', message: 'Materia eliminada' })
        onClose()
      },
      onMutate: () => {
        return onMutateCache(parseInt(chb))
      },
      onSettled: () => {
        onSettledCache(parseInt(chb))
      },
      onError: (error, _, context: any) => {
        onErrorCache(context, parseInt(chb))
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )

  const handleClickDelete = () => {
    if (idSubject !== 0) {
      deleteSubjectMutate()
    }
  }

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      id="modal-delete"
      title="¿Desea eliminar esta Materia?"
      contentOverflowY="auto"
      size="small"
      footer={
        <Container width="100%" justifyContent="space-around" display="flex" alignItems="center">
          <Button
            onClick={handleClickDelete}
            loading={loadingDeleteSubject}
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

export default DeleteSubjectModal
