import { AxiosError, AxiosResponse } from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import Container from '@/ui/Container'
import Modal from '@/ui/Modal'
import notification from '@/ui/notification'
import Button from '@/ui/Button'
import judicialRegisterOfficeCache from '../../JudicialRegisterOfficeTable/utils/judicial-register-office.cache'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { useLoloContext } from '@/contexts/LoloProvider'
import { deleteJudicialRegisterOffice } from '@/services/judicial/judicial-register-office.service'

type DeleteRegisterOfficeProps = {
  isOpen: boolean
  onClose: () => void
  id?: number
}

const DeleteRegisterOffice = ({ isOpen, id = 0, onClose }: DeleteRegisterOfficeProps) => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const chbNumber = parseInt(chb.length ? chb : '0')

  const queryClient = useQueryClient()

  const {
    actions: { deleteRegisterOfficeCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = judicialRegisterOfficeCache(queryClient)

  const { isLoading: loadingDeleteRegisterOffice, mutate: deleteRegisterOfficeMutate } = useMutation<
    AxiosResponse<{ id: string }>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      return await deleteJudicialRegisterOffice(id)
    },
    {
      onSuccess: () => {
        deleteRegisterOfficeCache(String(id), chbNumber)
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
  const handleDeleteRegisterOffice = () => {
    if (id !== 0) {
      deleteRegisterOfficeMutate()
    }
  }

  return (
    <Modal
      visible={isOpen}
      onClose={onClose}
      id="modal-delete"
      title="¿Desea eliminar la oficina registral?"
      contentOverflowY="auto"
      size="small"
      footer={
        <Container width="100%" justifyContent="space-around" display="flex" alignItems="center">
          {
            <Button
              onClick={handleDeleteRegisterOffice}
              loading={loadingDeleteRegisterOffice}
              display="danger"
              size="default"
              label="ACEPTAR"
              permission={'P40-03'}
            />
          }
          {<Button onClick={onClose} size="default" label="CANCELAR" />}
        </Container>
      }
    ></Modal>
  )
}

export default DeleteRegisterOffice
