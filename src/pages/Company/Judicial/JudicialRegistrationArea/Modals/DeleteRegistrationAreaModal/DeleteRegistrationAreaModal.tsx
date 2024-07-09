import { AxiosError, AxiosResponse } from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import Container from '@/ui/Container'
import Modal from '@/ui/Modal'
import notification from '@/ui/notification'
import Button from '@/ui/Button'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { useLoloContext } from '@/contexts/LoloProvider'
import { deleteJudicialRegistrationArea } from '@/services/judicial/judicial-registration-area.service'
import judicialRegistrationAreaCache from '../../JudicialRegistrationAreaTable/utils/judicial-registration-area.cache'

type DeleteRegistrationAreaProps = {
  isOpen: boolean
  onClose: () => void
  id?: number
}

const DeleteRegistrationArea = ({ isOpen, id = 0, onClose }: DeleteRegistrationAreaProps) => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const chbNumber = parseInt(chb.length ? chb : '0')

  const queryClient = useQueryClient()

  const {
    actions: { deleteRegistrationAreaCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = judicialRegistrationAreaCache(queryClient)

  const { isLoading: loadingDeleteRegistrationArea, mutate: deleteRegistrationAreaMutate } = useMutation<
    AxiosResponse<{ id: string }>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      return await deleteJudicialRegistrationArea(id)
    },
    {
      onSuccess: () => {
        deleteRegistrationAreaCache(String(id), chbNumber)
        notification({ type: 'success', message: 'Oficina registral eliminada' })
        onClose()
      },
      onMutate: () => {
        return onMutateCache(chbNumber)
      },
      onSettled: () => {
        onSettledCache(chbNumber)
      },
      onError: (error, _, context: any) => {
        onErrorCache(context, chbNumber)
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )
  const handleDeleteRegistrationArea = () => {
    if (id !== 0) {
      deleteRegistrationAreaMutate()
    }
  }

  return (
    <Modal
      visible={isOpen}
      onClose={onClose}
      id="modal-delete"
      title="¿Desea eliminar la zona registral?"
      contentOverflowY="auto"
      size="small"
      footer={
        <Container width="100%" justifyContent="space-around" display="flex" alignItems="center">
          {
            <Button
              onClick={handleDeleteRegistrationArea}
              loading={loadingDeleteRegistrationArea}
              display="danger"
              size="default"
              label="ACEPTAR"
              permission='P39-03'
            />
          }
          {<Button onClick={onClose} size="default" label="CANCELAR" />}
        </Container>
      }
    ></Modal>
  )
}

export default DeleteRegistrationArea
