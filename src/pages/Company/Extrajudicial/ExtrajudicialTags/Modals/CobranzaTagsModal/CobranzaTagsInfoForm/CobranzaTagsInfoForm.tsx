import { ExtTagType } from '@/types/extrajudicial/ext-tag.type'
import Select from '@/ui/Select'
import { SelectItemType } from '@/ui/Select/interfaces'
import TextField from '@/ui/fields/TextField'
import { Controller, useFormContext } from 'react-hook-form'

type CobranzaTagsInforFormProps = {
  tagGroups: ExtTagType[]
}

const CobranzaTagsInfoForm = ({ tagGroups }: CobranzaTagsInforFormProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<ExtTagType>()

  const optionsTagGroup: Array<SelectItemType> = tagGroups.map((group) => {
    return {
      key: String(group.id),
      label: group.name,
    }
  })

  return (
    <>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
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
        name="color"
        control={control}
        render={({ field }) => (
          <TextField
            width="100%"
            label="Color:"
            value={field.value}
            hasError={!!errors.color}
            onChange={(e) => {
              field.onChange(e.target.value)
            }}
          />
        )}
      />

      <Controller
        name="tagGroupId"
        control={control}
        render={({ field }) => (
          <Select
            width="100%"
            label="Grupo de etiquetas:"
            value={!!field.value ? String(field.value) : ''}
            options={optionsTagGroup}
            onChange={(key) => {
              field.onChange(parseInt(key))
            }}
            hasError={!!errors.tagGroupId}
          />
        )}
      />
    </>
  )
}

export default CobranzaTagsInfoForm
