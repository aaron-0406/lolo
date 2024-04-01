import { useEffect } from 'react'
import { AxiosError, AxiosResponse } from 'axios'
import { FormProvider, useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { ExtAddressType } from '@/types/extrajudicial/ext-address-type.type'
import { ModalAddressTypeResolver } from './AddressTypeModal.yup'
import {
  createAddressType,
  getAddressTypeByID,
  editAddressType,
} from '@/services/extrajudicial/ext-address-type.service'
import notification from '@/ui/notification'
import Modal from '@/ui/Modal'
import Container from '@/ui/Container'
import Button from '@/ui/Button'
import AddressTypeInfoForm from './AddressTypeInfoForm'
import extAddressTypeCache, { KEY_EXT_ADDRESS_TYPE_CACHE } from '../../AddressTypeTable/utils/ext-address-type.cache'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { useLoloContext } from '@/contexts/LoloProvider'

type AddressTypeModalProps = {
  visible: boolean
  onClose: () => void
  isEdit?: boolean
  idAddressType?: number
}

const FuncionariosModal = ({ visible, onClose, isEdit = false, idAddressType = 0 }: AddressTypeModalProps) => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const chbNumber = parseInt(chb.length ? chb : '0')

  const queryClient = useQueryClient()

  const {
    actions: { createAddressTypeCache, editAddressTypeCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = extAddressTypeCache(queryClient)

  const formMethods = useForm<Omit<ExtAddressType, 'createdAt' | 'updatedAt' | 'deletedAt'>>({
    resolver: ModalAddressTypeResolver,
    mode: 'all',
    defaultValues: {
      id: 0,
      type: '',
      customerHasBankId: chbNumber,
    },
  })

  const {
    setValue,
    getValues,
    reset,
    formState: { isValid },
  } = formMethods

  const { isLoading: loadingCreateAddressType, mutate: createAddressTypeMutate } = useMutation<
    AxiosResponse<ExtAddressType>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { id, ...restClient } = getValues()
      return await createAddressType({ ...restClient, customerHasBankId: chbNumber })
    },
    {
      onSuccess: (result) => {
        createAddressTypeCache(result.data)
        notification({ type: 'success', message: 'Tipo de dirección creada' })
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

  const { isLoading: loadingEditAddressType, mutate: editAddressTypeMutate } = useMutation<
    AxiosResponse<ExtAddressType>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { id, ...restClient } = getValues()
      return await editAddressType({ ...restClient, customerHasBankId: chbNumber }, id)
    },
    {
      onSuccess: (result) => {
        editAddressTypeCache(result.data)
        notification({ type: 'success', message: 'Tipo de dirección editada' })
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

  const { refetch: refetchGetAddressTypeById } = useQuery<AxiosResponse<ExtAddressType>>(
    [`${KEY_EXT_ADDRESS_TYPE_CACHE}-GET-ADDRESS-TYPE-BY-ID`, parseInt(chb.length ? chb : '0')],
    async () => {
      return getAddressTypeByID(idAddressType, chbNumber)
    },
    {
      onSuccess: ({ data }) => {
        if (!!idAddressType) {
          setValue('id', data.id, { shouldValidate: true })
          setValue('type', data.type, { shouldValidate: true })
          setValue('customerHasBankId', data.customerHasBankId, { shouldValidate: true })
        } else {
          reset()
        }
      },
      enabled: false,
    }
  )

  const onAddAddressType = () => {
    createAddressTypeMutate()
  }

  const onEditAddressType = () => {
    editAddressTypeMutate()
  }

  const handleClickCloseModal = () => {
    reset()
    onClose()
  }

  useEffect(() => {
    if (!!idAddressType) {
      refetchGetAddressTypeById()
    }
  }, [idAddressType, refetchGetAddressTypeById])

  return (
    <FormProvider {...formMethods}>
      <Modal
        visible={visible}
        onClose={handleClickCloseModal}
        id="modal-address-type"
        title={isEdit ? 'Editar tipo de dirección' : 'Agregar tipo de dirección'}
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
              onClick={isEdit ? onEditAddressType : onAddAddressType}
              loading={loadingCreateAddressType || loadingEditAddressType}
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
            <AddressTypeInfoForm />
          </Container>
        </Container>
      </Modal>
    </FormProvider>
  )
}

export default FuncionariosModal
