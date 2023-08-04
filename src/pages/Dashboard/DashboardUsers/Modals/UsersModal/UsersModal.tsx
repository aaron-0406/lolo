import { useEffect } from 'react'
import { Controller } from 'react-hook-form'
import { FormProvider, useForm } from 'react-hook-form'
import { ModalUsersResolver } from './UsersModal.yup'
import { useMutation, useQuery } from 'react-query'
import UserInfoForm from './UserInfoForm'
import { CustomerUserType } from '../../../../../shared/types/customer-user.type'
import { createUser, editUserById, getUserByUserId } from '../../../../../shared/services/customer-user.service'
import Container from '../../../../../ui/Container'
import Modal from '../../../../../ui/Modal'
import notification from '../../../../../ui/notification'
import Button from '../../../../../ui/Button'
import Checkbox from '../../../../../ui/Checkbox'
import Label from '../../../../../ui/Label'
import { useDashContext } from '../../../../../shared/contexts/DashProvider'

type UsersModalProps = {
  visible: boolean
  onClose: () => void
  isEdit?: boolean
  setLoadingGlobal: (state: boolean) => void
  idUser?: number
}

const defaultValuesCustomerUser: Omit<CustomerUserType, 'customerId' | 'createdAt'> = {
  id: 0,
  name: '',
  lastName: '',
  phone: '',
  dni: '',
  email: '',
  password: '',
  privilege: '',
  state: true,
}

const UsersModal = ({ visible, onClose, idUser = 0, isEdit = false, setLoadingGlobal }: UsersModalProps) => {
  const {
    dashCustomer: {
      selectedCustomer: { id: customerId },
    },
  } = useDashContext()

  const formMethods = useForm<CustomerUserType>({
    resolver: ModalUsersResolver,
    mode: 'all',
    defaultValues: defaultValuesCustomerUser,
  })

  const {
    setValue,
    getValues,
    control,
    reset,
    formState: { isValid },
  } = formMethods

  const { isLoading: loadingCreateClient, mutate: createCustomerUser } = useMutation<any, Error>(
    async () => {
      const { id, ...restUser } = getValues()
      return await createUser({ ...restUser, customerId })
    },
    {
      onSuccess: () => {
        notification({ type: 'success', message: 'Usuario creado' })
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

  const { isLoading: loadingEditUser, mutate: editUser } = useMutation<any, Error>(
    async () => {
      const { id, createdAt, password, email, customerId, ...restUser } = getValues()
      return await editUserById(id, restUser)
    },
    {
      onSuccess: () => {
        notification({ type: 'success', message: 'Usuario editado' })
        setLoadingGlobal(true)
        onClose()
      },
      onError: (error: any) => {
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )

  const { refetch: refetchGetUserByUserId } = useQuery(
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
          setValue('privilege', data.privilege)
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
  }, [idUser])

  return (
    <FormProvider {...formMethods}>
      <Modal
        visible={visible}
        onClose={handleClickCloseModal}
        id="modal-files"
        title={isEdit ? 'Editar Usuario' : 'Agregar Usuario'}
        contentOverflowY="auto"
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
          <Container width="100%" height="75px" display="flex" justifyContent="center" alignItems="center" gap="20px">
            <Button
              width="125px"
              label={isEdit ? 'Editar' : 'Agregar'}
              shape="default"
              trailingIcon="ri-add-fill"
              onClick={isEdit ? onEditUser : onAddUser}
              loading={loadingCreateClient || loadingEditUser}
              disabled={!isValid}
            />
          </Container>
        </Container>
      </Modal>
    </FormProvider>
  )
}

export default UsersModal
