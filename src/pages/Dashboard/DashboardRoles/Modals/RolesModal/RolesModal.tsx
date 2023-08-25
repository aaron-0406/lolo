import { FormProvider, useForm } from 'react-hook-form'
import Modal from '../../../../../ui/Modal'
import { RoleType } from '../../../../../shared/types/dash/role.type'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import Button from '../../../../../ui/Button'
import Container from '../../../../../ui/Container'
import RoleInfoForm from './RoleInfoForm'
import { notification } from '../../../../../ui/notification/notification'
import { createRole, getRoleById, updateRole } from '../../../../../shared/services/dash/role.service'
import dashRoleCache, { KEY_DASH_ROLES_CACHE } from '../../RolesTable/utils/dash-role.cache'
import { ModalRoleResolver } from './RoleInfoForm/RoleModal.yup'
import { useEffect } from 'react'

const defaultValuesRole: RoleType = {
  id: 0,
  name: '',
  customerId: 0,
  permissions: [],
}

type RoleModalProps = {
  visible: boolean
  onClose: () => void
  idRole?: number
}

const RolesModal = ({ visible, onClose, idRole = 0 }: RoleModalProps) => {
  const queryClient = useQueryClient()

  const formMethods = useForm<RoleType>({
    resolver: ModalRoleResolver,
    mode: 'all',
    defaultValues: defaultValuesRole,
  })

  const {
    setValue,
    getValues,
    reset,
    formState: { isValid },
  } = formMethods

  const {
    actions: { createRoleCache, editRoleCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = dashRoleCache(queryClient)

  const { isLoading: loadingCreateRole, mutate: mutateCreateRole } = useMutation<any, Error>(
    async () => {
      const { id, ...restRole } = getValues()
      return await createRole({ ...restRole })
    },
    {
      onSuccess: (result) => {
        createRoleCache(result.data)
        notification({ type: 'success', message: 'Rol creado' })
        handleClickCloseModal()
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

  const { isLoading: loadingEditRole, mutate: mutateEditRole } = useMutation<any, Error>(
    async () => {
      const { id, ...restRole } = getValues()
      return await updateRole(id, { ...restRole })
    },
    {
      onSuccess: (result) => {
        editRoleCache(result.data)
        notification({ type: 'success', message: 'Rol editado' })
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

  const { refetch: refetchRoles } = useQuery(
    `${KEY_DASH_ROLES_CACHE}_GET_ROLE_BY_ID`,
    async () => {
      return getRoleById(idRole)
    },
    {
      onSuccess: ({ data }) => {
        if (idRole !== 0) {
          setValue('id', data.id)
          setValue('name', data.name)
          setValue('customerId', data.customerId)
          setValue('permissions', data.permissions)
        } else {
          reset(defaultValuesRole)
        }
      },
      enabled: false,
    }
  )

  const handleClickCloseModal = () => {
    onClose()
  }
  const onAddRole = () => {
    mutateCreateRole()
  }

  const onEditRole = () => {
    mutateEditRole()
  }

  useEffect(() => {
    if (!!idRole) refetchRoles()
  }, [idRole, refetchRoles])

  return (
    <FormProvider {...formMethods}>
      <Modal
        visible={visible}
        onClose={handleClickCloseModal}
        id="modal-permisos"
        title={idRole !== 0 ? 'Editar Rol' : 'Agregar Rol'}
        contentOverflowY="auto"
        size="medium"
        minHeight="140px"
        footer={
          <Container width="100%" height="75px" display="flex" justifyContent="right" alignItems="center" gap="20px">
            <Button
              width="125px"
              label={idRole !== 0 ? 'Editar' : 'Agregar'}
              shape="default"
              trailingIcon="ri-add-fill"
              onClick={idRole !== 0 ? onEditRole : onAddRole}
              loading={loadingCreateRole || loadingEditRole}
              disabled={!isValid}
            />
          </Container>
        }
      >
        <Container
          width="100%"
          height="140px"
          display="flex"
          justify-content="center"
          flexDirection="column"
          align-items="center"
          gap="20px"
        >
          <Container width="100%" display="flex" flexDirection="column" gap="20px" padding="20px" margin="30px 0">
            <RoleInfoForm />
          </Container>
        </Container>
      </Modal>
    </FormProvider>
  )
}

export default RolesModal
