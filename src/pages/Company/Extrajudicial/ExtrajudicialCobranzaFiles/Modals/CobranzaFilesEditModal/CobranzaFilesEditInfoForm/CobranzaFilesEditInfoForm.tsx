import { ExtTagType } from '@/types/extrajudicial/ext-tag.type'
import { FileType } from '@/types/extrajudicial/file.type'
import Select from '@/ui/Select'
import { SelectItemType } from '@/ui/Select/interfaces'
import TextField from '@/ui/fields/TextField'
import { Controller, useFormContext } from 'react-hook-form'

type CobranzaFilesEditInfoFormProps = {
  tags: ExtTagType[]
}

const CobranzaFilesEditInfoForm = ({ tags }: CobranzaFilesEditInfoFormProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<Omit<FileType, 'id' | 'name' | 'createdAt'>>()

  const optionsTags: Array<SelectItemType> = tags.map((tag) => {
    return {
      key: String(tag.id),
      label: tag.name,
    }
  })

  return (
    <>
      <Controller
        name="tagId"
        control={control}
        render={({ field }) => (
          <Select
            width="100%"
            label="Clasificación de archivo:"
            placeholder="Selecciona una clasificación"
            value={!!field.value ? String(field.value) : ''}
            options={optionsTags}
            onChange={(key) => {
              field.onChange(parseInt(key))
            }}
            hasError={!!errors.tagId}
          />
        )}
      />

      <Controller
        name="originalName"
        control={control}
        render={({ field }) => (
          <TextField width="100%" value={field.value} onChange={field.onChange} hasError={!!errors.originalName} />
        )}
      />
    </>
  )
}

export default CobranzaFilesEditInfoForm
