import { device } from "@/breakpoints/responsive"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import Button from "@/ui/Button"
import Container from "@/ui/Container"
import Modal from "@/ui/Modal"
import TariffModalInfoForm from "./TariffModalInfoForm"
import { TariffType } from "@/types/config/tariff.type"
import { useEffect } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { TariffModalYupResolver } from "./TariffModal.yup"
import { useLoloContext } from "@/contexts/LoloProvider"
import { useMutation, useQueryClient } from "react-query"
import { AxiosError, AxiosResponse } from "axios"
import { createTariff, editTariff } from "@/services/config/tariff.service"
import { CustomErrorResponse } from "types/customErrorResponse"
import notification from "@/ui/notification"
import tariffCache from "../../utils/tariff.cache"
import { TariffModalType } from "../../Tariff"

type TariffModalProps = {
  visible: boolean
  onClose: () => void
  tariff?: TariffType
  type?: string
}

const TariffModal = ( { visible, onClose, tariff, type } : TariffModalProps) => {
  const greaterThanTabletL = useMediaQuery(device.tabletL)
  const queryClient = useQueryClient()

  const { actions: { createTariffCache, editTariffCache } } = tariffCache(queryClient)
  
  const { bank: { selectedBank: { idCHB: chb }} } = useLoloContext()
  const defaultValues: Omit<TariffType, 'tariffIntervalMatch'> = {
    id: 0, 
    code: '',
    description: '',
    type: '',
    value: 0,
    customerHasBankId: Number(chb),
  } 

  const formMethods = useForm<Omit<TariffType, 'tariffIntervalMatch'>>({
    resolver: TariffModalYupResolver,
    defaultValues,
    mode:"all",  
  })
  
  const { isLoading: loadingCreateTariff, mutate: createTariffMutate } = useMutation<
    AxiosResponse<any>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { id, ...data } = formMethods.getValues()
      return await createTariff(data)
    },
    {
      onSuccess: (result) => {
        try {          
          if (type === TariffModalType.customTariff) createTariffCache(result.data, Number(chb), 'customTariff')
          onClose()
        } catch (error) {
          console.log(error)
        }
      },
      onError: (error) => {
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )

  const { isLoading: loadingEditJudicialBinnacle, mutate: editTariffMuate } = useMutation<
    AxiosResponse<any>,
    AxiosError<CustomErrorResponse>
  >
  (
    async () => {
      const { id, ...data } = formMethods.getValues()
      return await editTariff(id, data)
    },
    {
      onSuccess: (result) => {
        if (type === TariffModalType.customTariff) editTariffCache(result.data, Number(chb), 'customTariff')
        onClose()
      },
      onError: (error) => {
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )

  useEffect(()=>{
    if(tariff){
      formMethods.setValue("id", tariff.id)
      formMethods.setValue("code", tariff.code)
      formMethods.setValue('description', tariff.description)
      formMethods.setValue("type", tariff.type)
      formMethods.setValue('value', tariff.tariffIntervalMatch[0].value)
    }
    if(!tariff && type){
      formMethods.setValue('type', type)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[tariff, type])

  const handleCreateTariff = () => {
    createTariffMutate()
  }

  const handleEditTariff = () => {
    editTariffMuate()
  }

  return (
    <FormProvider {...formMethods}>
      <Modal
        id="tariff-modal"
        withPortal={true}
        title={tariff ? 'Editar tarifa' : 'Crear Tarifa'}
        visible={visible}
        onClose={onClose}
        clickOutsideToClose={onClose}
        size="medium"
        contentOverflowY="auto"
        minHeight="140px"
        footer={
          <Container
            display="flex"
            flexDirection="row"
            width="100%"
            justifyContent={greaterThanTabletL ? 'space-between' : 'end'}
            alignItems="center"
            gap="20px"
          >
            <Container></Container>
            <Button
              label={tariff ? 'Editar' : 'Agregar'}
              trailingIcon="ri-save-3-line"
              onClick={tariff ? handleEditTariff : handleCreateTariff}
              loading={loadingCreateTariff || loadingEditJudicialBinnacle}
              disabled={!chb}
              width="fit-content"
            />
          </Container>
        }
      >
        <TariffModalInfoForm />
      </Modal>
    </FormProvider>
  )
}

export default TariffModal