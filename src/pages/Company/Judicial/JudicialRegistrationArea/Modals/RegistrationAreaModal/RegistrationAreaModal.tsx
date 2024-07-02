import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useLoloContext } from '@/contexts/LoloProvider'

import Modal from '@/ui/Modal'
import Button from '@/ui/Button'
import Container from '@/ui/Container'

import { JudicialRegistrationAreaType } from '@/types/judicial/judicial-registration-area.type'
import { JudicialRegistrationAreaResolver } from './RegistrationAreaModal.yup'

import RegistrationAreaModalInfo from './RegistrationAreaModalInfo'
import { AxiosError, AxiosResponse } from 'axios'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { createJudicialRegistrationArea, editJudicialRegistrationArea, getJudicialRegistrationAreaById } from '@/services/judicial/judicial-registration-area.service'

import judicialRegistrationAreaCache, { KEY_JUDICIAL_REGISTRATION_AREA_CACHE } from '../../JudicialRegistrationAreaTable/utils/judicial-registration-area.cache'
import notification from '@/ui/notification'

type Props = {  
  id?: number
  isOpen: boolean
  onClose: () => void
}

const RegistrationAreaModal = ( { isOpen, onClose, id }: Props ) => {
  const queryClient = useQueryClient() 
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const chbNumber = parseInt(chb.length ? chb : '0')

  const formMethods = useForm<Omit<JudicialRegistrationAreaType, 'createdAt' | 'updatedAt' | 'deletedAt'>>({
    resolver: JudicialRegistrationAreaResolver,
    mode: 'all',
    defaultValues: {
      id: 0,
      name: "",
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
    actions: {
      createRegistrationAreaCache, editRegistrationAreaCache
    }, 
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = judicialRegistrationAreaCache(queryClient)
  
  const { refetch: refetchJudicialRegistrationArea } = useQuery<AxiosResponse<JudicialRegistrationAreaType>>(
    [`${KEY_JUDICIAL_REGISTRATION_AREA_CACHE}-GET-BY-ID`, id],
    async () => {
      return await getJudicialRegistrationAreaById(id ?? 0)
    },
    {
      onSuccess: (data) => {
        setValue('id', data.data.id)
        setValue('name', data.data.name)
        setValue('customerHasBankId', data.data.customerHasBankId)
      },
      enabled: false,
      onError: (error:any) => {
        notification({
          type: 'error',
          message: error.response?.data.message,
        })
      },
    }
  )

  const { isLoading: isLoadingJudicialRegistrationArea, mutate: onCreateJudcialRegistrationAreaMutate } = useMutation<
    AxiosResponse<JudicialRegistrationAreaType>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const {id, ...restClient} = getValues()
      return createJudicialRegistrationArea({...restClient, customerHasBankId: chbNumber})
    },
    {
      onSuccess: (data) => {
        createRegistrationAreaCache(data.data)
        notification({ type: 'success', message: 'Zona registral creada' })
        handleClickCloseModal()
      },
      onMutate: () => {
        return onMutateCache(chbNumber)
      },
      onSettled:() => {
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

  const { isLoading: isLoadingEditJudicialRegistrationArea, mutate: onEditJudicialRegistrationAreaMutate } = useMutation<
    AxiosResponse<JudicialRegistrationAreaType>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const judicialRegistrationArea = getValues()
      const { id, ...restClient } = judicialRegistrationArea
      return editJudicialRegistrationArea(id, { ...restClient, customerHasBankId: chbNumber }) 
    },
    {
      onSuccess: (data) => {
        editRegistrationAreaCache(data.data)
        notification({ type: 'success', message: 'Zona registral editada' })
        handleClickCloseModal()
      },
      onMutate: () => {
        return onMutateCache(chbNumber)
      },
      onSettled:() => {
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

  const onCreateJudcialRegistrationArea = () => {
    onCreateJudcialRegistrationAreaMutate()
  }

  const onEditJudicialRegistrationArea = () => {
    onEditJudicialRegistrationAreaMutate()
  }

  useEffect(() => {
    if (id) refetchJudicialRegistrationArea()
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <FormProvider {...formMethods}>
      <Modal
        id="use-of-property-modal"
        visible={isOpen}
        onClose={onClose}
        title={id ? 'Editar Zona Registral' : 'Nueva Zona Registral'}
        contentOverflowY="auto"
        size="small"
        footer={
          <Container display="flex" justifyContent="flex-end" width="100%" gap="4px">
            <Button
              onClick={id ? onEditJudicialRegistrationArea : onCreateJudcialRegistrationArea}
              loading={isLoadingEditJudicialRegistrationArea || isLoadingJudicialRegistrationArea}
              display="default"
              size="default"
              label={id ? 'Editar' : 'Crear'}
              permission={id ? 'P39-02' : 'P39-01'} 
              disabled={!isValid || !chbNumber}
            />
          </Container>
        }
      >
        <RegistrationAreaModalInfo />
      </Modal>
    </FormProvider>
  ) 
}

export default RegistrationAreaModal