import { useMutation, useQueryClient } from 'react-query'
import { AxiosError, AxiosResponse } from 'axios'
import notification from '@/ui/notification'
import Modal from '@/ui/Modal'
import Container from '@/ui/Container'
import Button from '@/ui/Button'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { useLoloContext } from '@/contexts/LoloProvider'
import { deleteProceduralWay } from '@/services/judicial/judicial-procedural-way.service'
import judicialProceduralWayCache from '../../ProceduralWayTable/utils/judicial-procedural-way.cache'

type DeleteProceduralWayModalProps = {
  visible: boolean
  onClose: () => void
  idNegociation?: number
}

const DeleteProceduralWayModal = ({ visible, idNegociation = 0, onClose }: DeleteProceduralWayModalProps) => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const queryClient = useQueryClient()

  const {
    actions: { deleteProceduralWayCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = judicialProceduralWayCache(queryClient)

  const { isLoading: loadingDeleteProceduralWay, mutate: deleteProceduralWayMutate } = useMutation<
    AxiosResponse<{ id: string }>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      return await deleteProceduralWay(idNegociation)
    },
    {
      onSuccess: (result) => {
        deleteProceduralWayCache(result.data.id, parseInt(chb))
        notification({ type: 'success', message: 'Via Procedimental eliminada' })
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
    if (idNegociation !== 0) {
      deleteProceduralWayMutate()
    }
  }

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      id="modal-delete"
      title="¿Desea eliminar esta Via Procedimental?"
      contentOverflowY="auto"
      size="small"
      footer={
        <Container width="100%" justifyContent="space-around" display="flex" alignItems="center">
          <Button
            onClick={handleClickDelete}
            loading={loadingDeleteProceduralWay}
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

export default DeleteProceduralWayModal
