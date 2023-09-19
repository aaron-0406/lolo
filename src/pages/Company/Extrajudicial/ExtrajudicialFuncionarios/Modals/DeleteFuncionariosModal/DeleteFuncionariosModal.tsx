import { AxiosError, AxiosResponse } from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import Container from '@/ui/Container'
import Modal from '@/ui/Modal'
import notification from '@/ui/notification'
import Button from '@/ui/Button'
import { deleteFuncionario } from '@/services/extrajudicial/funcionario.service'
import extFuncionariosCache from '../../FuncionariosTable/utils/ext-funcionarios.cache'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { useLoloContext } from '@/contexts/LoloProvider'

type DeleteFuncionariosModalProps = {
  visible: boolean
  onClose: () => void
  idAction?: number
}

const DeleteFuncionariosModal = ({ visible, idAction = 0, onClose }: DeleteFuncionariosModalProps) => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const queryClient = useQueryClient()

  const {
    actions: { deleteFuncionarioCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = extFuncionariosCache(queryClient)

  const { isLoading: loadingDeleteFuncionario, mutate: deleteFuncionarioMutate } = useMutation<
    AxiosResponse<{ id: string }>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      return await deleteFuncionario(idAction)
    },
    {
      onSuccess: () => {
        deleteFuncionarioCache(String(idAction), parseInt(chb))
        notification({ type: 'success', message: 'Funcionario eliminado' })
        onClose()
      },
      onMutate: () => {
        return onMutateCache(parseInt(chb))
      },
      onSettled: () => {
        onSettledCache(parseInt(chb))
      },
      onError: (error, _, context: any) => {
        onErrorCache(context, parseInt(chb))
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
