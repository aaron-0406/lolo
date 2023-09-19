import { AxiosError, AxiosResponse } from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import Container from '@/ui/Container'
import { deleteUser } from '@/services/dash/customer-user.service'
import Modal from '@/ui/Modal'
import notification from '@/ui/notification'
import Button from '@/ui/Button'
import extUsuariosCache from '../../UsersTable/utils/ext-usuarios.cache'
import { CustomErrorResponse } from 'types/customErrorResponse'

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
  } = extUsuariosCache(queryClient)

  const { isLoading: loadingDeleteUser, mutate: deleteUserMutate } = useMutation<
    AxiosResponse<{ id: string }>,
    AxiosError<CustomErrorResponse>
  >(
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
