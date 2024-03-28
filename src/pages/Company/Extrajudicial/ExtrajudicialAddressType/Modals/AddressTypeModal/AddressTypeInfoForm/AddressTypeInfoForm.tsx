import { Controller, useFormContext } from 'react-hook-form'
import { ExtAddressType } from '@/types/extrajudicial/ext-address-type.type'
import Container from '@/ui/Container'
import Label from '@/ui/Label'
import TextField from '@/ui/fields/TextField'

const AddressTypeInfoForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<ExtAddressType>()

  return (
    <>
      <Container width="100%" display="flex" gap="10px">
        <Label label="Nombre: " />
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <TextField width="100%" value={field.value} onChange={field.onChange} hasError={!!errors.type} />
          )}
        />
      </Container>
    </>
  )
}

export default AddressTypeInfoForm
