import React from 'react'
import { useFormContext } from 'react-hook-form'
import { ECampoType } from '../../../../../shared/types/ecampo.type'
import Container from '../../../../../ui/Container'
import TextField from '../../../../../ui/fields/TextField'
import Label from '../../../../../ui/Label'
import { TemplateFormType } from '../../hookforms.interfaces'

type ChangeEvent = React.ChangeEvent<HTMLInputElement>
type TemplateInfoFieldType = {
  ecampo: ECampoType
}

const TemplateInfoField: React.FC<TemplateInfoFieldType> = (props) => {
  const { setValue, watch } = useFormContext<TemplateFormType>()

  const handleChangeValue = (e: ChangeEvent) => {
    setValue(
      'values',
      watch('values').map((value) => {
        if (field === value.field) return { ...value, value: e.target.value }
        return value
      })
    )
  }
  const {
    ecampo: { field, name },
  } = props
  return (
    <Container>
      <Label label={name} name={field} />
      <TextField
        width="100%"
        name={field}
        value={
          watch('values').filter((item) => field === item.field)[0]
            ? watch('values').filter((item) => field === item.field)[0].value
            : ''
        }
        onChange={handleChangeValue}
      />
    </Container>
  )
}

export default TemplateInfoField
