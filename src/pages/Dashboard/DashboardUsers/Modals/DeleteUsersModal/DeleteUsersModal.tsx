import { useMutation } from 'react-query'
import Container from '../../../../../ui/Container'
import { deleteUser } from '../../../../../shared/services/customer-user.service'
import Modal from '../../../../../ui/Modal'
import notification from '../../../../../ui/notification'
import Button from '../../../../../ui/Button'

type DeleteUsersModalProps = {
  visible: boolean
  onClose: () => void
  isEdit?: boolean
  setLoadingGlobal: (state: boolean) => void
  idUser?: number
}

const DeleteUsersModal = ({ visible, idUser = 0, onClose, setLoadingGlobal }: DeleteUsersModalProps) => {
  const { isLoading: loadingDeleteUser, mutate: DeleteUserMutate } = useMutation<any, Error>(
    async () => {
      return await deleteUser(idUser)
    },
    {
      onSuccess: () => {
        notification({ type: 'success', message: 'Usuario eliminado' })
        setLoadingGlobal(true)
        handleClickCloseModal()
      },
      onError: (error: any) => {
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )

  const handleClickCloseModal = () => {
    onClose()
    setLoadingGlobal(false)
  }

  const DeleteUsers = () => {
    if (idUser !== 0) {
      DeleteUserMutate()
    }
  }

  return (
    <Modal
      visible={visible}
      onClose={handleClickCloseModal}
      id="modal-delete"
      title="ELIMINAR USUARIO"
      contentOverflowY="auto"
      size="small"
      footer={
        <Container width="100%" justifyContent="space-around" display="flex" alignItems="center">
          {
            <Button
              onClick={() => {
                DeleteUsers()
              }}
              display="danger"
              size="default"
              label="ACEPTAR"
            />
          }
          {
            <Button
              onClick={() => {
                onClose()
              }}
              size="default"
              label="CANCELAR"
            />
          }
        </Container>
      }
    ></Modal>
  )
}

export default DeleteUsersModal
