import { useEffect } from 'react'
import { useLoloContext } from '@/contexts/LoloProvider'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import Modal from '@/ui/Modal'
import { FormProvider, useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import companyTagsCache, { KEY_COBRANZA_URL_TAG_CODE_CACHE } from '../../TagsTable/utils/company-tags.cache'
import { ExtTagType } from '@/types/extrajudicial/ext-tag.type'
import { ModalCobranzaTagsResolver } from './CobranzaTagsModal.yup'
import { AxiosError, AxiosResponse } from 'axios'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { createExtTag, editExtTag, getExtTagByID } from '@/services/extrajudicial/ext-tag.service'
import notification from '@/ui/notification'
import CobranzaTagsInfoForm from './CobranzaTagsInfoForm'
import { getExtTagGroupsByCHB } from '@/services/extrajudicial/ext-tag-group.service'

type CobranzaTagsModalProps = {
  visible: boolean
  onClose: () => void
  isEdit?: boolean
  idTag?: number
}

const CobranzaTagsModal = ({ visible, onClose, isEdit = false, idTag = 0 }: CobranzaTagsModalProps) => {
  const queryClient = useQueryClient()
  const {
    actions: { createCobranzaTagCache, editCobranzaTagCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = companyTagsCache(queryClient)

  const {
    bank: {
      selectedBank: { idCHB },
    },
  } = useLoloContext()

  const formMethods = useForm<Omit<ExtTagType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>>({
    resolver: ModalCobranzaTagsResolver,
    mode: 'all',
    defaultValues: {
      name: '',
      action: false,
      color: '',
      tagGroupId: 0,
      customerHasBankId: parseInt(idCHB),
    },
  })

  const {
    setValue,
    getValues,
    reset,
    formState: { isValid },
  } = formMethods

  const { data } = useQuery<AxiosResponse<Array<ExtTagType>, Error>>(
    [`${KEY_COBRANZA_URL_TAG_CODE_CACHE}-TAG-GROUP-BY-CHB`],
    async () => {
      return await getExtTagGroupsByCHB(parseInt(idCHB.length ? idCHB : '0'))
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

  const findTagGroupName = (id: number) => {
    return tagGroups.find((group) => group.id === id)?.name
  }

  const { isLoading: loadingCreateCobranzaTag, mutate: createCobranzaTag } = useMutation<
    AxiosResponse<ExtTagType>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { ...restClient } = getValues()
      return await createExtTag({ ...restClient })
    },
    {
      onSuccess: (result) => {
        createCobranzaTagCache({
          ...result.data,
          extTagGroup: { name: findTagGroupName(result.data.tagGroupId) ?? '' },
        })
        notification({ type: 'success', message: 'Etiqueta creada' })
        handleClickCloseModal()
      },
      onMutate: () => {
        return onMutateCache(parseInt(idCHB))
      },
      onSettled: () => {
        onSettledCache(parseInt(idCHB))
      },
      onError: (error, _, context: any) => {
        onErrorCache(context, parseInt(idCHB))
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )

  const { isLoading: loadingEditCobranzaTag, mutate: editCobranzaTag } = useMutation<
    AxiosResponse<ExtTagType>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { ...restClient } = getValues()
      return await editExtTag({ ...restClient }, idTag)
    },
    {
      onSuccess: (result) => {
        editCobranzaTagCache({ ...result.data, extTagGroup: { name: findTagGroupName(result.data.tagGroupId) ?? '' } })
        notification({ type: 'success', message: 'Etiqueta editada' })
        onClose()
      },
      onMutate: () => {
        return onMutateCache(parseInt(idCHB))
      },
      onSettled: () => {
        onSettledCache(parseInt(idCHB))
      },
      onError: (error, _, context: any) => {
        onErrorCache(context, parseInt(idCHB))
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )

  const { refetch: refetchGetCobranzaTagById } = useQuery(
    [`${KEY_COBRANZA_URL_TAG_CODE_CACHE}_GET_TAG_BY_ID`],
    async () => {
      return getExtTagByID(idTag)
    },
    {
      onSuccess: ({ data }) => {
        if (!!idTag) {
          setValue('name', data.name, { shouldValidate: true })
          setValue('color', data.color, { shouldValidate: true })
          setValue('action', Boolean(data.action), { shouldValidate: true })
          setValue('tagGroupId', data.tagGroupId, { shouldValidate: true })
          setValue('customerHasBankId', data.customerHasBankId, { shouldValidate: true })
        } else {
          reset()
        }
      },
      enabled: false,
    }
  )

  const onAddTag = () => {
    createCobranzaTag()
  }

  const onEditTag = () => {
    editCobranzaTag()
  }

  const handleClickCloseModal = () => {
    reset()
    onClose()
  }

  useEffect(() => {
    if (!!idTag) {
      refetchGetCobranzaTagById()
    }
  }, [idTag, refetchGetCobranzaTagById])

  return (
    <FormProvider {...formMethods}>
      <Modal
        visible={visible}
        onClose={handleClickCloseModal}
        id="modal-files"
        title={isEdit ? 'Editar Etiqueta' : 'Agregar Etiqueta'}
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
              onClick={isEdit ? onEditTag : onAddTag}
              loading={loadingCreateCobranzaTag || loadingEditCobranzaTag}
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
            <CobranzaTagsInfoForm tagGroups={tagGroups} />
          </Container>
        </Container>
      </Modal>
    </FormProvider>
  )
}

export default CobranzaTagsModal
