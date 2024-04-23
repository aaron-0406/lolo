import { useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { FormProvider, useForm } from 'react-hook-form'
import { createSubject, updateSubject, getAllSubjectById } from '@/services/judicial/judicial-subject.service'
import { ModalSubjectResolver } from './SubjectModal.yup'
import Modal from '@/ui/Modal'
import Container from '@/ui/Container'
import Button from '@/ui/Button'
import notification from '@/ui/notification'
import SubjectInfoForm from './SubjectInfoForm'
import { AxiosError, AxiosResponse } from 'axios'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { useLoloContext } from '@/contexts/LoloProvider'
import judicialSubjectCache from '../../SubjectTable/utils/judicial-subject.cache'
import { JudicialSubjectType } from '@/types/judicial/judicial-subject.type'

type SubjectModalProps = {
  visible: boolean
  onClose: () => void
  isEdit?: boolean
  idSubject?: number
}

const defaultValuesSubject: JudicialSubjectType = {
  id: 0,
  subject: '',
  customerHasBankId: 0,
}

const SubjectModal = ({ visible, onClose, isEdit = false, idSubject = 0 }: SubjectModalProps) => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const queryClient = useQueryClient()

  const {
    actions: { createSubjectCache, editSubjectCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = judicialSubjectCache(queryClient)

  const formMethods = useForm<JudicialSubjectType>({
    resolver: ModalSubjectResolver,
    mode: 'all',
    defaultValues: defaultValuesSubject,
  })

  const {
    setValue,
    getValues,
    reset,
    formState: { isValid },
  } = formMethods

  const { isLoading: loadingCreateSubject, mutate: mutateCreateSubject } = useMutation<
    any,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { id, ...restSubject } = getValues()
      return await createSubject({ ...restSubject, customerHasBankId: parseInt(chb) })
    },
    {
      onSuccess: (result) => {
        createSubjectCache(result.data)
        notification({ type: 'success', message: 'Materia creada' })
        handleClickCloseModal()
      },
      onMutate: () => {
        return onMutateCache(parseInt(chb))
      },
      onSettled: () => {
        onSettledCache(parseInt(chb))
      },
      onError: (error, _, context: any) => {
        onErrorCache(context, parseInt(chb))
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )

  const { isLoading: loadingEditSubject, mutate: mutateEditSubject } = useMutation<
    AxiosResponse<JudicialSubjectType>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { id, customerHasBankId, ...restSubject } = getValues()
      return await updateSubject(id, { ...restSubject })
    },
    {
      onSuccess: (result) => {
        editSubjectCache(result.data)
        notification({ type: 'success', message: 'Materia editada' })
        handleClickCloseModal()
      },
      onMutate: () => {
        return onMutateCache(parseInt(chb))
      },
      onSettled: () => {
        onSettledCache(parseInt(chb))
      },
      onError: (error, _, context: any) => {
        onErrorCache(context, parseInt(chb))
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )

  const { refetch: refetchSubjects } = useQuery(
    'get-all-subjects-by-id',
    async () => {
      return getAllSubjectById(idSubject)
    },
    {
      onSuccess: ({ data }) => {
        if (idSubject !== 0) {
          setValue('subject', data.subject)
          setValue('customerHasBankId', data.customerHasBankId)
          setValue('id', data.id)
        } else {
          reset(defaultValuesSubject)
        }
      },
      enabled: false,
    }
  )

  const handleClickCloseModal = () => {
    reset()
    onClose()
  }

  const onAddSubject = () => {
    mutateCreateSubject()
  }

  const onEditSubject = () => {
    mutateEditSubject()
  }

  useEffect(() => {
    if (!!idSubject) {
      refetchSubjects()
    }
  }, [idSubject, refetchSubjects])

  return (
    <FormProvider {...formMethods}>
      <Modal
        visible={visible}
        onClose={handleClickCloseModal}
        id="modal-subjects"
        title={isEdit ? 'Editar Materia' : 'Agregar Materia'}
        contentOverflowY="auto"
        size="small"
        minHeight="140px"
        footer={
          <Container width="100%" height="75px" display="flex" justifyContent="end" alignItems="center" gap="20px">
            <Button
              width="125px"
              label={isEdit ? 'Editar' : 'Agregar'}
              shape="default"
              trailingIcon="ri-add-fill"
              onClick={isEdit ? onEditSubject : onAddSubject}
              loading={loadingCreateSubject || loadingEditSubject}
              disabled={!isValid}
            />
          </Container>
        }
      >
        <Container
          width="100%"
          height="140px"
          display="flex"
          justify-content="center"
          flexDirection="column"
          align-items="center"
          gap="20px"
        >
          <Container width="100%" display="flex" flexDirection="column" gap="20px" padding="20px" margin="30px 0">
            <SubjectInfoForm />
          </Container>
        </Container>
      </Modal>
    </FormProvider>
  )
}

export default SubjectModal
