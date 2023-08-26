import { useMutation, useQueryClient } from 'react-query'
import { AxiosResponse } from 'axios'
import Button from '@/ui/Button/Button'
import Container from '@/ui/Container/Container'
import Modal from '@/ui/Modal/Modal'
import dashPermissionCache from '../../PermissionsTable/utils/dash-permisos.cache'
import { deletePermission } from '@/services/dash/permission.service'
import { notification } from '@/ui/notification/notification'

type DeletePermissionModalProps = {
  visible: boolean
  onClose: () => void
  idPermission?: number
}

const DeletePermissionModal = ({ visible, idPermission = 0, onClose }: DeletePermissionModalProps) => {
  const queryClient = useQueryClient()

  const {
    actions: { deletePermissionCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = dashPermissionCache(queryClient)

  const { isLoading: loadingDeletePermission, mutate: deletePermissionMutate } = useMutation<
    AxiosResponse<{ id: string }>,
    Error
  >(
    async () => {
      return await deletePermission(idPermission)
    },
    {
      onSuccess: (result) => {
        deletePermissionCache(result.data.id)
        notification({ type: 'success', message: 'Permiso eliminado' })
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
    if (idPermission !== 0) deletePermissionMutate()
  }

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      id="modal-delete-permission"
      title="¿Desea eliminar este permiso?"
      contentOverflowY="auto"
      size="small"
      footer={
        <Container width="100%" justifyContent="space-around" display="flex" alignItems="center">
          <Button
            onClick={handleClickDelete}
            loading={loadingDeletePermission}
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

export default DeletePermissionModal
