import { useLoloContext } from '@/contexts/LoloProvider'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import Modal from '@/ui/Modal'
import { AxiosError, AxiosResponse } from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { CustomErrorResponse } from '../../../../../../types/customErrorResponse';
import notification from '@/ui/notification'
import { deleteJudicialCollateralAuctionRound } from '@/services/judicial/judicial-collateral-auction-round.service' 
import JudicialCaseFileAuctionRound from '../../JudicialFileCaseAuctionRoundListTable/utils/judicial-file-case-auction-round-list-table.cache'
type DeleteCaseFileAuctionRoundModalProps = {
  isOpen: boolean
  onClose: () => void
  id?: number
  collateralId?: number
  caseFileId: number
}
const DeleteCaseFileAuctionRoundModal = ({ isOpen, onClose, id, collateralId, caseFileId }: DeleteCaseFileAuctionRoundModalProps) => {
  const {  
    bank: {
      selectedBank: { idCHB: chb },
    },  
  } = useLoloContext()
  const queryClient = useQueryClient()
  const {
    actions: { deleteFileCaseAuctionRoundListCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = JudicialCaseFileAuctionRound(queryClient)

  const { isLoading: loadingDeleteCaseFileAuctionRound, mutate: deleteCaseFileAuctionRoundMutate } = useMutation<
    AxiosResponse<{ id: string }>,
    AxiosError<CustomErrorResponse>
    >(
      async () => {
        return await deleteJudicialCollateralAuctionRound(Number(chb), Number(collateralId), id ?? 0)
      },
      {
        onSuccess: () => {
          deleteFileCaseAuctionRoundListCache(String(id), Number(caseFileId))
          notification({ type: 'success', message: 'Rueda de remate eliminada' })
          onClose()
        },
        onMutate: () => {
          return onMutateCache( caseFileId ?? 0)
        },
        onSettled: () => {
          onSettledCache( caseFileId ?? 0)
        },
        onError: (error, _, context: any) => {
          onErrorCache(context, caseFileId ?? 0)
          notification({
            type: 'error',
            message: error.response?.data.message,
            list: error.response?.data?.errors?.map((error) => error.message),
          })
        },
      }
    )
  const handleDeleteCaseFileAuctionRound = () => {
    if (id !== 0) {
      deleteCaseFileAuctionRoundMutate()
    }
  }
    
  return (
    <Modal
      visible={isOpen}
      onClose={onClose}
      id="delete-CaseFile-auction-round-modal"
      title="¿Desea eliminar la ronda de remate?"
      contentOverflowY='auto'
      size='small'
      footer={
        <Container width="100%" justifyContent="space-around" display="flex" alignItems="center">
          {
            <Button
              onClick={handleDeleteCaseFileAuctionRound}
              loading={loadingDeleteCaseFileAuctionRound}
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

export default DeleteCaseFileAuctionRoundModal