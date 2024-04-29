import Button from '@/ui/Button'
import Container from '@/ui/Container'
import Modal from '@/ui/Modal'
import extBinProceduralStagesCache from '../../JudicialBinProceduralStageTable/utils/judicial-bin-procedural-stage.cache'
import { useMutation, useQueryClient } from 'react-query'
import { useLoloContext } from '@/contexts/LoloProvider'
import { AxiosError, AxiosResponse } from 'axios'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { deleteJudicialBinProceduralStage } from '@/services/judicial/judicial-bin-procedural-stage.service'
import notification from '@/ui/notification'

type DeleteJudicialBinProceduralStageModalProps = {
  visible: boolean
  onClose: () => void
  idBinProceduralStage?: number
}

const DeleteJudicialBinProceduralStageModal = ({
  onClose,
  visible,
  idBinProceduralStage,
}: DeleteJudicialBinProceduralStageModalProps) => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()
  const queryClient = useQueryClient()

  const {
    actions: { deleteBinProceduralStageCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = extBinProceduralStagesCache(queryClient)

  const { isLoading: loadingDeleteNegotiation, mutate: deleteNegotiationMutate } = useMutation<
    AxiosResponse<{ id: string }>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      return await deleteJudicialBinProceduralStage(Number(idBinProceduralStage))
    },
    {
      onSuccess: (result) => {
        deleteBinProceduralStageCache(result.data.id, parseInt(chb))
        notification({ type: 'success', message: 'Tipo de Bitacora eliminada' })
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
    if (idBinProceduralStage !== 0) {
      deleteNegotiationMutate()
    }
  }

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      id="modal-delete"
      title="¿Desea eliminar esta etapa procedimental?"
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

export default DeleteJudicialBinProceduralStageModal
