import { Controller, useFormContext } from 'react-hook-form'
import { ExtAddressType } from '@/types/extrajudicial/ext-address-type.type'
import TextField from '@/ui/fields/TextField'

const AddressTypeInfoForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<ExtAddressType>()

  return (
    <>
      <Controller
        name="type"
        control={control}
        render={({ field }) => (
          <TextField
            label="Tipo de Dirección"
            width="100%"
            value={field.value}
            onChange={field.onChange}
            hasError={!!errors.type}
          />
        )}
      />
    </>
  )
}

export default AddressTypeInfoForm
