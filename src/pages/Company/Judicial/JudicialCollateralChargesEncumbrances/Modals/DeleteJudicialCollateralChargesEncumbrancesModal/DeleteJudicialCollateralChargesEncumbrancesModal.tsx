import { AxiosError, AxiosResponse } from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import Container from '@/ui/Container'
import Modal from '@/ui/Modal'
import notification from '@/ui/notification'
import Button from '@/ui/Button'
import judicialChargesEncumbrancesCache from '../../JudicialCollateralChargesEncumbrancesTable/utils/judicial-charges-encumbrances.cache'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { useLoloContext } from '@/contexts/LoloProvider'
import { deleteJudicialCollateralChargesEncumbrances } from '@/services/judicial/judicial-collateral-charges-encumbrances.service'

type DeleteChargesEncumbrancesModalProps = {
  isOpen: boolean
  onClose: () => void
  id?: number
}

const DeleteChargesEncumbrancesModal = ({ isOpen, id = 0, onClose }: DeleteChargesEncumbrancesModalProps) => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const chbNumber = parseInt(chb.length ? chb : '0')

  const queryClient = useQueryClient()

  const {
    actions: { deleteChargesEncumbrancesCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = judicialChargesEncumbrancesCache(queryClient)

  const { isLoading: loadingDeleteChargesEncumbrances, mutate: deleteChargesEncumbrancesMutate } = useMutation<
    AxiosResponse<{ id: string }>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      return await deleteJudicialCollateralChargesEncumbrances(id)
    },
    {
      onSuccess: () => {
        deleteChargesEncumbrancesCache(String(id), chbNumber)
        notification({ type: 'success', message: 'Carga y Gravamen eliminado' })
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
  const handleDeleteChargesEncumbrances = () => {
    if (id !== 0) {
      deleteChargesEncumbrancesMutate()
    }
  }

  return (
    <Modal
      visible={isOpen}
      onClose={onClose}
      id="modal-delete"
      title="¿Desea eliminar la Carga y Gravamen?"
      contentOverflowY="auto"
      size="small"
      footer={
        <Container width="100%" justifyContent="space-around" display="flex" alignItems="center">
          {
            <Button
              onClick={handleDeleteChargesEncumbrances}
              loading={loadingDeleteChargesEncumbrances}
              display="danger"
              size="default"
              label="ACEPTAR"
              permission='P41-03'
            />
          }
          {<Button onClick={onClose} size="default" label="CANCELAR" />}
        </Container>
      }
    ></Modal>
  )
}

export default DeleteChargesEncumbrancesModal
