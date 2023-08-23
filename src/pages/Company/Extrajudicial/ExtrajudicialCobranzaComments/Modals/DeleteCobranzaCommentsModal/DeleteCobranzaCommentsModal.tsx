import { useMutation, useQueryClient } from 'react-query'
import Button from '../../../../../../ui/Button'
import Container from '../../../../../../ui/Container/Container'
import Modal from '../../../../../../ui/Modal'
import companyComentariosCache from '../../CobranzaCommentsTable/utils/company-comentarios.cache'
import { deleteComment } from '../../../../../../shared/services/extrajudicial/comment.service'
import notification from '../../../../../../ui/notification'

type DeleteCobranzaCommentsModalProps = {
  visible: boolean
  onClose: () => void
  idComment?: number
  clientId?: number
}

const DeleteCobranzaCommentsModal = ({
  visible,
  onClose,
  idComment = 0,
  clientId = 0,
}: DeleteCobranzaCommentsModalProps) => {
  const queryClient = useQueryClient()

  const {
    actions: { deleteCobranzaCommentCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = companyComentariosCache(queryClient)

  const { isLoading: loadingDeleteComment, mutate: deleteCommentMutate } = useMutation<any, Error>(
    async () => {
      return await deleteComment(idComment)
    },
    {
      onSuccess: () => {
        deleteCobranzaCommentCache(idComment, clientId)
        notification({ type: 'success', message: 'Comentario eliminado' })
        onClose()
      },
      onMutate: () => {
        return onMutateCache(clientId)
      },
      onSettled: () => {
        onSettledCache(clientId)
      },
      onError: (error: any, _, context: any) => {
        onErrorCache(context, clientId)
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )

  const deleteComments = () => {
    if (idComment !== 0) {
      deleteCommentMutate()
    }
  }

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      id="modal-delete"
      title="¿Desea eliminar el comentario?"
      contentOverflowY="auto"
      size="small"
      footer={
        <Container width="100%" justifyContent="space-around" display="flex" alignItems="center">
          {
            <Button
              onClick={deleteComments}
              loading={loadingDeleteComment}
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

export default DeleteCobranzaCommentsModal
