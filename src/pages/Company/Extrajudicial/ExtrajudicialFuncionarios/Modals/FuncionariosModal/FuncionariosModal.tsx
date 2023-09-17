import { useEffect } from 'react'
import { AxiosError, AxiosResponse } from 'axios'
import { FormProvider, useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { FuncionarioType } from '@/types/extrajudicial/funcionario.type'
import { ModalFuncionariosResolver } from './FuncionariosModal.yup'
import {
  createFuncionario,
  getAllFuncionariosByID,
  editFuncionarioById,
} from '@/services/extrajudicial/funcionario.service'
import notification from '@/ui/notification'
import Modal from '@/ui/Modal'
import Container from '@/ui/Container'
import Button from '@/ui/Button'
import FuncionarioInfoForm from './FuncionarioInfoForm/FuncionarioInfoForm'
import extFuncionariosCache from '../../FuncionariosTable/utils/ext-funcionarios.cache'
import { CustomErrorResponse } from 'types/customErrorResponse'

type FuncionariosModalProps = {
  visible: boolean
  onClose: () => void
  isEdit?: boolean
  idFuncionario?: number
  chb: number
}
const defaultValuesFuncionarios: Omit<FuncionarioType, ''> = {
  id: 0,
  name: '',
  createdAt: new Date(),
  customerHasBankId: 0,
}

const FuncionariosModal = ({ visible, onClose, isEdit = false, idFuncionario = 0, chb }: FuncionariosModalProps) => {
  const queryClient = useQueryClient()
  const {
    actions: { createFuncionarioCache, editFuncionarioCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = extFuncionariosCache(queryClient)

  const formMethods = useForm<FuncionarioType>({
    resolver: ModalFuncionariosResolver,
    mode: 'all',
    defaultValues: defaultValuesFuncionarios,
  })

  const {
    setValue,
    getValues,
    reset,
    formState: { isValid },
  } = formMethods

  const { isLoading: loadingCreateFuncionarios, mutate: createFuncionarios } = useMutation<
    AxiosResponse<FuncionarioType>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { id, ...restClient } = getValues()
      return await createFuncionario({ ...restClient, customerHasBankId: chb })
    },
    {
      onSuccess: (result) => {
        createFuncionarioCache(result.data)
        notification({ type: 'success', message: 'Funcionario creado' })
        handleClickCloseModal()
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

  const { isLoading: loadingEditFuncionario, mutate: editFuncionario } = useMutation<
    AxiosResponse<FuncionarioType>,
    Error
  >(
    async () => {
      const { id, ...restClient } = getValues()
      return await editFuncionarioById(id, { ...restClient, customerHasBankId: chb })
    },
    {
      onSuccess: (result) => {
        editFuncionarioCache(result.data)
        notification({ type: 'success', message: 'Funcionario editado' })
        handleClickCloseModal()
      },
      onMutate: () => {
        return onMutateCache(chb)
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

  const { refetch: refetchGetFuncionarioById } = useQuery(
    'get-all-funcionarios-by-id',
    async () => {
      return getAllFuncionariosByID(idFuncionario)
    },
    {
      onSuccess: ({ data }) => {
        if (!!idFuncionario) {
          setValue('id', data.id)
          setValue('name', data.name)
          setValue('customerHasBankId', data.customerHasBankId)
        } else {
          reset(defaultValuesFuncionarios)
        }
      },
      enabled: false,
    }
  )

  const onAddFuncionario = () => {
    createFuncionarios()
  }

  const onEditFuncionario = () => {
    editFuncionario()
  }

  const handleClickCloseModal = () => {
    reset()
    onClose()
  }

  useEffect(() => {
    if (!!idFuncionario) {
      refetchGetFuncionarioById()
    }
  }, [idFuncionario, refetchGetFuncionarioById])

  return (
    <FormProvider {...formMethods}>
      <Modal
        visible={visible}
        onClose={handleClickCloseModal}
        id="modal-funcionarios"
        title={isEdit ? 'Editar Funcionario' : 'Agregar Funcionario'}
        contentOverflowY="auto"
        size="small"
        minHeight="140px"
        footer={
          <Container width="100%" height="75px" display="flex" justifyContent="end" alignItems="center" gap="20px">
            <Button
              width="125px"
              label={isEdit ? 'Editar' : 'Agregar'}
              shape="default"
              trailingIcon="ri-add-fill"
              onClick={isEdit ? onEditFuncionario : onAddFuncionario}
              loading={loadingCreateFuncionarios || loadingEditFuncionario}
              disabled={!isValid}
            />
          </Container>
        }
      >
        <Container
          width="100%"
          height="140px"
          display="flex"
          justify-content="center"
          flexDirection="column"
          align-items="center"
          gap="20px"
        >
          <Container width="100%" display="flex" flexDirection="column" gap="20px" padding="20px" margin="30px 0">
            <FuncionarioInfoForm />
          </Container>
        </Container>
      </Modal>
    </FormProvider>
  )
}

export default FuncionariosModal
