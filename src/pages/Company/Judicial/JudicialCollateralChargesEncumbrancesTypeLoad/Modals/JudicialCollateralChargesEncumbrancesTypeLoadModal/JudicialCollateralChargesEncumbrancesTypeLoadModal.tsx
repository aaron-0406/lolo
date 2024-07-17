import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useLoloContext } from '@/contexts/LoloProvider'

import Modal from '@/ui/Modal'
import Button from '@/ui/Button'
import Container from '@/ui/Container'

import { JudicialCollateralChargesEncumbrancesTypeLoadType } from '@/types/judicial/judicial-collateral-charges-encumbrances-type-load.type'
import { JudicialCollateralChargesEncumbrancesTypeLoadResolver } from './JudicialCollateralChargesEncumbrancesTypeLoadModal.yup'

import { AxiosError, AxiosResponse } from 'axios'
import { CustomErrorResponse } from 'types/customErrorResponse'
import {
  createJudicialCollateralChargesEncumbrancesTypeLoad,
  editJudicialCollateralChargesEncumbrancesTypeLoad,
  getJudicialCollateralChargesEncumbrancesTypeLoadById
} from '@/services/judicial/judicial-collateral-charges-encumbrances-type-load.service'

import  judicialCollateralChargesEncumbrancesTypeLoadCache, { KEY_JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TYPE_LOAD_CACHE } from '../../JudicialCollateralChargesEncumbrancesTypeLoadTable/utils/judicial-collateral-charges-encumbrances-type-load.cache'
import notification from '@/ui/notification'
import JudicialCollateralChargesEncumbrancesTypeLoadModalInfo from './JudicialCollateralChargesEncumbrancesTypeLoadInfo'

type Props = {  
  id?: number
  isOpen: boolean
  onClose: () => void
}

const JudicialCollateralChargesEncumbrancesTypeLoadModal  = ( { isOpen, onClose, id }: Props ) => {
  const queryClient = useQueryClient() 
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const chbNumber = parseInt(chb.length ? chb : '0')

  const formMethods = useForm<Omit<JudicialCollateralChargesEncumbrancesTypeLoadType, 'createdAt' | 'updatedAt' | 'deletedAt'>>({
    resolver: JudicialCollateralChargesEncumbrancesTypeLoadResolver,
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
      editChargesEncumbrancesTypeLoadCache, createChargesEncumbrancesTypeLoadCache
    }, 
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = judicialCollateralChargesEncumbrancesTypeLoadCache(queryClient)
  
  const { refetch: refetchJudicialChargesEncumbrancesTypeLoad } = useQuery<AxiosResponse<JudicialCollateralChargesEncumbrancesTypeLoadType>>(
    [`${KEY_JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TYPE_LOAD_CACHE}-GET-BY-ID`, id],
    async () => {
      return await getJudicialCollateralChargesEncumbrancesTypeLoadById(id ?? 0)
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

  const { isLoading: isLoadingCreateJudicialChargesEncumbrancesTypeLoad, mutate: onCreateJudcialCollateralChargesEncumbrancesTypeLoadMutate } = useMutation<
    AxiosResponse<JudicialCollateralChargesEncumbrancesTypeLoadType>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const {id, ...restClient} = getValues()
      return createJudicialCollateralChargesEncumbrancesTypeLoad({...restClient, customerHasBankId: chbNumber})
    },
    {
      onSuccess: (data) => {
        createChargesEncumbrancesTypeLoadCache(data.data)
        notification({ type: 'success', message: 'Tipo de carga y gravámenes creada' })
        handleClickCloseModal()
        reset()
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

  const { isLoading: isLoadingEditJudicialChargesEncumbrancesTypeLoad, mutate: onEditJudicialChargesEncumbrancesTypeLoadMutate } = useMutation<
    AxiosResponse<JudicialCollateralChargesEncumbrancesTypeLoadType>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const onEditJudicialChargesEncumbrancesTypeLoad = getValues()
      const { id, ...restClient } = onEditJudicialChargesEncumbrancesTypeLoad
      return editJudicialCollateralChargesEncumbrancesTypeLoad(id, { ...restClient, customerHasBankId: chbNumber }) 
    },
    {
      onSuccess: (data) => {
        editChargesEncumbrancesTypeLoadCache(data.data)
        notification({ type: 'success', message: 'Tipo de carga y gravámenes editada' })
        handleClickCloseModal()
        reset()
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

  const onCreateJudcialCollateralChargesEncumbrancesTypeLoad = () => {
    onCreateJudcialCollateralChargesEncumbrancesTypeLoadMutate()
  }

  const onEditJudicialChargesEncumbrancesTypeLoad = () => {
    onEditJudicialChargesEncumbrancesTypeLoadMutate()
  }

  useEffect(() => {
    if (id) refetchJudicialChargesEncumbrancesTypeLoad()
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])



  return (
    <FormProvider {...formMethods}>
      <Modal
        id="use-of-property-modal"
        visible={isOpen}
        onClose={handleClickCloseModal}
        title={id ? 'Editar Tipo de carga y gravámenes' : 'Nueva Tipo de carga y gravámenes'}
        contentOverflowY="auto"
        size="small"
        footer={
          <Container display="flex" justifyContent="flex-end" width="100%" gap="4px">
            <Button
              onClick={id ? onEditJudicialChargesEncumbrancesTypeLoad : onCreateJudcialCollateralChargesEncumbrancesTypeLoad}
              loading={isLoadingEditJudicialChargesEncumbrancesTypeLoad || isLoadingCreateJudicialChargesEncumbrancesTypeLoad}
              display="default"
              size="default"
              label={id ? 'Editar' : 'Crear'}
              permission={id ? 'P42-02' : 'P42-01'} 
              disabled={!isValid || !chbNumber}
            />
          </Container>
        }
      >
        <JudicialCollateralChargesEncumbrancesTypeLoadModalInfo />
      </Modal>
    </FormProvider>
  ) 
}

export default JudicialCollateralChargesEncumbrancesTypeLoadModal