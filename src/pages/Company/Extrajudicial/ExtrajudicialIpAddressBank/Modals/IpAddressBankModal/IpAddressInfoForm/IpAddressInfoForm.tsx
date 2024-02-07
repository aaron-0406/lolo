import { Controller, useFormContext } from 'react-hook-form'
import { ExtIpAddressBankType } from '@/types/extrajudicial/ext-ip-address-bank.type'
import Container from '@/ui/Container'
import Label from '@/ui/Label'
import TextField from '@/ui/fields/TextField'

const IpAddressInfoForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<ExtIpAddressBankType>()

  return (
    <>
      <Container width="100%" display="flex" gap="10%">
        <Label label="Nombre IP: " />
        <Controller
          name="addressName"
          control={control}
          render={({ field }) => (
            <TextField width="100%" value={field.value} onChange={field.onChange} hasError={!!errors.addressName} />
          )}
        />
      </Container>

      <Container width="100%" display="flex" gap="10%">
        <Label label="Dirección IP: " />
        <Controller
          name="ip"
          control={control}
          render={({ field }) => (
            <TextField width="100%" value={field.value} onChange={field.onChange} hasError={!!errors.ip} />
          )}
        />
      </Container>
    </>
  )
}

export default IpAddressInfoForm
