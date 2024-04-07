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
import { useMutation } from 'react-query'
import { CustomErrorResponse } from 'types/customErrorResponse'

type TransferClientModalProps = {
  visible: boolean
  onClose: () => void
  code: string
}

const TransferClientModal = ({ visible, onClose, code }: TransferClientModalProps) => {
  const {
    client: { customer },
    bank: {
      selectedBank: { idBank, idCHB },
    },
  } = useLoloContext()

  const [chbTransferred, setChbTransferred] = useState<string>('')

  const options: Array<SelectItemType> = customer.customerBanks
    .filter((bank) => bank.id !== (!!idBank ? parseInt(idBank) : 0))
    .map((bank) => {
      return {
        key: String(bank.id),
        label: bank.name,
      }
    })

  const { isLoading: loadingTransferClient, mutate: transferClient } = useMutation<
    AxiosResponse<{ chbTransferred: string }>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      return await tranferClientToAnotherBank(code, idCHB, chbTransferred)
    },
    {
      onSuccess: (result) => {
        notification({ type: 'success', message: 'Cliente Transferido' })
        onClose()
      },
      onError: (error) => {
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
      minHeight="200px"
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
        height="200px"
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
