import { AxiosError, AxiosResponse } from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import Modal from '@/ui/Modal/Modal'
import Container from '@/ui/Container/Container'
import Button from '@/ui/Button/Button'
import { notification } from '@/ui/notification/notification'
import extRoleCache from '../../RolesTable/utils/ext-role.cache'
import { deleteRole } from '@/services/dash/role.service'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { useLoloContext } from '@/contexts/LoloProvider'

type DeleteRoleModalProps = {
  visible: boolean
  onClose: () => void
  idRole?: number
}
const DeleteRoleModal = ({ visible, idRole = 0, onClose }: DeleteRoleModalProps) => {
  const {
    client: {
      customer: { id },
    },
  } = useLoloContext()

  const queryClient = useQueryClient()

  const {
    actions: { deleteRoleCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = extRoleCache(queryClient)

  const { isLoading: loadingDeleteRole, mutate: deleteRoleMutate } = useMutation<
    AxiosResponse<{ id: string }>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      return await deleteRole(idRole)
    },
    {
      onSuccess: (result) => {
        deleteRoleCache(result.data.id, id)
        notification({ type: 'success', message: 'Rol eliminado' })
        onClose()
      },
      onMutate: () => {
        return onMutateCache(id)
      },
      onSettled: () => {
        onSettledCache(id)
      },
      onError: (error, _, context: any) => {
        onErrorCache(context, id)
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
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
