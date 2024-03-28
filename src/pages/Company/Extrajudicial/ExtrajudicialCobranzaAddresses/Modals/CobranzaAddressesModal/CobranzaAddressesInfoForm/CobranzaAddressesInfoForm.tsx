import { Controller, useFormContext } from 'react-hook-form'
import { DirectionType } from '@/types/extrajudicial/direction.type'
import { getAddressesTypeByCHB } from '@/services/extrajudicial/ext-address-type.service'
import Select from '@/ui/Select'
import { SelectItemType } from '@/ui/Select/interfaces'
import TextAreaField from '@/ui/fields/TextAreaField'
import { useLoloContext } from '@/contexts/LoloProvider'
import { useQuery } from 'react-query'
import { ExtAddressType } from '@/types/extrajudicial/ext-address-type.type'

type CobranzaAddressesInfoFormProps = {
  clientId: number
}

const CobranzaAddressesInfoForm = ({ clientId }: CobranzaAddressesInfoFormProps) => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const {
    control,
    formState: { errors },
  } = useFormContext<Omit<DirectionType, 'id' | 'createdAt'>>()

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
    <>
      <Controller
        name="addressTypeId"
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
            hasError={!!errors.addressTypeId}
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
