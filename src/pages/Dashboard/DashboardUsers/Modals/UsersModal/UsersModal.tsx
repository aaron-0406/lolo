import { useEffect } from 'react'
import { Controller } from 'react-hook-form'
import { FormProvider, useForm } from 'react-hook-form'
import { ModalUsersResolver } from './UsersModal.yup'
import { useMutation, useQuery } from 'react-query'
import UserInfoForm from './UserInfoForm'
import { CustomerUserType } from '../../../../../shared/types/customer-user.type'
import { createClient, editUserById, getUserByUserId } from '../../../../../shared/services/customer-user.service'
import Container from '../../../../../ui/Container'
import Modal from '../../../../../ui/Modal'
import notification from '../../../../../ui/notification'
import Button from '../../../../../ui/Button'
import Checkbox from '../../../../../ui/Checkbox'
import Label from '../../../../../ui/Label'

type UsersModalProps = {
  visible: boolean
  onClose: () => void
  isEdit?: boolean
  setLoadingGlobal: (state: boolean) => void
}

const defaultValuesCustomerUser: Omit<CustomerUserType, 'customerId' | 'createdAt'> = {
  id: 0,
  name: '',
  lastName: '',
  phone: '',
  dni: '',
  email: '',
  privilege: '',
  state: true,
}
const UsersModal = ({ visible, onClose, isEdit = false, setLoadingGlobal }: UsersModalProps) => {
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

  // const { refetch: refetchGetUser } =useQuery(
  //   'get-user-by-user-id',
  //   async() => {
  //     return getUserByUserId()
  //   },
  //   {
  //     onSuccess: ({ data }) => {
  //       if ( userID !== '' ){
  //         setValue
  //       }
  //     }
  //   }
  // )

  const onAddUser = () => {
    createUser()
  }

  const onEditUser = () => {
    editUser()
  }

  const handleClickCloseModal = () => {
    reset()
    onClose()
  }

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
              loading={loadingCreateCustomer || loadingEditCustomer}
              disabled={!isValid}
            />
          </Container>
        </Container>
      </Modal>
    </FormProvider>
  )
}

export default UsersModal
