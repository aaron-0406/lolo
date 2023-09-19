/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { useLocation } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'
import Modal from '@/ui/Modal/Modal'
import { PermissionType } from '@/types/dash/permission.type'
import Container from '@/ui/Container/Container'
import Button from '@/ui/Button/Button'
import PermissionInfoForm from './PermissionInfoForm'
import { createPermission, getPermissionById, updatePermission } from '@/services/dash/permission.service'
import { notification } from '@/ui/notification/notification'
import dashPermissionCache, { KEY_DASH_PERMISOS_CACHE } from '../../PermissionsTable/utils/dash-permisos.cache'
import { ModalPermissionResolver } from './PermissionInfoForm/PermissionModal.yup'
import { CustomErrorResponse } from 'types/customErrorResponse'

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
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  const code = searchParams.get('code') ?? ''

  const formMethods = useForm<Omit<PermissionType, 'permissions'>>({
    resolver: ModalPermissionResolver,
    mode: 'all',
    defaultValues: defaultValuesPermission,
  })

  const {
    setValue,
    getValues,
    reset,
    formState: { isValid, isDirty },
  } = formMethods

  const {
    actions: { createPermissionCache, editPermissionCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = dashPermissionCache(queryClient)

  const { isLoading: loadingCreatePermission, mutate: mutateCreatePermission } = useMutation<
    any,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { id, ...restPermission } = getValues()
      return await createPermission({ ...restPermission })
    },
    {
      onSuccess: (result) => {
        createPermissionCache(result.data, code)
        notification({ type: 'success', message: 'Permiso creado' })
        handleClickCloseModal()
      },
      onMutate: () => {
        return onMutateCache(code)
      },
      onSettled: () => {
        onSettledCache(code)
      },
      onError: (error, _, context: any) => {
        onErrorCache(context, code)
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
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
        editPermissionCache(result.data, code)
        notification({ type: 'success', message: 'Permiso editado' })
        onClose()
      },
      onMutate: () => {
        return onMutateCache(code)
      },
      onSettled: () => {
        onSettledCache(code)
      },
      onError: (error: any, _, context: any) => {
        onErrorCache(context, code)
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )

  const { refetch: refetchPermissions } = useQuery(
    `${KEY_DASH_PERMISOS_CACHE}_GET_PERMISSION_BY_ID`,
    async () => {
      return getPermissionById(idPermission)
    },
    {
      onSuccess: ({ data }) => {
        if (idPermission !== 0) {
          reset(
            { id: data.id, name: data.name, code: data.code, icon: data.icon, link: data.link },
            { keepDirty: false }
          )
        } else {
          reset(defaultValuesPermission)
        }
      },
      enabled: false,
    }
  )

  const { data: permissionsData } = useQuery<AxiosResponse<Array<PermissionType>>>([KEY_DASH_PERMISOS_CACHE, code])
  const permissions = permissionsData?.data ?? []

  const getCode = () => {
    let lastNumber = ''
    if (permissions.length < 10) {
      lastNumber = `0${permissions.length + 1}`
    }

    setValue('code', code ? `${code}-${lastNumber}` : `P${lastNumber}`)
    if (code) setValue('link', code.length >= 3 ? '#' : '')
  }

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
    if (!!idPermission) refetchPermissions()
  }, [idPermission, refetchPermissions])

  useEffect(() => {
    if (!idPermission) {
      getCode()
    }
  }, [permissions.length])

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
          <Container width="100%" height="75px" display="flex" justifyContent="right" alignItems="center" gap="20px">
            <Button
              width="125px"
              label={idPermission !== 0 ? 'Editar' : 'Agregar'}
              shape="default"
              trailingIcon="ri-add-fill"
              onClick={idPermission !== 0 ? onEditPermission : onAddPermission}
              loading={loadingCreatePermission || loadingEditPermission}
              disabled={!isDirty || !isValid}
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
