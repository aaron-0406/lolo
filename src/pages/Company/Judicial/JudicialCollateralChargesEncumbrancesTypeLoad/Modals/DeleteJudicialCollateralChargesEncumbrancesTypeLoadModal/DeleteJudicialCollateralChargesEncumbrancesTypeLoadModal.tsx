import { AxiosError, AxiosResponse } from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import Container from '@/ui/Container'
import Modal from '@/ui/Modal'
import notification from '@/ui/notification'
import Button from '@/ui/Button'
import JudicialEncumbrancesChargesTypeLoadCache from '../../JudicialCollateralChargesEncumbrancesTypeLoadTable/utils/judicial-collateral-charges-encumbrances-type-load.cache'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { useLoloContext } from '@/contexts/LoloProvider'
import { deleteJudicialCollateralChargesEncumbrancesTypeLoad } from '@/services/judicial/judicial-collateral-charges-encumbrances-type-load.service'

type DeleteJudicialCollateralChargesEncumbrancesTypeLoadModalProps = {
  isOpen: boolean
  onClose: () => void
  id?: number
}

const DeleteJudicialCollateralChargesEncumbrancesTypeLoadModal = ({ isOpen, id = 0, onClose }: DeleteJudicialCollateralChargesEncumbrancesTypeLoadModalProps) => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const chbNumber = parseInt(chb.length ? chb : '0')

  const queryClient = useQueryClient()

  const {
    actions: {  deleteChargesEncumbrancesTypeLoadCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = JudicialEncumbrancesChargesTypeLoadCache(queryClient)

  const { isLoading: loadingDeleteJudicialCollateralChargesEncumbrancesTypeLoad, mutate: deleteJudicialCollateralChargesEncumbrancesTypeLoadMutate } = useMutation<
    AxiosResponse<{ id: string }>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      return await deleteJudicialCollateralChargesEncumbrancesTypeLoad(id)
    },
    {
      onSuccess: () => {
        deleteChargesEncumbrancesTypeLoadCache(String(id), chbNumber)
        notification({ type: 'success', message: 'Tipo de carga y gravámenes eliminado' })
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
  const handleDeleteJudicialCollateralChargesEncumbrancesTypeLoad = () => {
    if (id !== 0) {
      deleteJudicialCollateralChargesEncumbrancesTypeLoadMutate()
    }
  }

  return (
    <Modal
      visible={isOpen}
      onClose={onClose}
      id="modal-delete"
      title="¿Desea eliminar el tipo de carga y gravámenes?"
      contentOverflowY="auto"
      size="small"
      footer={
        <Container width="100%" justifyContent="space-around" display="flex" alignItems="center">
          {
            <Button
              onClick={handleDeleteJudicialCollateralChargesEncumbrancesTypeLoad}
              loading={loadingDeleteJudicialCollateralChargesEncumbrancesTypeLoad}
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

export default DeleteJudicialCollateralChargesEncumbrancesTypeLoadModal
