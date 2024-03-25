import { useMutation, useQuery, useQueryClient } from 'react-query'
import companyFilesCache from '../../CobranzaFilesTable/utils/company-files.cache'
import { FileType } from '@/types/extrajudicial/file.type'
import { FormProvider, useForm } from 'react-hook-form'
import { ModalCobranzaFilesResolver } from './CobranzaFilesModal.yup'
import { useState } from 'react'
import { AxiosError, AxiosResponse } from 'axios'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { postCreateFile } from '@/services/extrajudicial/file.service'
import notification from '@/ui/notification'
import Modal from '@/ui/Modal'
import Container from '@/ui/Container'
import Button from '@/ui/Button'
import { useLoloContext } from '@/contexts/LoloProvider'
import CobranzaFilesInfoForm from './CobranzaFilesInfoForm'
import { ExtTagType } from '@/types/extrajudicial/ext-tag.type'
import { KEY_COBRANZA_URL_TAG_CODE_CACHE } from '@/pages/extrajudicial/ExtrajudicialTags/TagsTable/utils/company-tags.cache'
import { getExtTagsByCHBAndTagGroupId } from '@/services/extrajudicial/ext-tag.service'

type CobranzaFilesModalProps = {
  visible: boolean
  onClose: () => void
  clientId?: number
  clientCode?: number
}

const CobranzaFilesModal = ({ visible, onClose, clientId = 0, clientCode = 0 }: CobranzaFilesModalProps) => {
  const queryClient = useQueryClient()
  const {
    actions: { createCobranzaFilesCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = companyFilesCache(queryClient)

  const {
    bank: { selectedBank },
    client: { customer },
  } = useLoloContext()

  const [formData, setFormData] = useState<FormData>(new FormData())

  const formMethods = useForm<Omit<FileType, 'id' | 'name' | 'originalName' | 'createdAt'>>({
    resolver: ModalCobranzaFilesResolver,
    mode: 'all',
    defaultValues: {
      clientId,
    },
  })

  const {
    getValues,
    reset,
    formState: { isValid },
  } = formMethods

  const { isLoading: loadingCreateCobranzaFile, mutate: createCobranzaFile } = useMutation<
    AxiosResponse<FileType[]>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { tagId } = getValues()
      return await postCreateFile(
        formData,
        Number(customer.id),
        Number(selectedBank.idCHB),
        clientCode,
        clientId,
        tagId
      )
    },
    {
      onSuccess: (result) => {
        const { tagId } = getValues()
        const tagsList = result.data.map((file) => {
          return {
            ...file,
            classificationTag: { name: findTag(tagId)?.name ?? '', color: findTag(tagId)?.color ?? '' },
          }
        })

        createCobranzaFilesCache(tagsList, clientId)
        notification({ type: 'success', message: 'Archivo creado' })
        handleClickCloseModal()
      },
      onMutate: () => {
        return onMutateCache(clientId)
      },
      onSettled: () => {
        onSettledCache(clientId)
      },
      onError: (error, _, context: any) => {
        onErrorCache(context, clientId)
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )

  const { data } = useQuery<AxiosResponse<Array<ExtTagType>, Error>>(
    [`${KEY_COBRANZA_URL_TAG_CODE_CACHE}-TAGS-BY-CHB-AND-TAG-GROUP-ID`],
    async () => {
      //TODO: Improve this logic to get the tagId
      let tagId = 0
      if (selectedBank.idCHB === '1') {
        tagId = 1
      } else if (selectedBank.idCHB == '4') {
        tagId = 4
      }

      return await getExtTagsByCHBAndTagGroupId(parseInt(selectedBank.idCHB.length ? selectedBank.idCHB : '0'), tagId)
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

  const findTag = (id: number) => {
    return tags.find((tag) => tag.id === id)
  }

  const onAddFile = () => {
    createCobranzaFile()
  }

  const setStateFormData = (formData: FormData) => {
    setFormData(formData)
  }

  const handleClickCloseModal = () => {
    setFormData(new FormData())
    reset()
    onClose()
  }

  const isThereFile = formData.getAll('file').length

  return (
    <FormProvider {...formMethods}>
      <Modal
        visible={visible}
        onClose={handleClickCloseModal}
        id="modal-files"
        title="Agregar Archivos"
        contentOverflowY="auto"
        size="small"
        minHeight="60vh"
        footer={
          <Container width="100%" height="75px" display="flex" justifyContent="end" alignItems="center" gap="20px">
            <Button
              width="125px"
              label="Agregar"
              shape="default"
              trailingIcon="ri-add-fill"
              onClick={onAddFile}
              loading={loadingCreateCobranzaFile}
              disabled={!isValid || !isThereFile}
            />
          </Container>
        }
      >
        <Container
          width="100%"
          height="60vh"
          display="flex"
          justify-content="center"
          flexDirection="column"
          align-items="center"
          gap="20px"
        >
          <Container width="100%" display="flex" flexDirection="column" gap="10px" padding="20px">
            <CobranzaFilesInfoForm setStateFormData={setStateFormData} tags={tags} />
          </Container>
        </Container>
      </Modal>
    </FormProvider>
  )
}

export default CobranzaFilesModal
