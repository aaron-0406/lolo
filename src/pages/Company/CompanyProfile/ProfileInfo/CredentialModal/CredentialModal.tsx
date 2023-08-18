import Modal from '../../../../../ui/Modal'
import { useForm, Controller } from 'react-hook-form'
import { CredentialFormType } from './hookform.type'
import { CredentialsResolver } from './Credentials.yup'
import Container from '../../../../../ui/Container/Container'
import TextField from '../../../../../ui/fields/TextField/TextField'
import Button from '../../../../../ui/Button/Button'
import { notification } from '../../../../../ui/notification/notification'
import { changePasswordService } from '../../../../../shared/services/extrajudicial/auth.service'
import { useMutation } from 'react-query'

type CredentialModalProps = {
  visible: boolean
  onClose: () => void
}
const CredentialModal = ({ visible, onClose }: CredentialModalProps) => {
  const {
    formState: { errors },
    control,
    handleSubmit,
    getValues,
    resetField,
  } = useForm<CredentialFormType>({
    resolver: CredentialsResolver,
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
      id="modal-credentials-edit"
      title="Modificar Credenciales"
      contentOverflowY="auto"
      size="small"
      minHeight="240px"
      footer={
        <Container width="100%" height="75px" display="flex" justifyContent="flex-end" alignItems="center">
          <Button
            width="125px"
            label="Modificar"
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

export default CredentialModal
