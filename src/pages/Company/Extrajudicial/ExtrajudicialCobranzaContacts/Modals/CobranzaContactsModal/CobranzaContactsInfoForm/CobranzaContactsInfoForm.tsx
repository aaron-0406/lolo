import { Controller, useFormContext } from 'react-hook-form'
import { ExtContactType } from '@/types/extrajudicial/ext-contact.type'
import { ExtContactTypeType } from '@/types/extrajudicial/ext-contact-type.type'
import { SelectItemType } from '@/ui/Select/interfaces'
import TextField from '@/ui/fields/TextField'
import Select from '@/ui/Select'

type CobranzaContactsInfoFormProps = {
  clientId: number
  contactsType: ExtContactTypeType[]
}

const CobranzaContactsInfoForm = ({ clientId, contactsType }: CobranzaContactsInfoFormProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<ExtContactType>()

  const optionsStates: Array<SelectItemType> = contactsType.map((record: ExtContactTypeType) => {
    return { key: String(record.id), label: record.contactType }
  })

  return (
    <>
      <Controller
        name="dni"
        control={control}
        render={({ field }) => (
          <TextField
            disabled={!clientId}
            width="100%"
            label="DNI:"
            value={field.value}
            hasError={!!errors.dni}
            onChange={(e) => {
              field.onChange(e.target.value)
            }}
          />
        )}
      />

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

      <Controller
        name="extContactTypeId"
        control={control}
        render={({ field }) => (
          <Select
            width="100%"
            disabled={!clientId}
            label="Tipo:"
            value={String(field.value)}
            options={optionsStates}
            onChange={(key) => {
              field.onChange(Number(key))
            }}
            hasError={!!errors.extContactTypeId}
          />
        )}
      />
    </>
  )
}

export default CobranzaContactsInfoForm
