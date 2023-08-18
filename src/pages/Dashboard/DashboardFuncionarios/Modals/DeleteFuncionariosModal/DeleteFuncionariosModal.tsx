import { useMutation, useQueryClient } from 'react-query'
import Container from '../../../../../ui/Container'
import Modal from '../../../../../ui/Modal'
import notification from '../../../../../ui/notification'
import Button from '../../../../../ui/Button'
import { deleteFuncionario } from '../../../../../shared/services/dash/funcionario.service'
import dashFuncionariosCache from '../../FuncionariosTable/utils/dash-funcionarios.cache'
import { AxiosResponse } from 'axios'

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
    Error
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
        onMutateCache(chb)
      },
      onSettled: () => {
        onSettledCache(chb)
      },
      onError: (error: any, _, context: any) => {
        onErrorCache(context, chb)
        notification({
          type: 'error',
          message: error.response.data.message,
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
      title="¿Desea eliminar la acción?"
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
