import { Controller, useFormContext } from 'react-hook-form'
import { CustomerType } from '../../../../../shared/types/customer.type'
import Container from '../../../../../ui/Container'
import TextAreaField from '../../../../../ui/fields/TextAreaField'
import Label from '../../../../../ui/Label'
import TextField from '../../../../../ui/fields/TextField'

const AddCustomerInfo = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<CustomerType>()

  return (
    <>
      <Container width="100%" display="flex" gap="10px">
        <Label label="Ruc: " />
        <Controller
          name="ruc"
          control={control}
          render={({ field }) => (
            <TextField width="100%" value={field.value} onChange={field.onChange} hasError={!!errors.ruc} />
          )}
        />
      </Container>
      <Container width="100%" display="flex" gap="10px">
        <Label label="Compañía: " />
        <Controller
          name="companyName"
          control={control}
          render={({ field }) => (
            <TextField width="100%" value={field.value} onChange={field.onChange} hasError={!!errors.companyName} />
          )}
        />
      </Container>
      <Container width="100%" display="flex" gap="10px">
        <Label label="URL: " />
        <Controller
          name="urlIdentifier"
          control={control}
          render={({ field }) => (
            <TextField width="100%" value={field.value} onChange={field.onChange} hasError={!!errors.urlIdentifier} />
          )}
        />
      </Container>
      <Container width="100%" display="flex" gap="10px">
        <Label label="Description: " />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextAreaField
              width="100%"
              rows={1}
              value={field.value}
              onChange={field.onChange}
              hasError={!!errors.description}
            />
          )}
        />
      </Container>
    </>
  )
}

export default AddCustomerInfo
