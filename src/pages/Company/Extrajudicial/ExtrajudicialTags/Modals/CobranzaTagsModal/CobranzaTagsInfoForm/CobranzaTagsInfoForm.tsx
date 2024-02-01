import { ExtTagType } from '@/types/extrajudicial/ext-tag.type'
import TextField from '@/ui/fields/TextField'
import { Controller, useFormContext } from 'react-hook-form'

const CobranzaTagsInfoForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<ExtTagType>()

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
          <TextField
            width="100%"
            label="Grupo de etiquetas:"
            value={field.value}
            hasError={!!errors.tagGroupId}
            onChange={(e) => {
              field.onChange(e.target.value)
            }}
          />
        )}
      />
    </>
  )
}

export default CobranzaTagsInfoForm
