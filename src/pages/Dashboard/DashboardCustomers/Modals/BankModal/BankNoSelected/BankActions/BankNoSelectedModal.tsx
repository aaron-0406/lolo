import { useEffect } from 'react'
import { BankType } from '../../../../../../../shared/types/dash/bank.type'
import { FormProvider, useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { updateBank, deleteBank } from '../../../../../../../shared/services/dash/bank.service'
import notification from '../../../../../../../ui/notification'
import Modal from '../../../../../../../ui/Modal'
import Container from '../../../../../../../ui/Container'
import Button from '../../../../../../../ui/Button'
import dashBanksCache from '../../dash-banks.cache'
import { AxiosResponse } from 'axios'

type BankNoSelectedModalProps = {
  visible: boolean
  onClose: () => void
  isEdit?: boolean
  idBank?: number
  chb: number
}

const defaultValuesBank = {
  bank: {
    id: 0,
    name: '',
    state: false,
    createdAt: new Date(),
    CUSTOMER_HAS_BANK: {
      id: 0,
      idCustomer: 0,
      idBank: 0,
    },
  },
  key: '',
}

const BankNoSelectedModal = ({ visible, onClose, isEdit = false, idBank = 0, chb }: BankNoSelectedModalProps) => {
  const queryClient = useQueryClient()
  const {
    actions: { editBankCache, AddBankCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
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
      const { id, ...restClient } = getValues()
      return await updateBank(id, { ...restClient, CUSTOMER_HAS_BANK: chb })
    },
    {
      onSuccess: (result) => {
        editBankCache(result.data)
        notification({ type: 'success', message: 'Funcionario Editado' })
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

  const handleClickCloseModal = () => {
    reset()
    onClose()
  }
}
