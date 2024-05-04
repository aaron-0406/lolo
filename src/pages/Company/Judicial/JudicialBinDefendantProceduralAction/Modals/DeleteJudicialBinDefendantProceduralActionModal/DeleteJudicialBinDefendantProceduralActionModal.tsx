import Button from '@/ui/Button'
import Container from '@/ui/Container'
import Modal from '@/ui/Modal'
import extBinDefendantProceduralActionsCache from '../../JudicialBinDefendantProceduralActionTable/utils/judicial-bin-defendant-procedural-action.cache'
import { useMutation, useQueryClient } from 'react-query'
import { useLoloContext } from '@/contexts/LoloProvider'
import { AxiosError, AxiosResponse } from 'axios'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { deleteJudicialBinDefendantProceduralAction } from '@/services/judicial/judicial-bin-defendant-procedural-action.service'
import notification from '@/ui/notification'

type DeleteJudicialBinDefendantProceduralActionModalProps = {
  visible: boolean
  onClose: () => void
  idBinDefendantProceduralAction?: number
}

const DeleteJudicialBinDefendantProceduralActionModal = ({
  onClose,
  visible,
  idBinDefendantProceduralAction,
}: DeleteJudicialBinDefendantProceduralActionModalProps) => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()
  const queryClient = useQueryClient()

  const {
    actions: { deleteBinDefendantProceduralActionCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = extBinDefendantProceduralActionsCache(queryClient)

  const { isLoading: loadingDeleteNegotiation, mutate: deleteNegotiationMutate } = useMutation<
    AxiosResponse<{ id: string }>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      return await deleteJudicialBinDefendantProceduralAction(Number(idBinDefendantProceduralAction))
    },
    {
      onSuccess: (result) => {
        deleteBinDefendantProceduralActionCache(result.data.id, parseInt(chb))
        notification({ type: 'success', message: 'Actuación procesal demandada eliminada' })
        onClose()
      },
      onMutate: () => {
        return onMutateCache(parseInt(chb))
      },
      onSettled: () => {
        onSettledCache(parseInt(chb))
      },
      onError: (error, _, context: any) => {
        onErrorCache(context, parseInt(chb))
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )

  const handleClickDelete = () => {
    if (idBinDefendantProceduralAction !== 0) {
      deleteNegotiationMutate()
    }
  }

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      id="modal-delete"
      title="¿Desea eliminar esta actuacion procedimental demandada?"
      contentOverflowY="auto"
      size="small"
      footer={
        <Container width="100%" justifyContent="space-around" display="flex" alignItems="center">
          <Button
            onClick={handleClickDelete}
            loading={loadingDeleteNegotiation}
            display="danger"
            size="default"
            label="ACEPTAR"
          />
          <Button onClick={onClose} size="default" label="CANCELAR" />
        </Container>
      }
    />
  )
}

export default DeleteJudicialBinDefendantProceduralActionModal
