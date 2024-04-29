import { useLoloContext } from '@/contexts/LoloProvider'
import { useMutation, useQueryClient } from 'react-query'
import extBinTypeBinnaclesCache from '../../JudicialBinTypeBinnacleTable/utils/judicial-bin-type-binnacle.cache'
import { AxiosError, AxiosResponse } from 'axios'
import notification from '@/ui/notification'
import { deleteJudicialBinTypeBinnacle } from '@/services/judicial/judicial-bin-type-binnacle.service'
import { CustomErrorResponse } from 'types/customErrorResponse'
import Modal from '@/ui/Modal'
import Button from '@/ui/Button'
import Container from '@/ui/Container'

type DeleteJudicialBinTypeBinnacleModalProps = {
  visible: boolean
  onClose: () => void
  idBinTypeBinnacle?: number
}

const DeleteJudicialBinTypeBinnacleModal = ({
  onClose,
  visible,
  idBinTypeBinnacle,
}: DeleteJudicialBinTypeBinnacleModalProps) => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()
  const queryClient = useQueryClient()

  const {
    actions: { deleteBinTypeBinnacleCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = extBinTypeBinnaclesCache(queryClient)

  const { isLoading: loadingDeleteNegotiation, mutate: deleteNegotiationMutate } = useMutation<
    AxiosResponse<{ id: string }>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      return await deleteJudicialBinTypeBinnacle(Number(idBinTypeBinnacle))
    },
    {
      onSuccess: (result) => {
        deleteBinTypeBinnacleCache(result.data.id, parseInt(chb))
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
    if (idBinTypeBinnacle !== 0) {
      deleteNegotiationMutate()
    }
  }

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      id="modal-delete"
      title="¿Desea eliminar este tipo de bitacora?"
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

export default DeleteJudicialBinTypeBinnacleModal
