import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import moment from 'moment'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { CommentType } from '@/types/extrajudicial/comment.type'
import { notification } from '@/ui/notification/notification'
import Modal from '@/ui/Modal/Modal'
import Container from '@/ui/Container/Container'
import Button from '@/ui/Button/Button'
import companyComentariosCache, {
  KEY_COBRANZA_URL_COBRANZA_CODE_CACHE,
} from '../../CobranzaCommentsTable/utils/company-comentarios.cache'
import { ModalCobranzaCommentsResolver } from './CobranzaCommentsModal.yup'
import { createComment, editComment, getCommenById } from '@/services/extrajudicial/comment.service'
import CobranzaCommentsInfoForm from './CobranzaCommentsInfoForm/CobranzaCommentsInfoForm'
import { useLoloContext } from '@/contexts/LoloProvider'
import { CustomErrorResponse } from 'types/customErrorResponse'

type CobranzaCommentsModalProps = {
  visible: boolean
  onClose: () => void
  isEdit?: boolean
  idComment?: number
  clientId?: number
}

const CobranzaCommentsModal = ({
  visible,
  onClose,
  isEdit = false,
  idComment = 0,
  clientId = 0,
}: CobranzaCommentsModalProps) => {
  const queryClient = useQueryClient()
  const {
    actions: { createCobranzaCommentCache, editCobranzaCommentCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = companyComentariosCache(queryClient)

  const {
    customerUser: { user },
  } = useLoloContext()

  const formMethods = useForm<Omit<CommentType, 'id' | 'hour'>>({
    resolver: ModalCobranzaCommentsResolver,
    mode: 'all',
    defaultValues: {
      comment: '',
      date: moment(new Date()).format('DD-MM-YYYY'),
      clientId,
      customerUserId: user.id,
      negotiation: '',
    },
  })

  const {
    setValue,
    getValues,
    reset,
    formState: { isValid },
  } = formMethods

  const { isLoading: loadingCreateCobranzaComment, mutate: createCobranzaComment } = useMutation<
    AxiosResponse<CommentType>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { ...restClient } = getValues()
      return await createComment({ ...restClient, id: idComment })
    },
    {
      onSuccess: (result) => {
        createCobranzaCommentCache(result.data)
        notification({ type: 'success', message: 'Comentario creado' })
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

  const { isLoading: loadingEditCobranzaComment, mutate: editCobranzaComment } = useMutation<
    AxiosResponse<CommentType>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { ...restClient } = getValues()
      return await editComment({ ...restClient, id: idComment })
    },
    {
      onSuccess: (result) => {
        editCobranzaCommentCache(result.data)
        notification({ type: 'success', message: 'Comentario editado' })
        onClose()
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

  const { refetch: refetchGetCobranzaCommentById } = useQuery(
    [`${KEY_COBRANZA_URL_COBRANZA_CODE_CACHE}_GET_COMMENT_BY_ID`],
    async () => {
      return getCommenById(idComment)
    },
    {
      onSuccess: ({ data }) => {
        if (!!idComment) {
          setValue('comment', data.comment, { shouldValidate: true })
          setValue('negotiation', data.negotiation, { shouldValidate: true })
          setValue('managementActionId', data.managementActionId ?? undefined, { shouldValidate: true })
          setValue('date', moment(data.date).format('DD-MM-YYYY'), { shouldValidate: true })
          setValue('customerUserId', data.customerUserId, { shouldValidate: true })
          setValue('clientId', data.clientId, { shouldValidate: true })
        } else {
          reset()
        }
      },
      enabled: false,
    }
  )

  const onAddComment = () => {
    createCobranzaComment()
  }

  const onEditComment = () => {
    editCobranzaComment()
  }

  const handleClickCloseModal = () => {
    reset()
    onClose()
  }

  useEffect(() => {
    if (!!idComment) {
      refetchGetCobranzaCommentById()
    }
  }, [idComment, refetchGetCobranzaCommentById])

  return (
    <FormProvider {...formMethods}>
      <Modal
        visible={visible}
        onClose={handleClickCloseModal}
        id="modal-files"
        title={isEdit ? 'Editar Comentario' : 'Agregar Comentario'}
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
              onClick={isEdit ? onEditComment : onAddComment}
              loading={loadingCreateCobranzaComment || loadingEditCobranzaComment}
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
            <CobranzaCommentsInfoForm clientId={clientId} />
          </Container>
        </Container>
      </Modal>
    </FormProvider>
  )
}

export default CobranzaCommentsModal
