import { Controller, useFormContext } from 'react-hook-form'
import { DirectionType } from '@/types/extrajudicial/direction.type'
import Container from '@/ui/Container'
import TextAreaField from '@/ui/fields/TextAreaField'
import Label from '@/ui/Label'
import Select from '@/ui/Select'
import { SelectItemType } from '@/ui/Select/interfaces'
import { getAddressesTypeByCHB } from '@/services/extrajudicial/ext-address-type.service'
import { useQuery } from 'react-query'
import { useLoloContext } from '@/contexts/LoloProvider'
import { ExtAddressType } from '@/types/extrajudicial/ext-address-type.type'

const ModalAddressesInfo = () => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const {
    control,
    formState: { errors },
  } = useFormContext<DirectionType>()

  const { data: addressesTypeData } = useQuery(
    ['KEY_EXT_ADDRESS_TYPE_CACHE', parseInt(chb.length ? chb : '0')],
    async () => {
      return await getAddressesTypeByCHB(parseInt(chb.length ? chb : '0'))
    }
  )

  const addressesType = addressesTypeData?.data ?? []

  const optionsStates: Array<SelectItemType> = addressesType.map((record: ExtAddressType) => {
    return { key: String(record.id), label: record.type }
  })

  return (
    <Container width="100%" display="flex" flexDirection="column" gap="10px">
      <Container width="100%" display="flex" gap="10px">
        <Label label="Dirección: " />
        <Controller
          name="direction"
          control={control}
          render={({ field }) => (
            <TextAreaField
              width="100%"
              rows={1}
              value={field.value}
              onChange={field.onChange}
              hasError={!!errors.direction}
            />
          )}
        />
      </Container>

      <Container width="100%" display="flex" gap="10px">
        <Label label="Tipo:" />

        <Controller
          name="addressTypeId"
          control={control}
          render={({ field }) => (
            <Select
              width="100%"
              value={String(field.value)}
              options={optionsStates}
              onChange={(key) => {
                field.onChange(Number(key))
              }}
              hasError={!!errors.addressTypeId}
            />
          )}
        />
      </Container>
    </Container>
  )
}

export default ModalAddressesInfo
