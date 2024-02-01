import { useLoloContext } from '@/contexts/LoloProvider'
import { getExtTagGroupsByCHB } from '@/services/extrajudicial/ext-tag-group.service'
import { ExtTagType } from '@/types/extrajudicial/ext-tag.type'
import Select from '@/ui/Select'
import { SelectItemType } from '@/ui/Select/interfaces'
import TextField from '@/ui/fields/TextField'
import notification from '@/ui/notification'
import { AxiosResponse } from 'axios'
import { Controller, useFormContext } from 'react-hook-form'
import { useQuery } from 'react-query'

const CobranzaTagsInfoForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<ExtTagType>()

  const {
    bank: {
      selectedBank: { idCHB },
    },
  } = useLoloContext()

  const { data } = useQuery<AxiosResponse<Array<ExtTagType>, Error>>(
    'GET_EXT_TAG_GROUPS_BY_CHB',
    async () => {
      return await getExtTagGroupsByCHB(parseInt(idCHB))
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

  const tagGroups = data?.data ?? []

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
