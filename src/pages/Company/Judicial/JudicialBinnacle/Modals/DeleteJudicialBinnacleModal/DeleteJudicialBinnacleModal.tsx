import Button from '@/ui/Button'
import Container from '@/ui/Container'
import Modal from '@/ui/Modal'
import { useMutation, useQueryClient } from 'react-query'
import judicialBinnacleCache from '../../JudicialBinnacleTable/utils/judicial-binnacle.cache'
import { AxiosError } from 'axios'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { deleteBinnacle } from '@/services/judicial/judicial-binnacle.service'
import notification from '@/ui/notification'

type DeleteJudicialBinnacleModalProps = {
  visible: boolean
  onClose: () => void
  idBinnacle?: number
  judicialFileCaseId?: number
  clientCode: string
}
const DeleteJudicialBinnacleModal = ({
  visible,
  onClose,
  idBinnacle = 0,
  judicialFileCaseId = 0,
}: DeleteJudicialBinnacleModalProps) => {
  const queryClient = useQueryClient()

  const {
    actions: { deleteJudicialBinnacleCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = judicialBinnacleCache(queryClient)

  const { isLoading: loadingDeleteBinnacle, mutate: deleteBinnacleMutate } = useMutation<
    any,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      return await deleteBinnacle(idBinnacle)
    },
    {
      onSuccess: () => {
        deleteJudicialBinnacleCache(idBinnacle, judicialFileCaseId)
        notification({ type: 'success', message: 'Bitacora eliminada' })
        onClose()
      },
      onMutate: () => {
        return onMutateCache(judicialFileCaseId)
      },
      onSettled: () => {
        onSettledCache(judicialFileCaseId)
      },
      onError: (error, _, context: any) => {
        onErrorCache(context, judicialFileCaseId)
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )

  const deleteBinnacles = () => {
    if (idBinnacle !== 0) {
      deleteBinnacleMutate()
    }
  }

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      id="modal-delete"
      title="¿Desea eliminar la bitacora?"
      contentOverflowY="auto"
      size="small"
      footer={
        <Container width="100%" justifyContent="space-around" display="flex" alignItems="center">
          <Button
            onClick={deleteBinnacles}
            loading={loadingDeleteBinnacle}
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

export default DeleteJudicialBinnacleModal
