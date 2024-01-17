import { useMutation, useQuery, useQueryClient } from 'react-query'
import companyFilesCache, {
  KEY_COBRANZA_URL_FILES_CODE_CACHE,
} from '../../CobranzaFilesTable/utils/company-files.cache'
import { FileType } from '@/types/extrajudicial/file.type'
import { FormProvider, useForm } from 'react-hook-form'
import { ModalCobranzaFilesResolver } from './CobranzaFilesModal.yup'
import { useEffect, useState } from 'react'
import { AxiosError, AxiosResponse } from 'axios'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { getFileById, postCreateFile } from '@/services/extrajudicial/file.service'
import notification from '@/ui/notification'
import Modal from '@/ui/Modal'
import Container from '@/ui/Container'
import Button from '@/ui/Button'
import { useLoloContext } from '@/contexts/LoloProvider'
import CobranzaFilesInfoForm from './CobranzaFilesInfoForm'

type CobranzaFilesModalProps = {
  visible: boolean
  onClose: () => void
  isEdit?: boolean
  idFile?: number
  clientId?: number
  clientCode?: number
}

const CobranzaFilesModal = ({
  visible,
  onClose,
  isEdit = false,
  idFile = 0,
  clientId = 0,
  clientCode = 0,
}: CobranzaFilesModalProps) => {
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
    setValue,
    reset,
    formState: { isValid },
  } = formMethods

  const { isLoading: loadingCreateCobranzaFile, mutate: createCobranzaFile } = useMutation<
    AxiosResponse<FileType[]>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      return await postCreateFile(formData, Number(customer.id), Number(selectedBank.idCHB), clientCode, clientId)
    },
    {
      onSuccess: (result) => {
        createCobranzaFilesCache(result.data, clientId)
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
    [`${KEY_COBRANZA_URL_FILES_CODE_CACHE}_GET_FILES_BY_ID`],
    async () => {
      return getFileById(Number(customer.id), Number(selectedBank.idCHB), clientCode, idFile)
    },
    {
      onSuccess: ({ data }) => {
        if (!!idFile) {
          setValue('clientId', data.clientId, { shouldValidate: true })
        } else {
          reset()
        }
      },
      enabled: false,
    }
  )

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
        title={isEdit ? 'Editar Archivo' : 'Agregar Archivo'}
        contentOverflowY="auto"
        size="small"
        minHeight="430px"
        footer={
          <Container width="100%" height="75px" display="flex" justifyContent="end" alignItems="center" gap="20px">
            <Button
              width="125px"
              label={isEdit ? 'Editar' : 'Agregar'}
              shape="default"
              trailingIcon="ri-add-fill"
              onClick={isEdit ? onAddFile : onAddFile}
              loading={loadingCreateCobranzaFile}
              disabled={!isValid}
            />
          </Container>
        }
      >
        <Container
          width="100%"
          height="430px"
          display="flex"
          justify-content="center"
          flexDirection="column"
          align-items="center"
          gap="20px"
        >
          <Container width="100%" display="flex" flexDirection="column" gap="10px" padding="20px">
            <CobranzaFilesInfoForm
              clientId={clientId}
              setStateFormData={setStateFormData}
              loading={loadingCreateCobranzaFile}
            />
          </Container>
        </Container>
      </Modal>
    </FormProvider>
  )
}

export default CobranzaFilesModal
