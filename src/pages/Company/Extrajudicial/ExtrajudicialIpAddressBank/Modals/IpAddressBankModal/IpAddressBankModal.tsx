import { useEffect } from 'react'
import { AxiosError, AxiosResponse } from 'axios'
import { FormProvider, useForm, Controller } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { ModalIpAddressBankResolver } from './ipAddressBankModal.yup'
import { ExtIpAddressBankType } from '@/types/extrajudicial/ext-ip-address-bank.type'
import { createIpAddress, editIpAddress, getIpAddressById } from '@/services/extrajudicial/ext-ip-address-bank.service'
import Container from '@/ui/Container'
import Modal from '@/ui/Modal'
import notification from '@/ui/notification'
import Button from '@/ui/Button'
import Checkbox from '@/ui/Checkbox'
import Label from '@/ui/Label'
import { CustomErrorResponse } from 'types/customErrorResponse'
import IpAddressInfoForm from './IpAddressInfoForm'
import ipAddressBankCache from '../../IpAddressBankTable/utils/dash-ip-address-bank.cache'

type IpAddressModalProps = {
  visible: boolean
  onClose: () => void
  isEdit?: boolean
  idIpAddress?: number
}

const defaultValuesIpAddress: Omit<ExtIpAddressBankType, 'createdAt' | 'updatedAt' | 'deletedAt'> = {
  id: 0,
  addressName: '',
  ip: '',
  state: false,
}

const IpAddressBankModal = ({ visible, onClose, idIpAddress = 0, isEdit = false }: IpAddressModalProps) => {
  const queryClient = useQueryClient()
  const {
    actions: { createIpAddressBankCache, editIpAddressBankCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = ipAddressBankCache(queryClient)

  const formMethods = useForm<ExtIpAddressBankType>({
    resolver: ModalIpAddressBankResolver,
    mode: 'all',
    defaultValues: defaultValuesIpAddress,
  })

  const {
    setValue,
    getValues,
    control,
    reset,
    formState: { isValid },
  } = formMethods

  const { isLoading: loadingCreateIpAddress, mutate: createIpAddressBank } = useMutation<
    AxiosResponse<ExtIpAddressBankType>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { id, ...restIpAddress } = getValues()
      return await createIpAddress({ ...restIpAddress })
    },
    {
      onSuccess: (result) => {
        createIpAddressBankCache(result.data)
        notification({ type: 'success', message: 'Dirección IP Creada' })
        handleClickCloseModal()
      },
      onMutate: () => {
        return onMutateCache()
      },
      onSettled: () => {
        onSettledCache()
      },
      onError: (error, _, context: any) => {
        onErrorCache(context)
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )

  const { isLoading: loadingEditIpAddress, mutate: editIpAddressBank } = useMutation<
    AxiosResponse<ExtIpAddressBankType>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      console.log(idIpAddress)
      const { id, createdAt, updatedAt, deletedAt, ...restIpAddress } = getValues()
      return await editIpAddress(restIpAddress, idIpAddress)
    },
    {
      onSuccess: (result) => {
        editIpAddressBankCache(result.data)
        notification({ type: 'success', message: 'Dirección IP Editada' })
        onClose()
      },
      onMutate: () => {
        return onMutateCache()
      },
      onSettled: () => {
        onSettledCache()
      },
      onError: (error, _, context: any) => {
        onErrorCache(context)
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )

  const { refetch: refetchGetIpAddressById } = useQuery<AxiosResponse<ExtIpAddressBankType>>(
    'get-ip-address-by-id',
    async () => {
      return getIpAddressById(idIpAddress)
    },
    {
      onSuccess: ({ data }) => {
        if (idIpAddress !== 0) {
          setValue('addressName', data.addressName)
          setValue('state', !!(data.state))
          setValue('ip', data.ip)
          setValue('id', data.id)
        } else {
          reset(defaultValuesIpAddress)
        }
      },
      enabled: false,
    }
  )

  const onEditIpAddress = () => {
    editIpAddressBank()
  }

  const onAddIpAddress = () => {
    createIpAddressBank()
  }

  const handleClickCloseModal = () => {
    reset()
    onClose()
  }

  useEffect(() => {
    if (idIpAddress !== 0) {
      refetchGetIpAddressById()
    }
    // eslint-disable-next-line
  }, [idIpAddress])

  return (
    <FormProvider {...formMethods}>
      <Modal
        size="small"
        visible={visible}
        onClose={handleClickCloseModal}
        id="modal-files"
        title={isEdit ? 'Editar dirección ip' : 'Agregar dirección ip'}
        contentOverflowY="auto"
        footer={
          <Container width="100%" height="75px" display="flex" justifyContent="flex-end" alignItems="center" gap="20px">
            <Button
              width="125px"
              label={isEdit ? 'Editar' : 'Agregar'}
              shape="default"
              trailingIcon="ri-add-fill"
              onClick={isEdit ? onEditIpAddress : onAddIpAddress}
              loading={loadingCreateIpAddress || loadingEditIpAddress}
              disabled={!isValid}
            />
          </Container>
        }
      >
        <Container
          width="100%"
          height="410px"
          display="flex"
          justify-content="center"
          flexDirection="column"
          align-items="center"
          gap="20px"
        >
          <Container width="100%" display="flex" flexDirection="column" gap="10px" padding="20px">
            <IpAddressInfoForm />
            <Container width="100%" display={isEdit ? 'none' : 'flex'} gap="10px">
              <Label label="Estado:" />
              <Controller
                name="state"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    width="100%"
                    value={String(field.value)}
                    onChange={(key) => {
                      field.onChange(key)
                    }}
                  />
                )}
              />
            </Container>
          </Container>
        </Container>
      </Modal>
    </FormProvider>
  )
}

export default IpAddressBankModal
