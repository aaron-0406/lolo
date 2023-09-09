import { AxiosError, AxiosResponse } from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import Container from '@/ui/Container'
import Modal from '@/ui/Modal'
import notification from '@/ui/notification'
import Button from '@/ui/Button'
import { deleteFuncionario } from '@/services/dash/funcionario.service'
import dashFuncionariosCache from '../../FuncionariosTable/utils/dash-funcionarios.cache'
import { CustomErrorResponse } from 'types/customErrorResponse'

type DeleteFuncionariosModalProps = {
  visible: boolean
  onClose: () => void
  idAction?: number
  chb: number
}

const DeleteFuncionariosModal = ({ visible, idAction = 0, onClose, chb = 0 }: DeleteFuncionariosModalProps) => {
  const queryClient = useQueryClient()

  const {
    actions: { deleteFuncionarioCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = dashFuncionariosCache(queryClient)

  const { isLoading: loadingDeleteFuncionario, mutate: deleteFuncionarioMutate } = useMutation<
    AxiosResponse<{ id: string }>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      return await deleteFuncionario(idAction)
    },
    {
      onSuccess: () => {
        deleteFuncionarioCache(String(idAction), chb)
        notification({ type: 'success', message: 'Funcionario eliminado' })
        onClose()
      },
      onMutate: () => {
        return onMutateCache(chb)
      },
      onSettled: () => {
        onSettledCache(chb)
      },
      onError: (error, _, context: any) => {
        onErrorCache(context, chb)
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )
  const deleteFuncionarios = () => {
    if (idAction !== 0) {
      deleteFuncionarioMutate()
    }
  }

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      id="modal-delete"
      title="¿Desea eliminar el funcionario?"
      contentOverflowY="auto"
      size="small"
      footer={
        <Container width="100%" justifyContent="space-around" display="flex" alignItems="center">
          {
            <Button
              onClick={deleteFuncionarios}
              loading={loadingDeleteFuncionario}
              display="danger"
              size="default"
              label="ACEPTAR"
            />
          }
          {<Button onClick={onClose} size="default" label="CANCELAR" />}
        </Container>
      }
    ></Modal>
  )
}

export default DeleteFuncionariosModal
