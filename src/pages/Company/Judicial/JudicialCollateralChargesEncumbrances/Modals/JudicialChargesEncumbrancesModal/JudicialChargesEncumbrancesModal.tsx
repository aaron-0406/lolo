import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useLoloContext } from '@/contexts/LoloProvider'

import Modal from '@/ui/Modal'
import Button from '@/ui/Button'
import Container from '@/ui/Container'

import { JudicialCollateralChargesEncumbrancesType } from "@/types/judicial/judicial-collateral-charges-encumbrances.type"
import { JudicialChargesEncumbrancesResolver } from './JudicialChargesEncumbrancesModal.yup'

import { AxiosError, AxiosResponse } from 'axios'
import { CustomErrorResponse } from 'types/customErrorResponse'
import {
  createJudicialCollateralChargesEncumbrances,
  editJudicialCollateralChargesEncumbrances,
  getJudicialCollateralChargesEncumbrancesById  
} from '@/services/judicial/judicial-collateral-charges-encumbrances.service'

import chargesEncumbrancesCache, { KEY_JUDICIAL_CHARGES_ENCUMBRANCES_CACHE } from "../../JudicialCollateralChargesEncumbrancesTable/utils/judicial-charges-encumbrances.cache";
import notification from '@/ui/notification'
import ChargesEncumbrancesModalInfo from './JudicialChargesEncumbrancesInfo'
import moment from 'moment'
import { useParams } from 'react-router-dom'

type Props = {  
  id?: number
  isOpen: boolean
  onClose: () => void
}

const ChargesEncumbrancesModal = ( { isOpen, onClose, id }: Props ) => {
  const queryClient = useQueryClient() 
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const collateralCode = useParams().collateralCode ?? ''
  const chbNumber = parseInt(chb.length ? chb : '0')

  const formMethods = useForm<Omit<JudicialCollateralChargesEncumbrancesType, 'createdAt' | 'updatedAt' | 'deletedAt'>>({
    resolver: JudicialChargesEncumbrancesResolver,
    mode: 'all',
    defaultValues: {
      id: 0,
      typeOfLoadId: 0,
      amountOfImpactDollars: 0,
      amountOfImpactSoles: 0,
      descriptionOfLoad: "",
      judicialCollateralIdJudicialCollateral: 0,
      registrationDate: moment(new Date()).format('DD-MM-YYYY'),
      range: 0,
      registrationSeat: "",
      appraisalDate:"", 
    },
  })

  const {
    setValue,
    getValues,
    reset,
  } = formMethods

  const { 
    actions: {
      editChargesEncumbrancesCache, createChargesEncumbrancesCache
    }, 
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = chargesEncumbrancesCache(queryClient)
  
  const { refetch: refetchJudicialChargesEncumbrances } = useQuery<AxiosResponse<JudicialCollateralChargesEncumbrancesType>>(
    [`${KEY_JUDICIAL_CHARGES_ENCUMBRANCES_CACHE}-GET-BY-ID`, id],
    async () => {
      return await getJudicialCollateralChargesEncumbrancesById(id ?? 0)
    },
    {
      onSuccess: (data) => {
        setValue('id', data.data.id)
        setValue('typeOfLoadId', data.data.typeOfLoadId)
        setValue('amountOfImpactDollars', data.data.amountOfImpactDollars)
        setValue('amountOfImpactSoles', data.data.amountOfImpactSoles)
        setValue('descriptionOfLoad', data.data.descriptionOfLoad)
        setValue('judicialCollateralIdJudicialCollateral', data.data.judicialCollateralIdJudicialCollateral)
        setValue('registrationDate', moment(data.data.registrationDate.split('T')[0]).format('DD-MM-YYYY'))
        setValue('range', data.data.range)
        setValue('registrationSeat', data.data.registrationSeat)
        setValue("appraisalDate", moment(data.data.appraisalDate.split('T')[0]).format('DD-MM-YYYY'))
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

  const { isLoading: isLoadingJudicialChargesEncumbrances, mutate: onCreateJudcialChargesEncumbrancesMutate } = useMutation<
    AxiosResponse<JudicialCollateralChargesEncumbrancesType>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { id, registrationDate, appraisalDate, ...restClient } = getValues()
      return createJudicialCollateralChargesEncumbrances({
        ...restClient,
        judicialCollateralIdJudicialCollateral: Number(collateralCode),
        registrationDate: moment(registrationDate, 'DD-MM-YYYY').toDate().toISOString(),
        appraisalDate: moment(appraisalDate, 'DD-MM-YYYY').toDate().toISOString(),
      })
    },
    {
      onSuccess: (data) => {
        createChargesEncumbrancesCache(data.data, chbNumber)
        notification({ type: 'success', message: 'Carga y Gravamen creada' })
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

  const { isLoading: isLoadingEditJudicialChargesEncumbrances, mutate: onEditJudicialChargesEncumbrancesMutate } = useMutation<
    AxiosResponse<JudicialCollateralChargesEncumbrancesType>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const judicialChargesEncumbrances = getValues()
      const { id, registrationDate, appraisalDate, ...restClient } = judicialChargesEncumbrances
      return editJudicialCollateralChargesEncumbrances(id, {
        ...restClient,
        registrationDate: moment(registrationDate, 'DD-MM-YYYY').toDate().toISOString(),
        appraisalDate: moment(appraisalDate, 'DD-MM-YYYY').toDate().toISOString(),
      })
    },
    {
      onSuccess: (data) => {
        editChargesEncumbrancesCache(data.data, chbNumber)
        notification({ type: 'success', message: 'Carga y Gravamen editada' })
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

  const onCreateJudcialChargesEncumbrances = () => {
    onCreateJudcialChargesEncumbrancesMutate()
  }

  const onEditJudicialChargesEncumbrances = () => {
    onEditJudicialChargesEncumbrancesMutate()
  }

  useEffect(() => {
    if (id) refetchJudicialChargesEncumbrances()
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <FormProvider {...formMethods}>
      <Modal
        id="use-of-property-modal"
        visible={isOpen}
        onClose={onClose}
        title={id ? 'Editar Carga y Gravamen' : 'Nueva Carga y Gravamen'}
        contentOverflowY="auto"
        size="large"
        minHeight="140px"
        footer={
          <Container display="flex" justifyContent="flex-end" width="100%" gap="4px">
            <Button
              onClick={id ? onEditJudicialChargesEncumbrances : onCreateJudcialChargesEncumbrances}
              loading={isLoadingEditJudicialChargesEncumbrances || isLoadingJudicialChargesEncumbrances}
              display="default"
              size="default"
              label={id ? 'Editar' : 'Crear'}
              permission={id ? 'P13-01-06-01-02-02' : 'P13-01-06-01-02-01'} 
              disabled={!chbNumber}
            />
          </Container>
        }
      >
        <ChargesEncumbrancesModalInfo />
      </Modal>
    </FormProvider>
  ) 
}

export default ChargesEncumbrancesModal