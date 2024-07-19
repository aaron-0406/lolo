import { useLoloContext } from '@/contexts/LoloProvider'
import { tranferClientToAnotherBank } from '@/services/extrajudicial/client.service'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import Modal from '@/ui/Modal'
import Select from '@/ui/Select'
import { SelectItemType } from '@/ui/Select/interfaces'
import notification from '@/ui/notification'
import { AxiosError, AxiosResponse } from 'axios'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { CustomErrorResponse } from 'types/customErrorResponse'
import companyCustomersCache from '../../CustomersTable/utils/company-customers.cache'

type TransferClientModalProps = {
  visible: boolean
  code: string
  archived: boolean
  onClose: () => void
}

const TransferClientModal = ({ visible, onClose, code, archived }: TransferClientModalProps) => {
  const queryClient = useQueryClient()

  const {
    client: { customer },
    bank: {
      selectedBank: { idBank, idCHB },
    },
  } = useLoloContext()

  const {
    actions: { transferClientCobranzaCustomerCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = companyCustomersCache(queryClient)

  const [chbTransferred, setChbTransferred] = useState<string>('')

  const options: Array<SelectItemType> = customer.customerBanks
    .filter((bank) => bank.id !== (!!idBank ? parseInt(idBank) : 0))
    .map((bank) => {
      return {
        key: String(bank.CUSTOMER_HAS_BANK.id),
        label: bank.name,
      }
    })

  const { isLoading: loadingTransferClient, mutate: transferClient } = useMutation<
    AxiosResponse<{ id: number; chbTransferred: number }>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      return await tranferClientToAnotherBank(code, idCHB, chbTransferred)
    },
    {
      onSuccess: (result) => {
        transferClientCobranzaCustomerCache({
          id: result.data.id,
          chb: idCHB?.length ? parseInt(idCHB) : 0,
          chbTransferred: result.data.chbTransferred,
          archived,
        })
        notification({ type: 'success', message: 'Cliente Transferido' })
        onClose()
      },
      onMutate: () => {
        return onMutateCache(idCHB?.length ? parseInt(idCHB) : 0, archived)
      },
      onSettled: () => {
        onSettledCache(idCHB?.length ? parseInt(idCHB) : 0, archived)
      },
      onError: (error, _, context: any) => {
        onErrorCache(context, idCHB?.length ? parseInt(idCHB) : 0, archived)
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )

  const onTranferClient = () => {
    transferClient()
  }

  const onSelectBank = (chb: string) => {
    setChbTransferred(chb)
  }

  const handleClickCloseModal = () => {
    setChbTransferred('')
    onClose()
  }

  return (
    <Modal
      visible={visible}
      onClose={handleClickCloseModal}
      id="modal-files"
      title="Tranferir cliente a otro banco"
      contentOverflowY="auto"
      size="small"
      minHeight="400px"
      footer={
        <Container width="100%" height="75px" display="flex" justifyContent="end" alignItems="center" gap="20px">
          <Button
            width="150px"
            label="Tranferir"
            shape="default"
            trailingIcon="ri-add-fill"
            onClick={onTranferClient}
            loading={loadingTransferClient}
            disabled={!chbTransferred}
          />
        </Container>
      }
    >
      <Container
        width="100%"
        height="400px"
        display="flex"
        justify-content="center"
        flexDirection="column"
        align-items="center"
        gap="20px"
      >
        <Container width="100%" display="flex" flexDirection="column" gap="10px" padding="20px">
          <Select
            width="100%"
            label="Seleccionar banco:"
            value={chbTransferred}
            options={options}
            onChange={onSelectBank}
          />
        </Container>
      </Container>
    </Modal>
  )
}

export default TransferClientModal
