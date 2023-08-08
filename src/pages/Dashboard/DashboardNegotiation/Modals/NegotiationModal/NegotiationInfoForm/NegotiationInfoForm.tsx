import { Controller, useFormContext } from 'react-hook-form'
import { NegotiationType } from '../../../../../../shared/types/negotiation.type'
import Label from '../../../../../../ui/Label'
import TextField from '../../../../../../ui/fields/TextField'
import Container from '../../../../../../ui/Container'
import Select from '../../../../../../ui/Select'
import { SelectItemType } from '../../../../../../ui/Select/interfaces'
import { useDashContext } from '../../../../../../shared/contexts/DashProvider'

const NegotiationInfoForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<NegotiationType>()

  const {
    dashCustomer: { selectedCustomer },
  } = useDashContext()

  const optionsSelect: Array<SelectItemType> = selectedCustomer.customerBanks.map((customerBank) => {
    return {
      key: String(customerBank.CUSTOMER_HAS_BANK.id),
      label: customerBank.name,
    }
  })

  return (
    <Container
      width="100%"
      display="flex"
      justify-content="center"
      flexDirection="column"
      align-items="center"
      gap="20px"
      padding="20px"
    >
      <Container width="100%" display="flex" gap="10px">
        <Label label="Nombre: " />
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField width="100%" value={field.value} onChange={field.onChange} hasError={!!errors.name} />
          )}
        />
      </Container>

      <Container width="100%" display="flex" gap="10px">
        <Label label="CustomerBank: " />
        <Controller
          name="customerHasBankId"
          control={control}
          render={({ field }) => (
            <Select
              width="100%"
              options={optionsSelect}
              value={String(field.value)}
              onChange={(key) => {
                field.onChange(parseInt(key))
              }}
              hasError={!!errors.id}
            />
          )}
        />
      </Container>
    </Container>
  )
}

export default NegotiationInfoForm
