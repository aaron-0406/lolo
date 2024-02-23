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
import extAddressTypeCache from '../../AddressTypeTable/utils/ext-address-type.cache'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { useLoloContext } from '@/contexts/LoloProvider'

type AddressTypeModalProps = {
  visible: boolean
  onClose: () => void
  isEdit?: boolean
  idAddressType?: number
}
const defaultValuesAddressType: Omit<ExtAddressType, 'createdAt' | 'updatedAt' | 'deletedAt'> = {
  id: 0,
  type: '',
  customerHasBankId: 0,
}

const FuncionariosModal = ({ visible, onClose, isEdit = false, idAddressType = 0 }: AddressTypeModalProps) => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const queryClient = useQueryClient()

  const {
    actions: { createAddressTypeCache, editAddressTypeCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = extAddressTypeCache(queryClient)

  const formMethods = useForm<ExtAddressType>({
    resolver: ModalAddressTypeResolver,
    mode: 'all',
    defaultValues: defaultValuesAddressType,
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
      return await createAddressType({ ...restClient, customerHasBankId: parseInt(chb) })
    },
    {
      onSuccess: (result) => {
        createAddressTypeCache(result.data)
        notification({ type: 'success', message: 'tipo de dirección creado' })
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

  const { isLoading: loadingEditAddressType, mutate: editAddressTypeMutate } = useMutation<
    AxiosResponse<ExtAddressType>,
    Error
  >(
    async () => {
      const { id, ...restClient } = getValues()
      return await editAddressType({ ...restClient, customerHasBankId: parseInt(chb) }, id)
    },
    {
      onSuccess: (result) => {
        editAddressTypeCache(result.data)
        notification({ type: 'success', message: 'tipo de dirección editado' })
        handleClickCloseModal()
      },
      onMutate: () => {
        return onMutateCache(parseInt(chb))
      },
      onSettled: () => {
        onSettledCache(parseInt(chb))
      },
      onError: (error: any, _, context: any) => {
        onErrorCache(context, parseInt(chb))
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )

  const { refetch: refetchGetAddressTypeById } = useQuery(
    'get-address-type-by-id',
    async () => {
      return getAddressTypeByID(idAddressType)
    },
    {
      onSuccess: ({ data }) => {
        if (!!idAddressType) {
          setValue('id', data.id)
          setValue('type', data.type)
          setValue('customerHasBankId', data.customerHasBankId)
        } else {
          reset(defaultValuesAddressType)
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
          height="140px"
          display="flex"
          justify-content="center"
          flexDirection="column"
          align-items="center"
          gap="20px"
        >
          <Container width="100%" display="flex" flexDirection="column" gap="20px" padding="20px" margin="30px 0">
            <AddressTypeInfoForm />
          </Container>
        </Container>
      </Modal>
    </FormProvider>
  )
}

export default FuncionariosModal
