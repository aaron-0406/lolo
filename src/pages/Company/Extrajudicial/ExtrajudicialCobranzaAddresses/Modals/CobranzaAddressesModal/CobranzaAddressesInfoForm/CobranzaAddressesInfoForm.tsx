import { Controller, useFormContext } from 'react-hook-form'
import { DirectionType } from '@/types/extrajudicial/direction.type'
import Select from '@/ui/Select'
import { SelectItemType } from '@/ui/Select/interfaces'
import TextAreaField from '@/ui/fields/TextAreaField'

type CobranzaAddressesInfoFormProps = {
  clientId: number
}

const CobranzaAddressesInfoForm = ({ clientId }: CobranzaAddressesInfoFormProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<Omit<DirectionType, 'id' | 'createdAt'>>()

  const optionsStates: Array<SelectItemType> = [
    { key: 'DIR DOMICILIARIA', label: 'DIR DOMICILIARIA' },
    { key: 'DIR GARANTIA', label: 'DIR GARANTIA' },
  ]

  return (
    <>
      <Controller
        name="type"
        control={control}
        render={({ field }) => (
          <Select
            width="100%"
            disabled={!clientId}
            label="Tipo:"
            value={String(field.value)}
            options={optionsStates}
            onChange={(key) => {
              field.onChange(key)
            }}
            hasError={!!errors.type}
          />
        )}
      />

      <Controller
        name="direction"
        control={control}
        render={({ field }) => (
          <TextAreaField
            width="100%"
            disabled={!clientId}
            label="Dirección:"
            rows={1}
            value={field.value}
            onChange={field.onChange}
            hasError={!!errors.direction}
          />
        )}
      />
    </>
  )
}

export default CobranzaAddressesInfoForm
