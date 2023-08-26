import { useForm, Controller } from 'react-hook-form'
import { useMutation } from 'react-query'
import Modal from '@/ui/Modal'
import { PasswordFormType } from './hookform.type'
import { PasswordSchemaResolver } from './updatePassword.yup'
import Container from '@/ui/Container/Container'
import TextField from '@/ui/fields/TextField/TextField'
import Button from '@/ui/Button/Button'
import { notification } from '@/ui/notification/notification'
import { changePasswordService } from '@/services/extrajudicial/auth.service'

type UpdatePasswordModalProps = {
  visible: boolean
  onClose: () => void
}

const UpdatePasswordModal = ({ visible, onClose }: UpdatePasswordModalProps) => {
  const {
    formState: { errors },
    control,
    handleSubmit,
    getValues,
    resetField,
  } = useForm<PasswordFormType>({
    resolver: PasswordSchemaResolver,
    defaultValues: {
      newPassword: '',
      repeatPassword: '',
    },
  })

  const handleClickCloseModal = () => {
    resetField('newPassword')
    resetField('repeatPassword')
    onClose()
  }

  const { mutate: changePasswordQuery, isLoading } = useMutation<any, Error>(
    async (): Promise<any> => {
      notification({ type: 'info', message: 'Espere por favor...' })
      return await changePasswordService(getValues())
    },
    {
      onSuccess: () => {
        notification({ type: 'success', message: 'Contraseña modificada' })
      },
      onError: (error: any) => {
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )

  return (
    <Modal
      visible={visible}
      onClose={handleClickCloseModal}
      id="modal-update-password"
      title="Actualizar Contraseña"
      contentOverflowY="auto"
      size="small"
      minHeight="240px"
      footer={
        <Container width="100%" height="75px" display="flex" justifyContent="flex-end" alignItems="center">
          <Button
            width="125px"
            label="Actualizar"
            shape="default"
            loading={isLoading}
            disabled={isLoading}
            onClick={() => {
              handleSubmit(() => {
                changePasswordQuery()
              })()
            }}
          />
        </Container>
      }
    >
      <Container
        width="100%"
        height="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        padding="20px"
        minHeight="240px"
      >
        <Container width="100%" display="flex" flexDirection="column" gap="50px">
          <Controller
            name="newPassword"
            control={control}
            render={({ field }) => (
              <TextField
                width="100%"
                label="Nueva Contraseña"
                required
                type="password"
                value={field.value}
                helperText={errors.newPassword?.message ? errors.newPassword.message : ''}
                hasError={!!errors.newPassword}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            name="repeatPassword"
            control={control}
            render={({ field }) => (
              <TextField
                width="100%"
                label="Repetir Contraseña"
                required
                type="password"
                value={field.value}
                helperText={errors.repeatPassword?.message ? errors.repeatPassword.message : ''}
                hasError={!!errors.repeatPassword}
                onChange={field.onChange}
              />
            )}
          />
        </Container>
      </Container>
    </Modal>
  )
}

export default UpdatePasswordModal
