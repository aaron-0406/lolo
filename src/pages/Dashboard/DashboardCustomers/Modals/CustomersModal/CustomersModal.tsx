/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { Controller } from 'react-hook-form'
import { FormProvider, useForm } from 'react-hook-form'
import { ModalCustomersResolver } from './CustomersModal.yup'
import { useMutation, useQuery } from 'react-query'
import CustomerInfoForm from './CustomerInfoForm'
import { createClient, editCustomerById, getCustomerByUrl } from '../../../../../shared/services/customer.service'
import { CustomerType } from '../../../../../shared/types/customer.type'
import Container from '../../../../../ui/Container'
import Modal from '../../../../../ui/Modal'
import notification from '../../../../../ui/notification'
import Button from '../../../../../ui/Button'
import Checkbox from '../../../../../ui/Checkbox'
import Label from '../../../../../ui/Label'

type CustomersModalProps = {
  visible: boolean
  onClose: () => void
  isEdit?: boolean
  url?: string
  setLoadingGlobal: (state: boolean) => void
}

const defaultValuesCustomer: Omit<CustomerType, 'customerBanks' | 'createdAt'> = {
  id: 0,
  ruc: '',
  companyName: '',
  urlIdentifier: '',
  description: 'no description',
  state: true,
}

const CustomersModal = ({ visible, onClose, setLoadingGlobal, isEdit = false, url = '' }: CustomersModalProps) => {
  const formMethods = useForm<CustomerType>({
    resolver: ModalCustomersResolver,
    mode: 'all',
    defaultValues: defaultValuesCustomer,
  })

  const {
    setValue,
    getValues,
    control,
    reset,
    formState: { isValid },
  } = formMethods

  const { isLoading: loadingCreateCustomer, mutate: createCustomer } = useMutation<any, Error>(
    async () => {
      const { id, ...restClient } = getValues()
      return await createClient(restClient)
    },
    {
      onSuccess: () => {
        notification({ type: 'success', message: 'Cliente creado' })
        setLoadingGlobal(true)
        handleClickCloseModal()
      },
      onError: (error: any) => {
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )

  const { isLoading: loadingEditCustomer, mutate: editCustomer } = useMutation<any, Error>(
    async () => {
      const { id, customerBanks, createdAt, state, ...restClient } = getValues()
      return await editCustomerById(id, restClient)
    },
    {
      onSuccess: () => {
        notification({ type: 'success', message: 'Cliente editado' })
        setLoadingGlobal(true)
        onClose()
      },
      onError: (error: any) => {
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )

  const { refetch: refetchGetCustomerByURL } = useQuery(
    'get-customer-by-url',
    async () => {
      return getCustomerByUrl(url)
    },
    {
      onSuccess: ({ data }) => {
        if (url !== '') {
          setValue('companyName', data.companyName)
          setValue('description', data.description)
          setValue('ruc', data.ruc)
          setValue('urlIdentifier', data.urlIdentifier)
          setValue('id', data.id)
        } else {
          reset(defaultValuesCustomer)
        }
      },
      enabled: false,
    }
  )

  const onAddCustomer = () => {
    createCustomer()
  }

  const onEditCustomer = () => {
    editCustomer()
  }

  const handleClickCloseModal = () => {
    reset()
    onClose()
  }

  useEffect(() => {
    if (url !== '') {
      refetchGetCustomerByURL()
    }
  }, [url])

  return (
    <FormProvider {...formMethods}>
      <Modal
        visible={visible}
        onClose={handleClickCloseModal}
        id="modal-files"
        title={isEdit ? 'Editar Cliente' : 'Agregar Cliente'}
        contentOverflowY="auto"
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
            <CustomerInfoForm />
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
          <Container width="100%" height="75px" display="flex" justifyContent="center" alignItems="center" gap="20px">
            <Button
              width="125px"
              label={isEdit ? 'Editar' : 'Agregar'}
              shape="default"
              trailingIcon="ri-add-fill"
              onClick={isEdit ? onEditCustomer : onAddCustomer}
              loading={loadingCreateCustomer || loadingEditCustomer}
              disabled={!isValid}
            />
          </Container>
        </Container>
      </Modal>
    </FormProvider>
  )
}

export default CustomersModal