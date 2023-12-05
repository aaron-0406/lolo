import { ExtContactType } from '@/types/extrajudicial/ext-contact.type'
import TextField from '@/ui/fields/TextField'
import { Controller, useFormContext } from 'react-hook-form'

type CobranzaContactsInfoFormProps = {
  clientId: number
}

const CobranzaContactsInfoForm = ({ clientId }: CobranzaContactsInfoFormProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<ExtContactType>()

  return (
    <>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            disabled={!clientId}
            width="100%"
            label="Nombre:"
            value={field.value}
            hasError={!!errors.name}
            onChange={(e) => {
              field.onChange(e.target.value)
            }}
          />
        )}
      />

      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <TextField
            disabled={!clientId}
            width="100%"
            label="Teléfono:"
            value={field.value}
            hasError={!!errors.phone}
            onChange={(e) => {
              field.onChange(e.target.value)
            }}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            disabled={!clientId}
            width="100%"
            label="Correo:"
            value={field.value}
            hasError={!!errors.email}
            onChange={(e) => {
              field.onChange(e.target.value)
            }}
          />
        )}
      />
    </>
  )
}

export default CobranzaContactsInfoForm
