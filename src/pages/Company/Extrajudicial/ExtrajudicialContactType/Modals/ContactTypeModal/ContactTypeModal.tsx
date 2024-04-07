import { useEffect } from 'react'
import { AxiosError, AxiosResponse } from 'axios'
import { FormProvider, useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { ExtContactTypeType } from '@/types/extrajudicial/ext-contact-type.type'
import { ModalContactTypeResolver } from './ContactTypeModal.yup'
import {
  createContactType,
  getContactTypeByID,
  editContactType,
} from '@/services/extrajudicial/ext-contact-type.service'
import notification from '@/ui/notification'
import Modal from '@/ui/Modal'
import Container from '@/ui/Container'
import Button from '@/ui/Button'
import ContactTypeInfoForm from './ContactTypeInfoForm'
import extContactTypeCache, { KEY_EXT_CONTACT_TYPE_CACHE } from '../../ContactTypeTable/utils/ext-contact-type.cache'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { useLoloContext } from '@/contexts/LoloProvider'

type ContactTypeModalProps = {
  visible: boolean
  onClose: () => void
  isEdit?: boolean
  idContactType?: number
}

const ContactTypeModal = ({ visible, onClose, isEdit = false, idContactType = 0 }: ContactTypeModalProps) => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const chbNumber = parseInt(chb.length ? chb : '0')

  const queryClient = useQueryClient()

  const {
    actions: { createContactTypeCache, editContactTypeCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = extContactTypeCache(queryClient)

  const formMethods = useForm<Omit<ExtContactTypeType, 'createdAt' | 'updatedAt' | 'deletedAt'>>({
    resolver: ModalContactTypeResolver,
    mode: 'all',
    defaultValues: {
      id: 0,
      contactType: '',
      customerHasBankId: chbNumber,
    },
  })

  const {
    setValue,
    getValues,
    reset,
    formState: { isValid },
  } = formMethods

  const { isLoading: loadingCreateContactType, mutate: createContactTypeMutate } = useMutation<
    AxiosResponse<ExtContactTypeType>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { id, ...restClient } = getValues()
      return await createContactType({ ...restClient, customerHasBankId: chbNumber })
    },
    {
      onSuccess: (result) => {
        createContactTypeCache(result.data)
        notification({ type: 'success', message: 'Tipo de contacto creado' })
        handleClickCloseModal()
      },
      onMutate: () => {
        return onMutateCache(chbNumber)
      },
      onSettled: () => {
        onSettledCache(chbNumber)
      },
      onError: (error, _, context: any) => {
        onErrorCache(context, chbNumber)
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )

  const { isLoading: loadingEditContactType, mutate: editContactTypeMutate } = useMutation<
    AxiosResponse<ExtContactTypeType>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { id, ...restClient } = getValues()
      return await editContactType({ ...restClient, customerHasBankId: chbNumber }, id)
    },
    {
      onSuccess: (result) => {
        editContactTypeCache(result.data)
        notification({ type: 'success', message: 'Tipo de contacto creado' })
        handleClickCloseModal()
      },
      onMutate: () => {
        return onMutateCache(chbNumber)
      },
      onSettled: () => {
        onSettledCache(chbNumber)
      },
      onError: (error: any, _, context: any) => {
        onErrorCache(context, chbNumber)
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )

  const { refetch: refetchGetContactTypeById } = useQuery<AxiosResponse<ExtContactTypeType>>(
    [`${KEY_EXT_CONTACT_TYPE_CACHE}-GET-CONTACT-TYPE-BY-ID`, parseInt(chb.length ? chb : '0')],
    async () => {
      return getContactTypeByID(idContactType)
    },
    {
      onSuccess: ({ data }) => {
        if (!!idContactType) {
          setValue('id', data.id, { shouldValidate: true })
          setValue('contactType', data.contactType, { shouldValidate: true })
          setValue('customerHasBankId', data.customerHasBankId, { shouldValidate: true })
        } else {
          reset()
        }
      },
      enabled: false,
    }
  )

  const onAddContactType = () => {
    createContactTypeMutate()
  }

  const onEditContactType = () => {
    editContactTypeMutate()
  }

  const handleClickCloseModal = () => {
    reset()
    onClose()
  }

  useEffect(() => {
    if (!!idContactType) {
      refetchGetContactTypeById()
    }
  }, [idContactType, refetchGetContactTypeById])

  return (
    <FormProvider {...formMethods}>
      <Modal
        visible={visible}
        onClose={handleClickCloseModal}
        id="modal-contact-type"
        title={isEdit ? 'Editar tipo de contacto' : 'Agregar tipo de contacto'}
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
              onClick={isEdit ? onEditContactType : onAddContactType}
              loading={loadingCreateContactType || loadingEditContactType}
              disabled={!isValid}
            />
          </Container>
        }
      >
        <Container
          width="100%"
          height="210px"
          display="flex"
          justify-content="center"
          flexDirection="column"
          align-items="center"
          gap="20px"
        >
          <Container width="100%" display="flex" flexDirection="column" gap="10px" padding="20px">
            <ContactTypeInfoForm />
          </Container>
        </Container>
      </Modal>
    </FormProvider>
  )
}

export default ContactTypeModal
