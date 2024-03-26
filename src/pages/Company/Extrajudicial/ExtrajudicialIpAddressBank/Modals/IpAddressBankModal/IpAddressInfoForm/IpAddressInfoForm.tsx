import { Controller, useFormContext } from 'react-hook-form'
import { ExtIpAddressBankType } from '@/types/extrajudicial/ext-ip-address-bank.type'
import TextField from '@/ui/fields/TextField'

const IpAddressInfoForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<ExtIpAddressBankType>()

  return (
    <>
      <Controller
        name="addressName"
        control={control}
        render={({ field }) => (
          <TextField
            width="100%"
            value={field.value}
            label="Nombre de la dirección IP: "
            onChange={field.onChange}
            hasError={!!errors.addressName}
          />
        )}
      />

      <Controller
        name="ip"
        control={control}
        render={({ field }) => (
          <TextField
            width="100%"
            value={field.value}
            label="Dirección IP: "
            onChange={field.onChange}
            hasError={!!errors.ip}
          />
        )}
      />
    </>
  )
}

export default IpAddressInfoForm
