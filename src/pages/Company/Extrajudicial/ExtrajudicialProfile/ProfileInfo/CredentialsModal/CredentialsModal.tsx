import { useMutation } from 'react-query'
import { Controller, useForm } from 'react-hook-form'
import { CredentialsSchemaResolver } from './Credentials.yup'
import { CredentialsFormType } from './hookform.type'
import Modal from '../../../../../../ui/Modal'
import Container from '../../../../../../ui/Container'
import Button from '../../../../../../ui/Button'
import TextField from '../../../../../../ui/fields/TextField'
import { notification } from '../../../../../../ui/notification/notification'
import { changeCredentialsService } from '../../../../../../shared/services/extrajudicial/auth.service'
import { useLoloContext } from '../../../../../../shared/contexts/LoloProvider'
import storage from '../../../../../../shared/utils/storage'

type CredentialsModalProps = {
  visible: boolean
  onClose: () => void
}

const CredentialsModal = ({ visible, onClose }: CredentialsModalProps) => {
  const {
    customerUser: {
      user: { phone, dni, lastName, name },
      setUser,
    },
  } = useLoloContext()

  const {
    formState: { errors, isValid, isDirty },
    control,
    getValues,
    reset,
  } = useForm<CredentialsFormType>({
    resolver: CredentialsSchemaResolver,
    mode: 'all',
    defaultValues: {
      name: name,
      lastname: lastName,
      dni: dni,
      phone: phone,
    },
  })

  const { mutate: changeCredentialsQuery, isLoading } = useMutation<any, Error>(
    async (): Promise<any> => {
      notification({ type: 'info', message: 'Espere por favor...' })
      return await changeCredentialsService(getValues())
    },
    {
      onSuccess: ({ data }) => {
        storage.set('token', data.token)
        setUser(data.user)
        reset(
          { name: data.user.name, lastname: data.user.lastName, dni: data.user.dni, phone: data.user.phone },
          { keepDirty: false }
        )
        notification({ type: 'success', message: 'Credenciales modificadas' })
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

  const onUpdateCredentials = () => {
    changeCredentialsQuery()
  }

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      id="modal-update-credentials"
      title="Modificar Credenciales"
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
            disabled={!isDirty || !isValid}
            onClick={onUpdateCredentials}
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
        <Container width="100%" display="flex" flexDirection="column" gap="25px">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                width="100%"
                label="Nombre"
                required
                type="text"
                value={field.value}
                helperText={errors.name?.message ? errors.name.message : ''}
                hasError={!!errors.name}
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            name="lastname"
            control={control}
            render={({ field }) => (
              <TextField
                width="100%"
                label="Apellido"
                required
                type="text"
                value={field.value}
                helperText={errors.lastname?.message ? errors.lastname.message : ''}
                hasError={!!errors.lastname}
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            name="dni"
            control={control}
            render={({ field }) => (
              <TextField
                width="100%"
                label="DNI"
                required
                type="text"
                value={field.value}
                helperText={errors.dni?.message ? errors.dni.message : ''}
                hasError={!!errors.dni}
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <TextField
                width="100%"
                label="Teléfono"
                required
                type="text"
                value={field.value}
                helperText={errors.phone?.message ? errors.phone.message : ''}
                hasError={!!errors.phone}
                onChange={field.onChange}
              />
            )}
          />
        </Container>
      </Container>
    </Modal>
  )
}

export default CredentialsModal
