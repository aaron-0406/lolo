import { AxiosError, AxiosResponse } from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import Container from '@/ui/Container'
import Modal from '@/ui/Modal'
import notification from '@/ui/notification'
import Button from '@/ui/Button'
import judicialUseOfPropertyCache from '../../JudicialUseOfPropertyTable/utils/judicial-use-of-property.cache'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { useLoloContext } from '@/contexts/LoloProvider'
import { deleteJudicialUseOfProperty } from '@/services/judicial/judicial-use-of-property.service'

type DeleteUseOfPropertyProps = {
  isOpen: boolean
  onClose: () => void
  id?: number
}

const DeleteUseOfProperty = ({ isOpen, id = 0, onClose }: DeleteUseOfPropertyProps) => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const chbNumber = parseInt(chb.length ? chb : '0')

  const queryClient = useQueryClient()

  const {
    actions: { deleteUseOfPropertyCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = judicialUseOfPropertyCache(queryClient)

  const { isLoading: loadingDeleteUseOfProperty, mutate: deleteUseOfPropertyMutate } = useMutation<
    AxiosResponse<{ id: string }>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      return await deleteJudicialUseOfProperty(id)
    },
    {
      onSuccess: () => {
        deleteUseOfPropertyCache(String(id), chbNumber)
        notification({ type: 'success', message: 'Uso de propiedad eliminada' })
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
  const handleDeleteUseOfProperty = () => {
    if (id !== 0) {
      deleteUseOfPropertyMutate()
    }
  }

  return (
    <Modal
      visible={isOpen}
      onClose={onClose}
      id="modal-delete"
      title="¿Desea eliminar el Uso de Propiedad?"
      contentOverflowY="auto"
      size="small"
      footer={
        <Container width="100%" justifyContent="space-around" display="flex" alignItems="center">
          {
            <Button
              onClick={handleDeleteUseOfProperty}
              loading={loadingDeleteUseOfProperty}
              display="danger"
              size="default"
              label="ACEPTAR"
              permission='P38-03'
            />
          }
          {<Button onClick={onClose} size="default" label="CANCELAR" />}
        </Container>
      }
    ></Modal>
  )
}

export default DeleteUseOfProperty
