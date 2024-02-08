import { useLoloContext } from '@/contexts/LoloProvider'
import { KEY_COBRANZA_URL_TAG_CODE_CACHE } from '@/pages/extrajudicial/ExtrajudicialTags/TagsTable/utils/company-tags.cache'
import { getExtTagsByCHBAndTagGroupId } from '@/services/extrajudicial/ext-tag.service'
import { ExtTagType } from '@/types/extrajudicial/ext-tag.type'
import { FileType } from '@/types/extrajudicial/file.type'
import Select from '@/ui/Select'
import { SelectItemType } from '@/ui/Select/interfaces'
import InputFile from '@/ui/inputs/InputFile'
import notification from '@/ui/notification'
import { AxiosResponse } from 'axios'
import { Controller, useFormContext } from 'react-hook-form'
import { useQuery } from 'react-query'

type CobranzaFilesInfoFormProps = {
  setStateFormData: (formData: FormData) => void
}

const CobranzaFilesInfoForm = ({ setStateFormData }: CobranzaFilesInfoFormProps) => {
  const {
    bank: {
      selectedBank: { idCHB },
    },
  } = useLoloContext()

  const {
    control,
    formState: { errors },
  } = useFormContext<Omit<FileType, 'id' | 'name' | 'originalName' | 'createdAt'>>()

  const handleInputFileChange = async (files: FileList | null) => {
    if (files) {
      try {
        const formData = new FormData()
        if (files.length > 0) {
          const archivos = files

          for (let i = 0; i < archivos.length; i += 1) {
            const element = archivos[i]
            formData.append('file', element)
          }

          setStateFormData(formData)
        } else {
          setStateFormData(new FormData())
        }
      } catch (error: any) {
        notification({
          type: 'info',
          message: error.response.data.message,
        })
      }
    }
  }

  const { data } = useQuery<AxiosResponse<Array<ExtTagType>, Error>>(
    [`${KEY_COBRANZA_URL_TAG_CODE_CACHE}-TAGS-BY-CHB-AND-TAG-GROUP-ID`],
    async () => {
      return await getExtTagsByCHBAndTagGroupId(parseInt(idCHB.length ? idCHB : '0'), 1)
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

  const tags = data?.data ?? []

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
            label="Grupo de etiquetas:"
            value={!!field.value ? String(field.value) : ''}
            options={optionsTags}
            onChange={(key) => {
              field.onChange(parseInt(key))
            }}
            hasError={!!errors.tagId}
          />
        )}
      />

      <InputFile onChangeFiles={handleInputFileChange} multiple />
    </>
  )
}

export default CobranzaFilesInfoForm
