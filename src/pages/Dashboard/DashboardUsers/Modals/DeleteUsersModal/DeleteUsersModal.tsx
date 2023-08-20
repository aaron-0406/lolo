import { useMutation, useQueryClient } from 'react-query'
import Container from '../../../../../ui/Container'
import { deleteUser } from '../../../../../shared/services/dash/customer-user.service'
import Modal from '../../../../../ui/Modal'
import notification from '../../../../../ui/notification'
import Button from '../../../../../ui/Button'
import dashUsuariosCache from '../../UsersTable/utils/dash-usuarios.cache'
import { AxiosResponse } from 'axios'

type DeleteUsersModalProps = {
  visible: boolean
  onClose: () => void
  isEdit?: boolean
  idUser?: number
}

const DeleteUsersModal = ({ visible, idUser = 0, onClose }: DeleteUsersModalProps) => {
  const queryClient = useQueryClient()
  const {
    actions: { deleteUserCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = dashUsuariosCache(queryClient)

  const { isLoading: loadingDeleteUser, mutate: deleteUserMutate } = useMutation<AxiosResponse<{ id: string }>, Error>(
    async () => {
      return await deleteUser(idUser)
    },
    {
      onSuccess: (result) => {
        deleteUserCache(result.data.id)
        notification({ type: 'success', message: 'Usuario eliminado' })
        onClose()
      },
      onMutate: () => {
        onMutateCache()
      },
      onSettled: () => {
        onSettledCache()
      },
      onError: (error: any, _, context: any) => {
        onErrorCache(context)
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )

  const deleteUsers = () => {
    if (idUser !== 0) {
      deleteUserMutate()
    }
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
          {<Button onClick={deleteUsers} loading={loadingDeleteUser} display="danger" size="default" label="ACEPTAR" />}
          {<Button onClick={onClose} size="default" label="CANCELAR" />}
        </Container>
      }
    ></Modal>
  )
}

export default DeleteUsersModal
