import { Controller, useFormContext } from 'react-hook-form'
import { ExtContactTypeType } from '@/types/extrajudicial/ext-contact-type.type'
import TextField from '@/ui/fields/TextField'

const ContactTypeInfoForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<ExtContactTypeType>()

  return (
    <>
      <Controller
        name="contactType"
        control={control}
        render={({ field }) => (
          <TextField
            label="Tipo de Contacto"
            width="100%"
            value={field.value}
            onChange={field.onChange}
            hasError={!!errors.contactType}
          />
        )}
      />
    </>
  )
}

export default ContactTypeInfoForm
