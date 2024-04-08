import { useMutation, useQuery, useQueryClient } from 'react-query'
import companyFilesCache, {
  KEY_COBRANZA_URL_FILES_CODE_CACHE,
} from '../../CobranzaFilesTable/utils/company-files.cache'
import { editFile, getFileById } from '@/services/extrajudicial/file.service'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FileType } from '@/types/extrajudicial/file.type'
import { ModalCobranzaFilesEditResolver } from './CobranzaFilesEditModal.yup'
import { useLoloContext } from '@/contexts/LoloProvider'
import Modal from '@/ui/Modal'
import Container from '@/ui/Container'
import Button from '@/ui/Button'
import { AxiosError, AxiosResponse } from 'axios'
import { CustomErrorResponse } from 'types/customErrorResponse'
import notification from '@/ui/notification'
import { ExtTagType } from '@/types/extrajudicial/ext-tag.type'
import { KEY_COBRANZA_URL_TAG_CODE_CACHE } from '@/pages/extrajudicial/ExtrajudicialTags/TagsTable/utils/company-tags.cache'
import { getExtTagsByCHBAndTagGroupId } from '@/services/extrajudicial/ext-tag.service'
import CobranzaFilesEditInfoForm from './CobranzaFilesEditInfoForm'

type CobranzaFilesEditModalProps = {
  visible: boolean
  onClose: () => void
  idFile?: number
  clientId?: number
  clientCode?: number
  clientCustomerHasBankId?: number
}

const CobranzaFilesEditModal = ({
  visible,
  onClose,
  idFile = 0,
  clientId = 0,
  clientCode = 0,
  clientCustomerHasBankId = 0,
}: CobranzaFilesEditModalProps) => {
  const queryClient = useQueryClient()
  const [fileExtension, setFileExtension] = useState<string | null>(null)

  const {
    actions: { editCobranzaFilesCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = companyFilesCache(queryClient)

  const {
    bank: { selectedBank },
    client: { customer },
  } = useLoloContext()

  const formMethods = useForm<
    Omit<FileType, 'id' | 'name' | 'createdAt'> & { classificationTag: { name: string; customerHasBankId: string } }
  >({
    resolver: ModalCobranzaFilesEditResolver,
    mode: 'all',
    defaultValues: {
      originalName: '',
      tagId: 0,
      clientId,
    },
  })

  const {
    setValue,
    getValues,
    reset,
    formState: { isValid },
  } = formMethods

  const { isLoading: loadingEditCobranzaFile, mutate: editCobranzaFile } = useMutation<
    AxiosResponse<FileType>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { tagId, originalName } = getValues()
      const originalNameFile = addExtension(originalName)
      return await editFile({ originalName: originalNameFile, tagId }, idFile)
    },
    {
      onSuccess: (result) => {
        const { tagId } = getValues()
        const file = {
          ...result.data,
          classificationTag: { name: findTag(tagId)?.name ?? '', color: findTag(tagId)?.color ?? '' },
        }

        editCobranzaFilesCache(file)
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

  const { refetch: refetchGetCobranzaFileById } = useQuery(
    [`${KEY_COBRANZA_URL_FILES_CODE_CACHE}_GET_FILE_BY_ID`],
    async () => {
      return getFileById(Number(customer.id), clientCustomerHasBankId, clientCode, idFile)
    },
    {
      onSuccess: ({ data }) => {
        if (!!idFile) {
          const originalName = removeExtension(data.originalName)
          setFileExtension(getExtension(data.originalName))

          setValue('clientId', data.clientId, { shouldValidate: true })
          setValue('originalName', originalName, { shouldValidate: true })
          setValue('tagId', data.tagId, { shouldValidate: true })
          setValue('classificationTag', data?.classificationTag, { shouldValidate: true })
        } else {
          reset()
        }
      },
      enabled: false,
    }
  )

  const { data } = useQuery<AxiosResponse<Array<ExtTagType>, Error>>(
    [`${KEY_COBRANZA_URL_TAG_CODE_CACHE}-TAGS-BY-CHB-AND-TAG-GROUP-ID`],
    async () => {
      return await getExtTagsByCHBAndTagGroupId(parseInt(selectedBank.idCHB.length ? selectedBank.idCHB : '0'), 1)
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

  const onEditFile = () => {
    editCobranzaFile()
  }

  const handleClickCloseModal = () => {
    reset()
    onClose()
  }

  const removeExtension = (nameFile: string): string => {
    return nameFile.replace(/\.[^.]+$/, '')
  }

  const addExtension = (fileName: string) => {
    return `${fileName}.${fileExtension}`
  }

  const getExtension = (nameFile: string): string | null => {
    const match = /\.([^.]+)$/.exec(nameFile)
    return match ? match[1].toLowerCase() : null
  }

  useEffect(() => {
    if (!!idFile) {
      refetchGetCobranzaFileById()
    }
  }, [idFile, refetchGetCobranzaFileById])

  return (
    <FormProvider {...formMethods}>
      <Modal
        visible={visible}
        onClose={handleClickCloseModal}
        id="modal-files"
        title="Editar Archivo"
        contentOverflowY="auto"
        size="small"
        minHeight="60vh"
        footer={
          <Container width="100%" height="75px" display="flex" justifyContent="end" alignItems="center" gap="20px">
            <Button
              width="125px"
              label="Editar"
              shape="default"
              trailingIcon="ri-add-fill"
              onClick={onEditFile}
              loading={loadingEditCobranzaFile}
              disabled={!isValid}
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
            <CobranzaFilesEditInfoForm tags={tags} />
          </Container>
        </Container>
      </Modal>
    </FormProvider>
  )
}

export default CobranzaFilesEditModal
