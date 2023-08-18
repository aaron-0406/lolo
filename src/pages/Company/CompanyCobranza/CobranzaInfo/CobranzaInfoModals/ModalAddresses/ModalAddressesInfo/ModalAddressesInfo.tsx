import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { DirectionType } from '../../../../../../../shared/types/extrajudicial/direction.type'
import Container from '../../../../../../../ui/Container'
import TextAreaField from '../../../../../../../ui/fields/TextAreaField'
import Label from '../../../../../../../ui/Label'
import Select from '../../../../../../../ui/Select'
import { SelectItemType } from '../../../../../../../ui/Select/interfaces'

const ModalAddressesInfo = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<DirectionType>()

  const optionsStates: Array<SelectItemType> = [
    { key: 'DIR DOMICILIARIA', label: 'DIR DOMICILIARIA' },
    { key: 'DIR GARANTIA', label: 'DIR GARANTIA' },
  ]

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
          name="type"
          control={control}
          render={({ field }) => (
            <Select
              width="100%"
              value={String(field.value)}
              options={optionsStates}
              onChange={(key) => {
                field.onChange(key)
              }}
              hasError={!!errors.type}
            />
          )}
        />
      </Container>
    </Container>
  )
}

export default ModalAddressesInfo
