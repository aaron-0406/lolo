import { Controller, useFormContext } from 'react-hook-form'
import { GuarantorType } from '../../../../../../../shared/types/extrajudicial/guarantor.type'
import Container from '../../../../../../../ui/Container'
import TextAreaField from '../../../../../../../ui/fields/TextAreaField'
import Label from '../../../../../../../ui/Label'

const ModalFiadoresInfo = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<GuarantorType>()

  return (
    <Container width="100%" display="flex" flexDirection="column" gap="10px">
      <Container width="100%" display="flex" gap="10px">
        <Label label="Nombre: " />
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextAreaField
              width="100%"
              rows={1}
              value={field.value}
              onChange={field.onChange}
              hasError={!!errors.name}
            />
          )}
        />
      </Container>

      <Container width="100%" display="flex" gap="10px">
        <Label label="Teléfono: " />
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <TextAreaField
              width="100%"
              rows={1}
              value={field.value}
              onChange={field.onChange}
              hasError={!!errors.phone}
            />
          )}
        />
      </Container>

      <Container width="100%" display="flex" gap="10px">
        <Label label="Correo: " />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextAreaField
              width="100%"
              rows={1}
              value={field.value}
              onChange={field.onChange}
              hasError={!!errors.email}
            />
          )}
        />
      </Container>
    </Container>
  )
}

export default ModalFiadoresInfo
