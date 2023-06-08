import { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { Controller } from 'react-hook-form'
import { FormProvider, useForm } from 'react-hook-form'
import { ModalCustomersResolver } from './ModalCustomers.yup'
import { useMutation, useQuery } from 'react-query'
import AddCustomersInfo from './AddCustomersInfo'
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
  edits?: { edit: boolean; url: string }
}

const defaultValuesCustomer: Omit<CustomerType, 'customerBanks' | 'createdAt'> = {
  id: 0,
  ruc: '',
  companyName: '',
  urlIdentifier: '',
  description: 'no description',
  state: true,
}

const CustomersModal = ({ visible, onClose, edits = { edit: false, url: '' } }: CustomersModalProps) => {
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

  const [urlEdit, setUrlEdit] = useState('')

  const { isLoading: loadingCreateCustomer, mutate: createCustomer } = useMutation<any, Error>(
    async () => {
      const { id, ...restClient } = getValues()
      return await createClient(restClient)
    },
    {
      onSuccess: (data) => {
        setValue('id', data.data.id)
        notification({ type: 'success', message: 'Cliente creado' })
      },
      onError: (error: any) => {
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )

  const { isLoading: loadingEditCustomer, mutate: EditCustomer } = useMutation<any, Error>(
    async () => {
      const { id, customerBanks, createdAt, state, ...restClient } = getValues()
      let ID = getValues('id')
      return await editCustomerById(ID, restClient)
    },
    {
      onSuccess: () => {
        notification({ type: 'success', message: 'Cliente editado' })
      },
      onError: (error: any) => {
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )

  const { refetch: refetchEdit } = useQuery(
    'get-customer-by-url',
    async () => {
      console.log('paint')
      return getCustomerByUrl(urlEdit)
    },
    {
      onSuccess: ({ data }) => {
        if (urlEdit !== '') {
          setValue('companyName', data.companyName)
          setValue('description', data.description)
          setValue('ruc', data.ruc)
          setValue('urlIdentifier', data.urlIdentifier)
          setValue('id', data.id)
        } else {
          reset(defaultValuesCustomer)
        }
      },
    }
  )

  const onAddCustomer = () => {
    createCustomer()
    onClose()
  }

  const onEditCustomer = () => {
    EditCustomer()
    setUrlEdit('')
  }

  const handleClickCloseModal = () => {
    reset()
    onClose()
  }

  useEffect(() => {
    setUrlEdit(edits?.url)
  }, [edits?.url])

  useEffect(() => {
    refetchEdit()
  }, [urlEdit])

  return (
    <FormProvider {...formMethods}>
      <Modal
        visible={visible}
        onClose={handleClickCloseModal}
        id="modal-files"
        title={edits?.edit ? 'Editar Cliente' : 'Agregar Cliente'}
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
            <AddCustomersInfo />
            <Container width="100%" display={edits?.edit ? 'none' : 'flex'} gap="10px">
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
          <StyledContainerButton
            width="100%"
            height="75px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap="20px"
          >
            <Button
              width="125px"
              label={edits?.edit ? 'Editar' : 'Agregar'}
              shape="default"
              trailingIcon="ri-add-fill"
              onClick={edits?.edit ? onEditCustomer : onAddCustomer}
              loading={loadingCreateCustomer || loadingEditCustomer}
              disabled={!isValid}
            />
          </StyledContainerButton>
        </Container>
      </Modal>
    </FormProvider>
  )
}

export default CustomersModal

const StyledContainerButton = styled(Container)`
  ${({ theme }) => css`
    @media ${theme.device.tabletL} {
      gap: 10px;
    }
    @media ${theme.device.desktopL} {
      gap: 30px;
    }
  `}
`
