import { Controller, useFormContext } from 'react-hook-form'
import { DirectionType } from '@/types/extrajudicial/direction.type'
import { getAddressesTypeByCHB } from '@/services/extrajudicial/ext-address-type.service'
import Select from '@/ui/Select'
import { SelectItemType } from '@/ui/Select/interfaces'
import TextAreaField from '@/ui/fields/TextAreaField'
import { useLoloContext } from '@/contexts/LoloProvider'
import { useQuery } from 'react-query'
import { ExtAddressType } from '@/types/extrajudicial/ext-address-type.type'
import { KEY_EXT_ADDRESS_TYPE_CACHE } from '@/pages/extrajudicial/ExtrajudicialAddressType/AddressTypeTable/utils/ext-address-type.cache'
import notification from '@/ui/notification'
import Label from '@/ui/Label'
import Container from '@/ui/Container'
import Button from '@/ui/Button'
import AddressTypeModal from '@/pages/extrajudicial/ExtrajudicialAddressType/Modals/AddressTypeModal'
import useModal from '@/hooks/useModal'

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
    getValues,
    formState: { errors },
  } = useFormContext<
    Omit<DirectionType, 'id' | 'createdAt'> & { addressType: { type: string; customerHasBankId: string } }
  >()

  const addressType = getValues('addressType')
  const showAddressType = addressType && addressType.customerHasBankId != chb

  const { visible: visibleModalAdd, showModal: showModalAdd, hideModal: hideModalAdd } = useModal()

  const onShowModal = () => {
    showModalAdd()
  }

  const onCloseModal = () => {
    hideModalAdd()
  }

  const { data: addressesTypeData } = useQuery(
    [KEY_EXT_ADDRESS_TYPE_CACHE, parseInt(chb.length ? chb : '0')],
    async () => {
      return await getAddressesTypeByCHB(parseInt(chb.length ? chb : '0'))
    },
    {
      onError: (error: any) => {
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )

  const addressesType: ExtAddressType[] = addressesTypeData?.data ?? []

  const optionsStates: Array<SelectItemType> = addressesType.map((record: ExtAddressType) => {
    return { key: String(record.id), label: record.type }
  })

  return (
    <>
      <Controller
        name="addressTypeId"
        control={control}
        render={({ field }) => (
          <Container display="flex" flexDirection="column">
            <Container
              display="flex"
              flexDirection="row"
              gap="10px"
              flexWrap="nowrap"
              width="100%"
              alignItems="flex-end"
            >
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

              <Button
                shape="round"
                leadingIcon="ri-add-fill"
                size="small"
                onClick={onShowModal}
                disabled={!chb}
                permission="P16-01"
              />
            </Container>

            {showAddressType && <Label label={`Tipo: ${addressType?.type}`} color="Primary5" />}
          </Container>
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

      <AddressTypeModal visible={visibleModalAdd} onClose={onCloseModal} />
    </>
  )
}

export default CobranzaAddressesInfoForm
