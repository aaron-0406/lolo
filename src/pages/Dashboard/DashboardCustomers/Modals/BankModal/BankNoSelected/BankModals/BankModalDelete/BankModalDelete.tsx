import { useMutation, useQueryClient } from 'react-query'
import { deleteBank } from '../../../../../../../../shared/services/dash/bank.service'
import notification from '../../../../../../../../ui/notification'
import Modal from '../../../../../../../../ui/Modal'
import Container from '../../../../../../../../ui/Container'
import Button from '../../../../../../../../ui/Button'
import dashBanksCache from '../../utils/dash-banks.cache'
import { AxiosResponse } from 'axios'

type BankModalDeleteProps = {
  visible: boolean
  onClose: () => void
  idBank: number
}

const BankModalDelete = ({ visible, idBank = 0, onClose }: BankModalDeleteProps) => {
  const queryClient = useQueryClient()

  const {
    actions: { deleteBankCache },
    onMutateBankCache,
    onSettledBankCache,
    onErrorBankCache,
  } = dashBanksCache(queryClient)

  const { isLoading: loadingDeleteBank, mutate: deleteBankMutate } = useMutation<AxiosResponse<{ id: string }>, Error>(
    async () => {
      return await deleteBank(idBank)
    },
    {
      onSuccess: () => {
        deleteBankCache(String(idBank))
        notification({ type: 'success', message: 'Banco eliminado' })
        onClose()
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

  const deleteBanks = () => {
    if (idBank !== 0) {
      deleteBankMutate()
    }
  }

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      id="modal-delete"
      title="¿Desea eliminar la acción?"
      contentOverflowY="auto"
      size="small"
      footer={
        <Container width="100%" justifyContent="space-around" display="flex" alignItems="center">
          <Button onClick={deleteBanks} loading={loadingDeleteBank} display="danger" size="default" label="ACEPTAR" />
          <Button onClick={onClose} size="default" label="CANCELAR" />
        </Container>
      }
    ></Modal>
  )
}

export default BankModalDelete
