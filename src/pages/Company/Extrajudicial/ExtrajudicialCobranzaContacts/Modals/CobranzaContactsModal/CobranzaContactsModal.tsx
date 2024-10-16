import { useMutation, useQuery, useQueryClient } from 'react-query'
import companyContactsCache, {
  KEY_COBRANZA_URL_CONTACT_CODE_CACHE,
} from '../../CobranzaContactsTable/utils/company-contacts.cache'
import { useLoloContext } from '@/contexts/LoloProvider'
import { FormProvider, useForm } from 'react-hook-form'
import { ExtContactTypeType } from '@/types/extrajudicial/ext-contact-type.type'
import { ExtContactType } from '@/types/extrajudicial/ext-contact.type'
import { ModalCobranzaContactsResolver } from './CobranzaContactsModal.yup'
import { AxiosError, AxiosResponse } from 'axios'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { createExtContact, editExtContact, getExtContactsByID } from '@/services/extrajudicial/ext-contact.service'
import notification from '@/ui/notification'
import { useEffect } from 'react'
import Modal from '@/ui/Modal'
import Container from '@/ui/Container'
import Button from '@/ui/Button'
import CobranzaContactsInfoForm from './CobranzaContactsInfoForm'

type CobranzaContactsModalProps = {
  visible: boolean
  onClose: () => void
  isEdit?: boolean
  idContact?: number
  clientId?: number
  contactsType: ExtContactTypeType[]
}

const CobranzaContactsModal = ({
  visible,
  onClose,
  isEdit = false,
  idContact = 0,
  clientId = 0,
  contactsType,
}: CobranzaContactsModalProps) => {
  const queryClient = useQueryClient()
  const {
    actions: { createCobranzaContactCache, editCobranzaContactCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = companyContactsCache(queryClient)

  const {
    bank: {
      selectedBank: { idCHB },
    },
  } = useLoloContext()

  const formMethods = useForm<
    Omit<ExtContactType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> & {
      extContactType: { contactType: string; customerHasBankId: string }
    }
  >({
    resolver: ModalCobranzaContactsResolver,
    mode: 'all',
    defaultValues: {
      dni: '',
      name: '',
      phone: '',
      email: '',
      state: true,
      clientId,
      customerHasBankId: parseInt(idCHB),
    },
  })

  const {
    setValue,
    getValues,
    reset,
    formState: { isValid },
  } = formMethods

  const { isLoading: loadingCreateCobranzaContact, mutate: createCobranzaContact } = useMutation<
    AxiosResponse<ExtContactType>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { extContactType, ...restClient } = getValues()
      return await createExtContact({ ...restClient })
    },
    {
      onSuccess: (result) => {
        createCobranzaContactCache(result.data)
        notification({ type: 'success', message: 'Contacto creado' })
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

  const { isLoading: loadingEditCobranzaContact, mutate: editCobranzaContact } = useMutation<
    AxiosResponse<ExtContactType>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { extContactType, ...restClient } = getValues()
      return await editExtContact({ ...restClient }, idContact)
    },
    {
      onSuccess: (result) => {
        editCobranzaContactCache(result.data)
        notification({ type: 'success', message: 'Contacto editado' })
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

  const { refetch: refetchGetCobranzaContactById } = useQuery(
    [`${KEY_COBRANZA_URL_CONTACT_CODE_CACHE}_GET_COMMENT_BY_ID`],
    async () => {
      return getExtContactsByID(idContact)
    },
    {
      onSuccess: ({ data }) => {
        if (!!idContact) {
          setValue('dni', data.dni, { shouldValidate: true })
          setValue('name', data.name, { shouldValidate: true })
          setValue('phone', data.phone, { shouldValidate: true })
          setValue('email', data.email, { shouldValidate: true })
          setValue('state', !!data.state, { shouldValidate: true })
          setValue('customerHasBankId', data.customerHasBankId, { shouldValidate: true })
          setValue('clientId', data.clientId, { shouldValidate: true })
          setValue('extContactTypeId', data.extContactTypeId ?? undefined, { shouldValidate: true })
          setValue('extContactType', data?.extContactType, { shouldValidate: true })
        } else {
          reset()
        }
      },
      enabled: false,
    }
  )

  const onAddContact = () => {
    createCobranzaContact()
  }

  const onEditContact = () => {
    editCobranzaContact()
  }

  const handleClickCloseModal = () => {
    reset()
    onClose()
  }

  useEffect(() => {
    if (!!idContact) {
      refetchGetCobranzaContactById()
    }
  }, [idContact, refetchGetCobranzaContactById])

  return (
    <FormProvider {...formMethods}>
      <Modal
        visible={visible}
        onClose={handleClickCloseModal}
        id="modal-files"
        title={isEdit ? 'Editar Contacto' : 'Agregar Contacto'}
        contentOverflowY="auto"
        size="small"
        minHeight="480px"
        footer={
          <Container width="100%" height="75px" display="flex" justifyContent="end" alignItems="center" gap="20px">
            <Button
              width="125px"
              label={isEdit ? 'Editar' : 'Agregar'}
              shape="default"
              trailingIcon="ri-add-fill"
              onClick={isEdit ? onEditContact : onAddContact}
              loading={loadingCreateCobranzaContact || loadingEditCobranzaContact}
              disabled={!isValid}
            />
          </Container>
        }
      >
        <Container
          width="100%"
          height="480px"
          display="flex"
          justify-content="center"
          flexDirection="column"
          align-items="center"
          gap="20px"
        >
          <Container width="100%" display="flex" flexDirection="column" gap="10px" padding="20px">
            <CobranzaContactsInfoForm clientId={clientId} contactsType={contactsType} />
          </Container>
        </Container>
      </Modal>
    </FormProvider>
  )
}

export default CobranzaContactsModal
