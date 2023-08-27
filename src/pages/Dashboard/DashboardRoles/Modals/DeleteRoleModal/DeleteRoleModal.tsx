import { AxiosResponse } from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import Modal from '@/ui/Modal/Modal'
import Container from '@/ui/Container/Container'
import Button from '@/ui/Button/Button'
import { notification } from '@/ui/notification/notification'
import dashRoleCache from '../../RolesTable/utils/dash-role.cache'
import { deleteRole } from '@/services/dash/role.service'

type DeleteRoleModalProps = {
  visible: boolean
  onClose: () => void
  idRole?: number
}
const DeleteRoleModal = ({ visible, idRole = 0, onClose }: DeleteRoleModalProps) => {
  const queryClient = useQueryClient()

  const {
    actions: { deleteRoleCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = dashRoleCache(queryClient)

  const { isLoading: loadingDeleteRole, mutate: deleteRoleMutate } = useMutation<AxiosResponse<{ id: string }>, Error>(
    async () => {
      return await deleteRole(idRole)
    },
    {
      onSuccess: (result) => {
        deleteRoleCache(result.data.id)
        notification({ type: 'success', message: 'Rol eliminado' })
        onClose()
      },
      onMutate: () => {
        return onMutateCache()
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

  const handleClickDelete = () => {
    if (idRole !== 0) deleteRoleMutate()
  }

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      id="modal-delete-rol"
      title="¿Desea eliminar este rol?"
      contentOverflowY="auto"
      size="small"
      footer={
        <Container width="100%" justifyContent="space-around" display="flex" alignItems="center">
          <Button
            onClick={handleClickDelete}
            loading={loadingDeleteRole}
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

export default DeleteRoleModal
