import { useLoloContext } from '@/contexts/LoloProvider'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import Modal from '@/ui/Modal'
import { AxiosError, AxiosResponse } from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { CustomErrorResponse } from '../../../../../../types/customErrorResponse';
import notification from '@/ui/notification'
import { deleteJudicialCollateralAuctionRound } from '@/services/judicial/judicial-collateral-auction-round.service'
import { useParams } from 'react-router-dom'
import JudicialCollateralAuctionRound from '../../JudicialCollateralAuctionRoundListTable/utils/judicial-collateral-auction-round-list.cache'
type DeleteCollateralAuctionRoundModalProps = {
  isOpen: boolean
  onClose: () => void
  id?: number
}
const DeleteCollateralAuctionRoundModal = ({ isOpen, onClose, id }: DeleteCollateralAuctionRoundModalProps) => {
  const collateralCode = useParams().collateralCode ?? ''
  const {  
    bank: {
      selectedBank: { idCHB: chb },
    },  
  } = useLoloContext()
  const queryClient = useQueryClient()
  const {
    actions: { deleteCollateralAuctionRoundListCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = JudicialCollateralAuctionRound(queryClient)

  const { isLoading: loadingDeleteCollateralAuctionRound, mutate: deleteCollateralAuctionRoundMutate } = useMutation<
    AxiosResponse<{ id: string }>,
    AxiosError<CustomErrorResponse>
    >(
      async () => {
        return await deleteJudicialCollateralAuctionRound(Number(chb), Number(collateralCode), id ?? 0)
      },
      {
        onSuccess: () => {
          deleteCollateralAuctionRoundListCache(String(id), Number(collateralCode))
          notification({ type: 'success', message: 'Rueda de remate eliminada' })
          onClose()
        },
        onMutate: () => {
          return onMutateCache( Number(collateralCode))
        },
        onSettled: () => {
          onSettledCache(Number(collateralCode))
        },
        onError: (error, _, context: any) => {
          onErrorCache(context, Number(collateralCode))
          notification({
            type: 'error',
            message: error.response?.data.message,
            list: error.response?.data?.errors?.map((error) => error.message),
          })
        },
      }
    )
  const handleDeleteCollateralAuctionRound = () => {
    if (id !== 0) {
      deleteCollateralAuctionRoundMutate()
    }
  }
    
  return (
    <Modal
      visible={isOpen}
      onClose={onClose}
      id="delete-collateral-auction-round-modal"
      title="¿Desea eliminar la ronda de remate?"
      contentOverflowY='auto'
      size='small'
      footer={
        <Container width="100%" justifyContent="space-around" display="flex" alignItems="center">
          {
            <Button
              onClick={handleDeleteCollateralAuctionRound}
              loading={loadingDeleteCollateralAuctionRound}
              display="danger"
              size="default"
              label="ACEPTAR"
              permission="P13-01-06-01-04-04"
            />
          }
          {<Button onClick={onClose} size="default" label="CANCELAR" />}
        </Container>
      }
    >
    </Modal>
  )
}

export default DeleteCollateralAuctionRoundModal