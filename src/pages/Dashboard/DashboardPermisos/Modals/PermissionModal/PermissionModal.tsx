import { FormProvider, useForm } from 'react-hook-form'
import Modal from '../../../../../ui/Modal/Modal'
import { PermissionType } from '../../../../../shared/types/dash/permission.type'
import Container from '../../../../../ui/Container/Container'
import Button from '../../../../../ui/Button/Button'
import PermissionInfoForm from './PermissionInfoForm'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  createPermission,
  getAllPermissions,
  updatePermission,
} from '../../../../../shared/services/dash/permission.service'
import { notification } from '../../../../../ui/notification/notification'
import dashPermissionCache from '../../PermissionsTable/utils/dash-permisos.cache'
import { ModalPermissionResolver } from './PermissionInfoForm/PermissionModal.yup'
import { useEffect } from 'react'

type PermissionModalProps = {
  visible: boolean
  onClose: () => void
  idPermission?: number
}

const defaultValuesPermission: PermissionType = {
  id: 0,
  name: '',
  code: '',
  link: '',
  icon: '',
}

const PermissionModal = ({ visible, onClose, idPermission = 0 }: PermissionModalProps) => {
  const queryClient = useQueryClient()

  const formMethods = useForm<Omit<PermissionType, 'permissions'>>({
    resolver: ModalPermissionResolver,
    mode: 'all',
    defaultValues: defaultValuesPermission,
  })
  const {
    setValue,
    getValues,
    reset,
    formState: { isValid },
  } = formMethods
  const {
    actions: { createPermissionCache, editPermissionCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = dashPermissionCache(queryClient)

  const { isLoading: loadingCreatePermission, mutate: mutateCreatePermission } = useMutation<any, Error>(
    async () => {
      const { id, ...restPermission } = getValues()
      return await createPermission({ ...restPermission })
    },
    {
      onSuccess: (result) => {
        createPermissionCache(result.data)
        notification({ type: 'success', message: 'Permiso creada' })
        handleClickCloseModal()
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

  const { isLoading: loadingEditPermission, mutate: mutateEditPermission } = useMutation<any, Error>(
    async () => {
      const { id, ...restPermission } = getValues()
      return await updatePermission(id, { ...restPermission })
    },
    {
      onSuccess: (result) => {
        editPermissionCache(result.data)
        notification({ type: 'success', message: 'Permiso editado' })
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

  const { refetch: refetchPermissions } = useQuery(
    'get-all-permissions-by-code',
    async () => {
      return getAllPermissions()
    },
    {
      onSuccess: ({ data }) => {
        if (idPermission !== 0) {
          // setValue('name', data.name)
          // setValue('customerHasBankId', data.customerHasBankId)
          // setValue('id', data.id)
        } else {
          reset(defaultValuesPermission)
        }
      },
      enabled: false,
    }
  )
  const handleClickCloseModal = () => {
    reset()
    onClose()
  }
  const onAddPermission = () => {
    mutateCreatePermission()
  }

  const onEditPermission = () => {
    mutateEditPermission()
  }

  useEffect(() => {
    if (!!idPermission) {
      refetchPermissions()
    }
  }, [idPermission, refetchPermissions])

  return (
    <FormProvider {...formMethods}>
      <Modal
        visible={visible}
        onClose={handleClickCloseModal}
        id="modal-permisos"
        title={idPermission !== 0 ? 'Editar Permiso' : 'Agregar Permiso'}
        contentOverflowY="auto"
        size="medium"
        minHeight="140px"
        footer={
          <Container width="100%" height="75px" display="flex" justifyContent="center" alignItems="center" gap="20px">
            <Button
              width="125px"
              label={idPermission !== 0 ? 'Editar' : 'Agregar'}
              shape="default"
              trailingIcon="ri-add-fill"
              onClick={idPermission !== 0 ? onEditPermission : onAddPermission}
              loading={loadingCreatePermission || loadingEditPermission}
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
            <PermissionInfoForm />
          </Container>
        </Container>
      </Modal>
    </FormProvider>
  )
}

export default PermissionModal
