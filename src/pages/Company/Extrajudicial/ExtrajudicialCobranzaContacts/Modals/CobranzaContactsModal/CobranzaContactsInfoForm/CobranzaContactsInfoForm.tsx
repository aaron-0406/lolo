import { Controller, useFormContext } from 'react-hook-form'
import { ExtContactType } from '@/types/extrajudicial/ext-contact.type'
import { ExtContactTypeType } from '@/types/extrajudicial/ext-contact-type.type'
import { SelectItemType } from '@/ui/Select/interfaces'
import TextField from '@/ui/fields/TextField'
import Select from '@/ui/Select'
import { useLoloContext } from '@/contexts/LoloProvider'
import Label from '@/ui/Label'
import Container from '@/ui/Container'
import Button from '@/ui/Button'
import useModal from '@/hooks/useModal'
import ContactTypeModal from '@/pages/extrajudicial/ExtrajudicialContactType/Modals/ContactTypeModal'

type CobranzaContactsInfoFormProps = {
  clientId: number
  contactsType: ExtContactTypeType[]
}

const CobranzaContactsInfoForm = ({ clientId, contactsType }: CobranzaContactsInfoFormProps) => {
  const {
    bank: {
      selectedBank: { idCHB },
    },
  } = useLoloContext()

  const {
    control,
    getValues,
    formState: { errors },
  } = useFormContext<
    ExtContactType & {
      extContactType: { contactType: string; customerHasBankId: string }
    }
  >()

  const { visible: visibleModalAdd, showModal: showModalAdd, hideModal: hideModalAdd } = useModal()

  const onShowModal = () => {
    showModalAdd()
  }

  const onCloseModal = () => {
    hideModalAdd()
  }

  const extContactType = getValues('extContactType')
  const showExtContactType = extContactType && extContactType.customerHasBankId != idCHB

  const optionsStates: Array<SelectItemType> = contactsType.map((record: ExtContactTypeType) => {
    return { key: String(record.id), label: record.contactType }
  })

  return (
    <>
      <Controller
        name="extContactTypeId"
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
                hasError={!!errors.extContactTypeId}
              />

              <Button
                shape="round"
                leadingIcon="ri-add-fill"
                size="small"
                onClick={onShowModal}
                disabled={!idCHB}
                permission="P18-01"
              />
            </Container>

            {showExtContactType && <Label label={`Acción: ${extContactType?.contactType}`} color="Primary5" />}
          </Container>
        )}
      />

      <Controller
        name="dni"
        control={control}
        render={({ field }) => (
          <TextField
            disabled={!clientId}
            width="100%"
            label="DNI:"
            value={field.value}
            hasError={!!errors.dni}
            onChange={(e) => {
              field.onChange(e.target.value)
            }}
          />
        )}
      />

      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            disabled={!clientId}
            width="100%"
            label="Nombre:"
            value={field.value}
            hasError={!!errors.name}
            onChange={(e) => {
              field.onChange(e.target.value)
            }}
          />
        )}
      />

      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <TextField
            disabled={!clientId}
            width="100%"
            label="Teléfono:"
            value={field.value}
            hasError={!!errors.phone}
            onChange={(e) => {
              field.onChange(e.target.value)
            }}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            disabled={!clientId}
            width="100%"
            label="Correo:"
            value={field.value}
            hasError={!!errors.email}
            onChange={(e) => {
              field.onChange(e.target.value)
            }}
          />
        )}
      />

      <ContactTypeModal visible={visibleModalAdd} onClose={onCloseModal} />
    </>
  )
}

export default CobranzaContactsInfoForm
