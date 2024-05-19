import { ScheduledNotificationsUsersType } from '@/types/config/scheduled-notifications-users.type';
import { ScheduledNotificationsType } from '@/types/config/scheduled-notifications.type';
import Modal from '@/ui/Modal';
import { FormProvider, useForm } from 'react-hook-form';
import { ModalScheduleNotificationsResolver } from './AssignScheduledNotificationsModal.yup';
import Button from '@/ui/Button';
import Container from '@/ui/Container';
import ScheduledNotificationsInfoModal from './ScheduledNotificationsInfoModal';
import { notification } from '@/ui/notification/notification'
import { useMutation } from 'react-query'
import { AxiosResponse, AxiosError } from 'axios'
import { CustomErrorResponse } from 'types/customErrorResponse'

import { createScheduledNotification, updateScheduledNotification } from '@/services/config/scheduled-notifications.service'
import { useLoloContext } from '@/contexts/LoloProvider';
import { useQueryClient } from 'react-query';
import scheduledNotificationsCache from '../../ScheduledNotificationsTable/utils/scheduled-notifications.cache';
import { useEffect } from 'react';



interface AssingScheduledNotificationsModalProps {
  visible: boolean
  onClose: () => void
  modalActions: "edit" | "add"
  scheduledNotification?: ScheduledNotificationsType
}

const AssingScheduledNotificationsModal = ({visible, onClose, modalActions, scheduledNotification}: AssingScheduledNotificationsModalProps) => {
  const {
    bank: { selectedBank: { idCHB: chb } },
  } = useLoloContext()

  const convertTimeToDate = (timeString: string): Date => {
    const currentDate = new Date()
    const [hours, minutes] = timeString.split(':').map(Number)
    currentDate.setHours(hours, minutes, 0, 0)
    return currentDate
  }

  const defaultValues = {
    scheduledNotification: {
      nameNotification: '',
      descriptionNotification: '',
      frequencyToNotify: 0,
      hourTimeToNotify: new Date(),
      customerHasBankId: parseInt(chb) ?? 0,
      logicKey: '',
      state: false,
    },
    scheduledNotificationsUsers: [] as Array<ScheduledNotificationsUsersType>,
  }
  const formMethods = useForm<{
    scheduledNotification: ScheduledNotificationsType
    scheduledNotificationsUsers: Array<ScheduledNotificationsUsersType>
  }>({
    resolver: ModalScheduleNotificationsResolver,
    mode: 'all',
    defaultValues: defaultValues,
  })

  const queryClient = useQueryClient(); 

  const {
    actions:{
      createScheduledNotificationsCache,
      updateScheduledNotificationsCache,
    }
  } = scheduledNotificationsCache(queryClient)

  const { getValues, setValue } = formMethods

  useEffect(()=>{
    console.log(scheduledNotification)
    if (modalActions === 'edit' && scheduledNotification) {
      setValue('scheduledNotification.customerHasBankId', scheduledNotification.customerHasBankId)
      setValue('scheduledNotification.logicKey', scheduledNotification.logicKey)
      setValue('scheduledNotification.nameNotification', scheduledNotification.nameNotification)
      setValue('scheduledNotification.descriptionNotification', scheduledNotification.descriptionNotification)
      setValue('scheduledNotification.frequencyToNotify', scheduledNotification.frequencyToNotify)
      setValue('scheduledNotification.hourTimeToNotify', scheduledNotification.hourTimeToNotify)
      setValue('scheduledNotification.state', scheduledNotification.state)
    }
  },[scheduledNotification])


  const { mutate: createNotification } = useMutation<
    AxiosResponse<ScheduledNotificationsType>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const scheduledNotification = getValues('scheduledNotification')
      const formatDate = convertTimeToDate(scheduledNotification.hourTimeToNotify.toString())

      return await createScheduledNotification({
        ...scheduledNotification,
        hourTimeToNotify: formatDate,
      })
    },
    {
      onSuccess: (result) => {
        createScheduledNotificationsCache(result.data)
        notification({ type: 'success', message: 'Nueva notificación creada' })
      },
      onError: (error, _, context: any) => {
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data.errors?.map((error) => error.message),
        })
      },
    }
  )

  const { mutate: editNotification } = useMutation< 
  AxiosResponse<ScheduledNotificationsType>,
  AxiosError<CustomErrorResponse>
>(
  async () => {
      const getScheduledNotification = getValues('scheduledNotification')
      return await updateScheduledNotification(scheduledNotification?.id ?? 0, {
        descriptionNotification: getScheduledNotification?.descriptionNotification ?? '',
        frequencyToNotify: getScheduledNotification?.frequencyToNotify ?? 0,
        hourTimeToNotify: convertTimeToDate(getScheduledNotification?.hourTimeToNotify.toString()),
        logicKey: getScheduledNotification?.logicKey ?? '',
        nameNotification: getScheduledNotification?.nameNotification ?? '',
        state: getScheduledNotification?.state ?? false,
      })
  },
  {
    onSuccess: (result) => {
      updateScheduledNotificationsCache(result.data)
      notification({ type: 'success', message: 'Notificación actualizada' })
    },
    onError: (error, _, context: any) => {
      notification({
        type: 'error',
        message: error.response?.data.message,
        list: error.response?.data.errors?.map((error) => error.message),
      })
    },
  }
)

  const onCreateNotification = () => {
    createNotification()
    onClose()
  }

  const onEditNotification = () => {
    editNotification()
    onClose()
  }

  return (
    <FormProvider {...formMethods}>
      <Modal
        visible={visible}
        onClose={onClose}
        size={modalActions === 'add' ? 'medium' : 'large'}
        title={modalActions === 'add' ? 'Agregar notificación' : 'Asignar notificaciones'}
        id="modal-assigned-scheduled-notifications"
        footer={
          <Container width="100%" display="flex" justifyContent="end">
            <Button
              onClick={modalActions === 'add' ? onCreateNotification : onEditNotification}
              label="Guardar"
              trailingIcon="ri-save-line"
              messageTooltip="Guardar cambios"
            />
          </Container>
        }
      >
        <ScheduledNotificationsInfoModal modalActions={modalActions} onClose={onClose} />
      </Modal>
    </FormProvider>
  )
}

export default AssingScheduledNotificationsModal