import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useLoloContext } from '@/contexts/LoloProvider'

import Modal from '@/ui/Modal'
import Button from '@/ui/Button'
import Container from '@/ui/Container'

import { JudicialNotaryType } from '@/types/judicial/judicial-notary.type'
import { JudicialNotaryResolver } from './NotaryModal.yup'

import { AxiosError, AxiosResponse } from 'axios'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { createJudicialNotary, editJudicialNotary, getJudicialNotaryById } from '@/services/judicial/judicial-notary.service'

import notaryCache, { KEY_JUDICIAL_NOTARY_CACHE } from '../../JudicialNotaryTable/utils/judicial-notary.cache'
import notification from '@/ui/notification'
import NotaryModalInfo from './NotaryModalInfo'

type Props = {  
  id?: number
  isOpen: boolean
  onClose: () => void
}

const Notary = ( { isOpen, onClose, id }: Props ) => {
  const queryClient = useQueryClient() 
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const chbNumber = parseInt(chb.length ? chb : '0')

  const formMethods = useForm<Omit<JudicialNotaryType, 'createdAt' | 'updatedAt' | 'deletedAt'>>({
    resolver: JudicialNotaryResolver,
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
      editNotaryCache, createNotaryCache
    }, 
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = notaryCache(queryClient)
  
  const { refetch: refetchJudicialNotary } = useQuery<AxiosResponse<JudicialNotaryType>>(
    [`${KEY_JUDICIAL_NOTARY_CACHE}-GET-BY-ID`, chb],
    async () => {
      return await getJudicialNotaryById(id ?? 0)
    },
    {
      onSuccess: (data) => {
        setValue('id', data.data.id)
        setValue('name', data.data.name)
        setValue('customerHasBankId', data.data.customerHasBankId)
      },
      enabled: false,
    }
  )

  const { isLoading: isLoadingJudicialNotary, mutate: onCreateJudcialNotaryMutate } = useMutation<
    AxiosResponse<JudicialNotaryType>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const {id, ...restClient} = getValues()
      return createJudicialNotary({...restClient, customerHasBankId: chbNumber})
    },
    {
      onSuccess: (data) => {
        createNotaryCache(data.data)
        notification({ type: 'success', message: 'Notaria creada' })
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

  const { isLoading: isLoadingEditJudicialNotary, mutate: onEditJudicialNotaryMutate } = useMutation<
    AxiosResponse<JudicialNotaryType>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const judicialNotary = getValues()
      const { id, ...restClient } = judicialNotary
      return editJudicialNotary(id, { ...restClient, customerHasBankId: chbNumber }) 
    },
    {
      onSuccess: (data) => {
        editNotaryCache(data.data)
        notification({ type: 'success', message: 'Notaria editada' })
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

  const onCreateJudcialNotary = () => {
    onCreateJudcialNotaryMutate()
  }

  const onEditJudicialNotary = () => {
    onEditJudicialNotaryMutate()
  }

  useEffect(() => {
    if (id) refetchJudicialNotary()
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <FormProvider {...formMethods}>
      <Modal
        id="use-of-property-modal"
        visible={isOpen}
        onClose={onClose}
        title={id ? 'Editar Notaria' : 'Nueva Notaria'}
        contentOverflowY="auto"
        size="small"
        footer={
          <Container display="flex" justifyContent="flex-end" width="100%" gap="4px">
            <Button
              onClick={id ? onEditJudicialNotary : onCreateJudcialNotary}
              loading={isLoadingEditJudicialNotary || isLoadingJudicialNotary}
              display="default"
              size="default"
              label={id ? 'Editar' : 'Crear'}
              permission={id ? 'P41-02' : 'P41-01'} 
              disabled={!isValid || !chbNumber}
            />
          </Container>
        }
      >
        <NotaryModalInfo />
      </Modal>
    </FormProvider>
  ) 
}

export default Notary