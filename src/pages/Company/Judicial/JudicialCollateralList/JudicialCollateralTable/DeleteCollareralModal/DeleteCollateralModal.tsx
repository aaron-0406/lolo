import Button from '@/ui/Button'
import Container from '@/ui/Container'
import Modal from '@/ui/Modal'
import notification from '@/ui/notification'
import { AxiosError, AxiosResponse } from 'axios'
import { FC } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { CustomErrorResponse } from 'types/customErrorResponse'
import judicialCollateralCache from '../utils/judicial-collateral.cache'
import { deleteJudicialCollateral } from '@/services/judicial/judicial-collateral.service'
import { useLoloContext } from '@/contexts/LoloProvider'

type DeleteCollateralModalProps = {
  visible: boolean
  onClose: () => void
  id?: number
}

const DeleteCollateralModal: FC<DeleteCollateralModalProps> = ({
  visible,
  id = 0,
  onClose,
}) => {
  const queryClient = useQueryClient()

  const {
    bank: { selectedBank: { idCHB: chb } },
  } = useLoloContext()
  const {
    actions: { deleteCollateralCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = judicialCollateralCache(queryClient)

  const { isLoading: loadingDeleteUser, mutate: deleteCollateralMutate } = useMutation<
    AxiosResponse<{ id: string }>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      return await deleteJudicialCollateral(id)
    },
    {
      onSuccess: (result) => {
        deleteCollateralCache(result.data.id, Number(chb))
        notification({ type: 'success', message: 'Expediente eliminado' })
        onClose()
      },
      onMutate: () => {
        return onMutateCache(id ? id : 0) 
      },
      onSettled: () => {
        onSettledCache(id ? id : 0)
      },
      onError: (error, _, context: any) => {
        onErrorCache(context, id ? id : 0)
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )

  const onDeleteCollateral = () => {
    if (id !== 0) deleteCollateralMutate()
  }
  
  return (
    <Modal
      visible={visible}
      onClose={onClose}
      id="modal-delete"
      title="Desea eliminar este expediente?"
      contentOverflowY="auto"
      size="small"
      footer={
        <Container width="100%" justifyContent="space-around" display="flex" alignItems="center">
          {<Button onClick={onDeleteCollateral} loading={loadingDeleteUser} display="danger" size="default" label="ACEPTAR" />}
          {<Button onClick={onClose} size="default" label="CANCELAR" />}
        </Container>
      }
    ></Modal>
  )
}

export default DeleteCollateralModal
