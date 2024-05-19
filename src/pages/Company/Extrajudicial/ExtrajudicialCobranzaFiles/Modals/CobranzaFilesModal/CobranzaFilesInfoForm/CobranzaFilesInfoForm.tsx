import { ExtTagType } from '@/types/extrajudicial/ext-tag.type'
import { FileType } from '@/types/extrajudicial/file.type'
import Select from '@/ui/Select'
import { useLoloContext } from '@/contexts/LoloProvider'
import { SelectItemType } from '@/ui/Select/interfaces'
import InputFile from '@/ui/inputs/InputFile'
import notification from '@/ui/notification'
import { Controller, useFormContext } from 'react-hook-form'
import Container from '@/ui/Container'
import Button from '@/ui/Button'
import useModal from '@/hooks/useModal'
import CobranzaTagsModal from '@/pages/extrajudicial/ExtrajudicialTags/Modals/CobranzaTagsModal'

type CobranzaFilesInfoFormProps = {
  setStateFormData: (formData: FormData) => void
  tags: ExtTagType[]
}

const CobranzaFilesInfoForm = ({ setStateFormData, tags }: CobranzaFilesInfoFormProps) => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
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

  const { visible: visibleModalAdd, showModal: showModalAdd, hideModal: hideModalAdd } = useModal()

  const optionsTags: Array<SelectItemType> = tags.map((tag) => {
    return {
      key: String(tag.id),
      label: tag.name,
    }
  })

  const onShowModal = () => {
    showModalAdd()
  }

  const onCloseModal = () => {
    hideModalAdd()
  }

  return (
    <>
      <Controller
        name="tagId"
        control={control}
        render={({ field }) => (
          <Container display="flex" flexDirection="row" gap="10px" flexWrap="nowrap" width="100%" alignItems="flex-end">
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
            <Button
              shape="round"
              leadingIcon="ri-add-fill"
              size="small"
              onClick={onShowModal}
              disabled={!chb}
              permission="P08-01"
            />
          </Container>
        )}
      />

      <InputFile onChangeFiles={handleInputFileChange} multiple />
      <CobranzaTagsModal visible={visibleModalAdd} onClose={onCloseModal} />
    </>
  )
}

export default CobranzaFilesInfoForm
