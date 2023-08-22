import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import { AxiosResponse } from 'axios'
import { CommentType } from '../../../../../../shared/types/extrajudicial/comment.type'
import { CustomerUserType } from '../../../../../../shared/types/dash/customer-user.type'
import { notification } from '../../../../../../ui/notification/notification'
import Modal from '../../../../../../ui/Modal/Modal'
import Container from '../../../../../../ui/Container/Container'
import Button from '../../../../../../ui/Button/Button'
import companyComentariosCache from '../../CobranzaCommentsTable/utils/company-comentarios.cache'
import { ModalCobranzaCommentsResolver } from './CobranzaCommentsModal.yup'
import {
  createComment,
  editComment,
  getComments,
} from '../../../../../../shared/services/extrajudicial/comment.service'
import CobranzaCommentsInfoForm from './CobranzaCommentsInfoForm/CobranzaCommentsInfoForm'

type Comment = CommentType & { customerUser: CustomerUserType }

type CobranzaCommentsModalProps = {
  visible: boolean
  onClose: () => void
  isEdit?: boolean
  idComment?: number
  chb: number
}

const defaultValuesCobranzaComments: Omit<CommentType, 'customerUserId' | 'clientId'> = {
  id: 0,
  comment: '',
  negotiation: '',
  managementActionId: 0,
  date: '',
}

const CobranzaCommentsModal = ({
  visible,
  onClose,
  isEdit = false,
  idComment = 0,
  chb,
}: CobranzaCommentsModalProps) => {
  const queryClient = useQueryClient()
  const {
    actions: { createCobranzaCommentCache, editCobranzaCommentCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = companyComentariosCache(queryClient)

  const formMethods = useForm<CommentType>({
    resolver: ModalCobranzaCommentsResolver,
    mode: 'all',
    defaultValues: defaultValuesCobranzaComments,
  })

  const {
    setValue,
    getValues,
    reset,
    formState: { isValid },
  } = formMethods

  const { isLoading: loadingCreateCobranzaComment, mutate: createCobranzaComment } = useMutation<
    AxiosResponse<CommentType>,
    Error
  >(
    async () => {
      const { ...restClient } = getValues()
      return await createComment({ ...restClient })
    },
    {
      onSuccess: (result) => {
        createCobranzaCommentCache(result.data)
        notification({ type: 'success', message: 'Comentario creada' })
        handleClickCloseModal()
      },
      onMutate: () => {
        onMutateCache(chb)
      },
      onSettled: () => {
        onSettledCache(chb)
      },
      onError: (error: any, _, context: any) => {
        onErrorCache(context, chb)
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )

  const { isLoading: loadingEditCobranzaComment, mutate: editCobranzaComment } = useMutation<
    AxiosResponse<CommentType>,
    Error
  >(
    async () => {
      const { ...restClient } = getValues()
      return await editComment({ ...restClient })
    },
    {
      onSuccess: (result) => {
        editCobranzaCommentCache(result.data)
        notification({ type: 'success', message: 'Comentario editado' })
        onClose()
      },
      onMutate: () => {
        onMutateCache(chb)
      },
      onSettled: () => {
        onSettledCache(chb)
      },
      onError: (error: any, _, context: any) => {
        onErrorCache(context, chb)
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )

  const { refetch: refetchGetCobranzaCommentById } = useQuery(
    'get-cobranza-comment-by-id',
    async () => {
      return getComments(idComment)
    },
    {
      onSuccess: ({ data }) => {
        if (!!idComment) {
          setValue('id', data.id)
          setValue('comment', data.comment)
          setValue('negotiation', data.negotiation)
          setValue('managementActionId', data.managementActionId)
          setValue('date', data.date)
          setValue('customerUserId', data.customerUserId)
          setValue('clientId', data.clientId)
        } else {
          reset(defaultValuesCobranzaComments)
        }
      },
      enabled: false,
    }
  )

  const onAddAction = () => {
    createCobranzaComment()
  }

  const onEditAction = () => {
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
        title={isEdit ? 'Editar Accion' : 'Agregar Accion'}
        contentOverflowY="auto"
        size="small"
        minHeight="400px"
        footer={
          <Container width="100%" height="75px" display="flex" justifyContent="end" alignItems="center" gap="20px">
            <Button
              width="125px"
              label={isEdit ? 'Editar' : 'Agregar'}
              shape="default"
              trailingIcon="ri-add-fill"
              onClick={isEdit ? onEditAction : onAddAction}
              loading={loadingCreateCobranzaComment || loadingEditCobranzaComment}
              disabled={!isValid}
            />
          </Container>
        }
      >
        <Container
          width="100%"
          height="260px"
          display="flex"
          justify-content="center"
          flexDirection="column"
          align-items="center"
          gap="20px"
        >
          <Container width="100%" display="flex" flexDirection="column" gap="20px" padding="20px" margin="30px 0">
            <CobranzaCommentsInfoForm />
          </Container>
        </Container>
      </Modal>
    </FormProvider>
  )
}

export default CobranzaCommentsModal
