import { useEffect } from 'react'
import { BankType } from '../../../../../../../../shared/types/dash/bank.type'
import { FormProvider, useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { updateBank, getBankById } from '../../../../../../../../shared/services/dash/bank.service'
import BankInfoForm from './BankInfoForm'
import notification from '../../../../../../../../ui/notification'
import Modal from '../../../../../../../../ui/Modal'
import Container from '../../../../../../../../ui/Container'
import Button from '../../../../../../../../ui/Button'
import dashBanksCache from '../../utils/dash-banks.cache'
import { AxiosResponse } from 'axios'

type BankModalEditProps = {
  visible: boolean
  onClose: () => void
  idBank: number
}

const defaultValuesBank = {
  id: 0,
  name: '',
  state: false,
  createdAt: new Date(),
  CUSTOMER_HAS_BANK: {
    id: 0,
    idCustomer: 0,
    idBank: 0,
  },
}

const BankModalEdit = ({ visible, onClose, idBank = 0 }: BankModalEditProps) => {
  const queryClient = useQueryClient()
  const {
    actions: { editBankCache },
    onMutateBankCache,
    onSettledBankCache,
    onErrorBankCache,
  } = dashBanksCache(queryClient)

  const formMethods = useForm<BankType>({
    mode: 'all',
    defaultValues: defaultValuesBank,
  })

  const {
    setValue,
    getValues,
    reset,
    formState: { isValid },
  } = formMethods

  const { isLoading: loadingEditBank, mutate: editBank } = useMutation<AxiosResponse<BankType>, Error>(
    async () => {
      const { id, CUSTOMER_HAS_BANK, ...restClient } = getValues()
      console.log(getValues())
      return await updateBank(id, { ...restClient })
    },
    {
      onSuccess: (result) => {
        editBankCache(result.data)
        notification({ type: 'success', message: 'Banco Editado' })
        handleClickCloseModal()
      },
      onMutate: () => {
        return onMutateBankCache()
      },
      onSettled: () => {
        onSettledBankCache()
      },
      onError: (error: any, _, context: any) => {
        onErrorBankCache(context)
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )

  const { refetch: refetchGetBankById } = useQuery(
    'get-bank-by-id',
    async () => {
      return getBankById(idBank)
    },
    {
      onSuccess: ({ data }) => {
        if (!!idBank) {
          setValue('id', data.id)
          setValue('name', data.name)
        } else {
          reset(defaultValuesBank)
        }
      },
      enabled: false,
    }
  )

  const onEditBank = () => {
    editBank()
  }

  const handleClickCloseModal = () => {
    reset()
    onClose()
  }

  useEffect(() => {
    if (idBank !== 0) {
      refetchGetBankById()
    }
  }, [idBank, refetchGetBankById])

  return (
    <FormProvider {...formMethods}>
      <Modal
        visible={visible}
        onClose={() => {
          handleClickCloseModal()
        }}
        id="modal-dash-editar-banco"
        title="Editar Banco"
        contentOverflowY="auto"
        size="small"
        minHeight="140px"
        footer={
          <Container width="100%" height="75px" display="flex" justifyContent="end" alignItems="center" gap="20px">
            <Button
              width="125px"
              label="Editar"
              shape="default"
              trailingIcon="ri-add-fill"
              onClick={onEditBank}
              loading={loadingEditBank}
              disabled={!isValid}
            />
          </Container>
        }
      >
        <Container
          width="100%"
          height="140px"
          padding="20px"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <BankInfoForm />
        </Container>
      </Modal>
    </FormProvider>
  )
}

export default BankModalEdit
