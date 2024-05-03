import { useMutation, useQueryClient } from 'react-query'
import { AxiosError } from 'axios'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import Modal from '@/ui/Modal'
import notification from '@/ui/notification'
import Text from '@/ui/Text'
import { deleteObservation } from '@/services/judicial/judicial-observation.service'
import judicialObservationCache from '../../FileCaseObservationTable/utils/judicial-observation.cache'
import { CustomErrorResponse } from 'types/customErrorResponse'

type DeleteJudicialObservationModalProps = {
  visible: boolean
  onClose: () => void
  idObservation?: number
  judicialFileCaseId?: number
  clientCode: string
  countFilesDelete: number
}
const DeleteJudicialObservationModal = ({
  visible,
  onClose,
  idObservation = 0,
  judicialFileCaseId = 0,
  countFilesDelete = 0,
}: DeleteJudicialObservationModalProps) => {
  const queryClient = useQueryClient()

  const {
    actions: { deleteJudicialObservationCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = judicialObservationCache(queryClient)

  const { isLoading: loadingDeleteObservation, mutate: deleteObservationMutate } = useMutation<
    any,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      return await deleteObservation(idObservation)
    },
    {
      onSuccess: () => {
        deleteJudicialObservationCache(idObservation, judicialFileCaseId)
        notification({ type: 'success', message: 'Observación eliminada' })
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

  const deleteObservations = () => {
    if (idObservation !== 0) {
      deleteObservationMutate()
    }
  }

  let content: JSX.Element

  switch (true) {
    case countFilesDelete === 0:
      content = (
        <Text.Body size="l" weight="regular">
          No hay archivos adjuntos a esta observación.
        </Text.Body>
      )
      break
    case countFilesDelete === 1:
      content = (
        <Text.Body size="l" weight="regular">
          ¡Existe
          <Text.Body size="l" weight="bold" color="Primary5">
            {' 1 archivo '}
          </Text.Body>
          adjunto a esta observación que también será eliminado!
        </Text.Body>
      )
      break
    default:
      content = (
        <Text.Body size="l" weight="regular">
          ¡Existen
          <Text.Body size="l" weight="bold" color="Primary5">
            {` ${countFilesDelete} archivos `}
          </Text.Body>
          adjuntos a esta observación que también serán eliminados!
        </Text.Body>
      )
      break
  }

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      id="modal-delete"
      title="¿Desea eliminar la observación?"
      contentOverflowY="auto"
      size="small"
      footer={
        <Container width="100%" justifyContent="space-around" display="flex" alignItems="center">
          <Button
            onClick={deleteObservations}
            loading={loadingDeleteObservation}
            display="danger"
            size="default"
            label="ACEPTAR"
          />
          <Button onClick={onClose} size="default" label="CANCELAR" />
        </Container>
      }
    >
      <Container width="100%" justifyContent="start" display="flex" padding="10px 40px" alignItems="center">
        {content}
      </Container>
    </Modal>
  )
}

export default DeleteJudicialObservationModal
