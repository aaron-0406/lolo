import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useLoloContext } from '@/contexts/LoloProvider'

import Modal from '@/ui/Modal'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import notification from '@/ui/notification'

import { JudicialUseOfPropertyType } from '@/types/judicial/judicial-use-of-property.type'
import { JudicialUseOfPropertyResolver } from './UseOfPropertyModal.yup'

import UseOfPropertyModalInfo from './UseOfPropertyModalInfo'
import { AxiosError, AxiosResponse } from 'axios'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { createJudicialUseOfProperty, editJudicialUseOfProperty, getJudicialUseOfPropertyById } from '@/services/judicial/judicial-use-of-property.service'

import judicialUseOfPropertyCache, { KEY_JUDICIAL_USE_OF_PROPERTY_CACHE } from '../../JudicialUseOfPropertyTable/utils/judicial-use-of-property.cache'

type Props = {  
  id?: number
  isOpen: boolean
  onClose: () => void
}

const UseOfPropertyModal = ( { isOpen, onClose, id }: Props ) => {
  const queryClient = useQueryClient() 
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const chbNumber = parseInt(chb.length ? chb : '0')

  const formMethods = useForm<Omit<JudicialUseOfPropertyType, 'createdAt' | 'updatedAt' | 'deletedAt'>>({
    resolver: JudicialUseOfPropertyResolver,
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
      createUseOfPropertyCache, editUseOfPropertyCache
    }, 
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = judicialUseOfPropertyCache(queryClient)
  
  const { refetch: refetchJudicialUseOfProperty } = useQuery<AxiosResponse<JudicialUseOfPropertyType>>(
    [`${KEY_JUDICIAL_USE_OF_PROPERTY_CACHE}-GET-BY-ID`, id],
    async () => {
      return await getJudicialUseOfPropertyById(id ?? 0)
    },
    {
      enabled: false,
      onSuccess: (data) => {
        setValue('id', data.data.id)
        setValue('name', data.data.name)
        setValue('customerHasBankId', data.data.customerHasBankId)
      },
      onError: (error:any) => {
        notification({
          type: 'error',
          message: error.response?.data.message,
        })
      },
    }
  )

  const { isLoading: isLoadingJudicialUseOfProperty, mutate: onCreateJudcialUseOfPropertyMutate } = useMutation<
    AxiosResponse<JudicialUseOfPropertyType>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const {id, ...restClient} = getValues()
      return createJudicialUseOfProperty({...restClient, customerHasBankId: chbNumber})
    },
    {
      onSuccess: (data) => {
        createUseOfPropertyCache(data.data)
        notification({ type: 'success', message: 'Uso de propiedad creado' })
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

  const { isLoading: isLoadingEditJudicialUseOfProperty, mutate: onEditJudicialUseOfPropertyMutate } = useMutation<
    AxiosResponse<JudicialUseOfPropertyType>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const judicialUseOfProperty = getValues()
      const { id, ...restClient } = judicialUseOfProperty
      return editJudicialUseOfProperty(id, { ...restClient, customerHasBankId: chbNumber }) 
    },
    {
      onSuccess: (data) => {
        editUseOfPropertyCache(data.data)
        notification({ type: 'success', message: 'Uso de propiedad editado' })
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

  const onCreateJudcialUseOfProperty = () => {
    onCreateJudcialUseOfPropertyMutate()
  }

  const onEditJudicialUseOfProperty = () => {
    onEditJudicialUseOfPropertyMutate()
  }

  useEffect(() => {
    if (id) refetchJudicialUseOfProperty()
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <FormProvider {...formMethods}>
      <Modal
        id="use-of-property-modal"
        visible={isOpen}
        onClose={onClose}
        title={id ? 'Editar uso del bien' : 'Nuevo uso del bien'}
        contentOverflowY="auto"
        size="small"
        footer={
          <Container display="flex" justifyContent="flex-end" width="100%" gap="4px">
            <Button
              onClick={id ? onEditJudicialUseOfProperty : onCreateJudcialUseOfProperty}
              loading={isLoadingEditJudicialUseOfProperty || isLoadingJudicialUseOfProperty}
              display="default"
              size="default"
              label={id ? 'Editar' : 'Crear'}
              permission={id ? 'P38-02' : 'P38-01'}
              disabled={!isValid || !chbNumber}
            />
          </Container>
        }
      >
        <UseOfPropertyModalInfo />
      </Modal>
    </FormProvider>
  ) 
}

export default UseOfPropertyModal