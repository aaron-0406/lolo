import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useLoloContext } from '@/contexts/LoloProvider'

import Modal from '@/ui/Modal'
import Button from '@/ui/Button'
import Container from '@/ui/Container'

import { JudicialRegisterOfficeType } from '@/types/judicial/judicial-register-office.type'
import { JudicialRegisterOfficeResolver } from './RegisterOfficeModal.yup'

import { AxiosError, AxiosResponse } from 'axios'
import { CustomErrorResponse } from 'types/customErrorResponse'
import {
  createJudicialRegisterOffice,
  editJudicialRegisterOffice,
  getJudicialRegisterOfficeById,
} from '@/services/judicial/judicial-register-office.service'

import registerOfficeCache, {
  KEY_JUDICIAL_REGISTER_OFFICE_CACHE,
} from '../../JudicialRegisterOfficeTable/utils/judicial-register-office.cache'
import notification from '@/ui/notification'
import RegisterOfficeModalInfo from './RegisterOfficeModalInfo'

type Props = {
  id?: number
  isOpen: boolean
  onClose: () => void
}

const RegisterOffice = ({ isOpen, onClose, id }: Props) => {
  const queryClient = useQueryClient()
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const chbNumber = parseInt(chb.length ? chb : '0')

  const formMethods = useForm<Omit<JudicialRegisterOfficeType, 'createdAt' | 'updatedAt' | 'deletedAt'>>({
    resolver: JudicialRegisterOfficeResolver,
    mode: 'all',
    defaultValues: {
      id: 0,
      name: '',
      customerHasBankId: 0,
    },
  })

  const {
    setValue,
    getValues,
    reset,
    formState: { isValid },
  } = formMethods

  const {
    actions: { editRegisterOfficeCache, createRegisterOfficeCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = registerOfficeCache(queryClient)

  const { refetch: refetchJudicialRegisterOffice } = useQuery<AxiosResponse<JudicialRegisterOfficeType>>(
    [`${KEY_JUDICIAL_REGISTER_OFFICE_CACHE}-GET-BY-ID`, id],
    async () => {
      return await getJudicialRegisterOfficeById(id ?? 0)
    },
    {
      onSuccess: (data) => {
        setValue('id', data.data.id)
        setValue('name', data.data.name)
        setValue('customerHasBankId', data.data.customerHasBankId)
      },
      onError: (error: any) => {
        notification({
          type: 'error',
          message: error.response?.data.message,
        })
      },
    }
  )

  const { isLoading: isLoadingJudicialRegisterOffice, mutate: onCreateJudcialRegisterOfficeMutate } = useMutation<
    AxiosResponse<JudicialRegisterOfficeType>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { id, ...restClient } = getValues()
      return createJudicialRegisterOffice({ ...restClient, customerHasBankId: chbNumber })
    },
    {
      onSuccess: (data) => {
        createRegisterOfficeCache(data.data)
        notification({ type: 'success', message: 'Oficina registral creada' })
        handleClickCloseModal()
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

  const { isLoading: isLoadingEditJudicialRegisterOffice, mutate: onEditJudicialRegisterOfficeMutate } = useMutation<
    AxiosResponse<JudicialRegisterOfficeType>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const judicialRegisterOffice = getValues()
      const { id, ...restClient } = judicialRegisterOffice
      return editJudicialRegisterOffice(id, { ...restClient, customerHasBankId: chbNumber })
    },
    {
      onSuccess: (data) => {
        editRegisterOfficeCache(data.data)
        notification({ type: 'success', message: 'Oficina registral editada' })
        handleClickCloseModal()
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

  const handleClickCloseModal = () => {
    reset()
    onClose()
  }

  const onCreateJudcialRegisterOffice = () => {
    onCreateJudcialRegisterOfficeMutate()
  }

  const onEditJudicialRegisterOffice = () => {
    onEditJudicialRegisterOfficeMutate()
  }

  useEffect(() => {
    if (!!id) {
      refetchJudicialRegisterOffice()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <FormProvider {...formMethods}>
      <Modal
        id="use-of-property-modal"
        visible={isOpen}
        onClose={onClose}
        title={id ? 'Editar Oficina Registral' : 'Nueva Oficina Registral'}
        contentOverflowY="auto"
        size="small"
        footer={
          <Container display="flex" justifyContent="flex-end" width="100%" gap="4px">
            <Button
              onClick={id ? onEditJudicialRegisterOffice : onCreateJudcialRegisterOffice}
              loading={isLoadingEditJudicialRegisterOffice || isLoadingJudicialRegisterOffice}
              display="default"
              size="default"
              label={id ? 'Editar' : 'Crear'}
              permission={id ? 'P40-02' : 'P40-01'}
              disabled={!isValid || !chbNumber}
            />
          </Container>
        }
      >
        <RegisterOfficeModalInfo />
      </Modal>
    </FormProvider>
  )
}

export default RegisterOffice
