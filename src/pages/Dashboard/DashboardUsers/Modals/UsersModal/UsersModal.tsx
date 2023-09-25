import { useEffect } from 'react'
import { AxiosError, AxiosResponse } from 'axios'
import { FormProvider, useForm, Controller } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { ModalUsersResolver } from './UsersModal.yup'
import UserInfoForm from './UserInfoForm'
import { CustomerUserType } from '@/types/dash/customer-user.type'
import { createUser, editUserById, getUserByUserId } from '@/services/dash/customer-user.service'
import Container from '@/ui/Container'
import Modal from '@/ui/Modal'
import notification from '@/ui/notification'
import Button from '@/ui/Button'
import Checkbox from '@/ui/Checkbox'
import Label from '@/ui/Label'
import { useDashContext } from '@/contexts/DashProvider'
import dashUsuariosCache from '../../UsersTable/utils/dash-usuarios.cache'
import { CustomErrorResponse } from 'types/customErrorResponse'

type UsersModalProps = {
  visible: boolean
  onClose: () => void
  isEdit?: boolean
  idUser?: number
}

const defaultValuesCustomerUser: Omit<CustomerUserType, 'customerId' | 'createdAt' | 'role'> = {
  id: 0,
  name: '',
  lastName: '',
  phone: '',
  dni: '',
  email: '',
  password: '',
  state: true,
  roleId: 0,
  loginAttempts: 0,
}

const UsersModal = ({ visible, onClose, idUser = 0, isEdit = false }: UsersModalProps) => {
  const {
    dashCustomer: {
      selectedCustomer: { id: customerId },
    },
  } = useDashContext()

  const queryClient = useQueryClient()
  const {
    actions: { createUserCache, editUserCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = dashUsuariosCache(queryClient)

  const formMethods = useForm<CustomerUserType>({
    resolver: ModalUsersResolver,
    mode: 'all',
    defaultValues: defaultValuesCustomerUser,
  })

  const { setValue, getValues, control, reset } = formMethods

  const { isLoading: loadingCreateUser, mutate: createCustomerUser } = useMutation<
    AxiosResponse<CustomerUserType>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { id, ...restUser } = getValues()
      return await createUser({ ...restUser, customerId })
    },
    {
      onSuccess: (result) => {
        createUserCache(result.data)
        notification({ type: 'success', message: 'Usuario creado' })
        handleClickCloseModal()
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

  const { isLoading: loadingEditUser, mutate: editUser } = useMutation<
    AxiosResponse<CustomerUserType>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { id, createdAt, email, customerId, ...restUser } = getValues()
      return await editUserById(id, restUser)
    },
    {
      onSuccess: (result) => {
        editUserCache(result.data)
        notification({ type: 'success', message: 'Usuario editado' })
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

  const { refetch: refetchGetUserByUserId } = useQuery<AxiosResponse<CustomerUserType>>(
    'get-user-by-user-id',
    async () => {
      return getUserByUserId(idUser)
    },
    {
      onSuccess: ({ data }) => {
        if (idUser !== 0) {
          setValue('name', data.name)
          setValue('lastName', data.lastName)
          setValue('phone', data.phone)
          setValue('dni', data.dni)
          setValue('email', data.email)
          setValue('password', data.password)
          setValue('roleId', data.roleId)
          setValue('id', data.id)
        } else {
          reset(defaultValuesCustomerUser)
        }
      },
      enabled: false,
    }
  )

  const onEditUser = () => {
    editUser()
  }

  const onAddUser = () => {
    createCustomerUser()
  }

  const handleClickCloseModal = () => {
    reset()
    onClose()
  }

  useEffect(() => {
    if (idUser !== 0) {
      refetchGetUserByUserId()
    }
    // eslint-disable-next-line
  }, [idUser])

  return (
    <FormProvider {...formMethods}>
      <Modal
        visible={visible}
        onClose={handleClickCloseModal}
        id="modal-files"
        title={isEdit ? 'Editar Usuario' : 'Agregar Usuario'}
        contentOverflowY="auto"
        footer={
          <Container width="100%" height="75px" display="flex" justifyContent="flex-end" alignItems="center" gap="20px">
            <Button
              width="125px"
              label={isEdit ? 'Editar' : 'Agregar'}
              shape="default"
              trailingIcon="ri-add-fill"
              onClick={isEdit ? onEditUser : onAddUser}
              loading={loadingCreateUser || loadingEditUser}
            />
          </Container>
        }
      >
        <Container
          width="100%"
          height="410px"
          display="flex"
          justify-content="center"
          flexDirection="column"
          align-items="center"
          gap="20px"
        >
          <Container width="100%" display="flex" flexDirection="column" gap="10px" padding="20px">
            <UserInfoForm />
            <Container width="100%" display={isEdit ? 'none' : 'flex'} gap="10px">
              <Label label="Estado:" />
              <Controller
                name="state"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    width="100%"
                    value={String(field.value)}
                    onChange={(key) => {
                      field.onChange(key)
                    }}
                  />
                )}
              />
            </Container>
          </Container>
        </Container>
      </Modal>
    </FormProvider>
  )
}

export default UsersModal
