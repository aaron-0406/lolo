import { AxiosError, AxiosResponse } from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import Container from '@/ui/Container'
import Modal from '@/ui/Modal'
import notification from '@/ui/notification'
import Button from '@/ui/Button'
import judicialCollateralFilesCache from '../../JudicialCollateralFilesTable/utils/judicial-collateral-files.cache'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { useLoloContext } from '@/contexts/LoloProvider'
import { deleteJudicialCollateralFiles } from '@/services/judicial/judicial-collateral-files.service'
import { useParams } from 'react-router-dom'

type DeleteCollateralFilesModalProps = {
  isOpen: boolean
  onClose: () => void
  id?: number
}

const DeleteCollateralFilesModal = ({ isOpen, id = 0, onClose }: DeleteCollateralFilesModalProps) => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const chbNumber = parseInt(chb.length ? chb : '0')
  const collateralId = useParams().collateralCode ?? ''
  const queryClient = useQueryClient()

  const {
    actions: { deleteCollateralFilesCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = judicialCollateralFilesCache(queryClient)

  const { isLoading: loadingDeleteCollateralFiles, mutate: deleteCollateralFilesMutate } = useMutation<
    AxiosResponse<{ id: string }>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      return await deleteJudicialCollateralFiles(id, Number(chbNumber), Number(collateralId))
    },
    {
      onSuccess: () => {
        deleteCollateralFilesCache(String(id), Number(collateralId), chbNumber)
        notification({ type: 'success', message: 'Archivo eliminado' })
        onClose()
      },
      onMutate: () => {
        return onMutateCache(chbNumber, Number(collateralId))
      },
      onSettled: () => {
        onSettledCache(chbNumber,Number(collateralId))
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
  const handleDeleteCollateralFiles = () => {
    if (id !== 0) {
      deleteCollateralFilesMutate()
    }
  }

  return (
    <Modal
      visible={isOpen}
      onClose={onClose}
      id="modal-delete"
      title="¿Desea eliminar la archivo?"
      contentOverflowY="auto"
      size="small"
      footer={
        <Container width="100%" justifyContent="space-around" display="flex" alignItems="center">
          {
            <Button
              onClick={handleDeleteCollateralFiles}
              loading={loadingDeleteCollateralFiles}
              display="danger"
              size="default"
              label="ACEPTAR"
              permission='P13-01-06-01-03-04'
            />
          }
          {<Button onClick={onClose} size="default" label="CANCELAR" />}
        </Container>
      }
    ></Modal>
  )
}

export default DeleteCollateralFilesModal
