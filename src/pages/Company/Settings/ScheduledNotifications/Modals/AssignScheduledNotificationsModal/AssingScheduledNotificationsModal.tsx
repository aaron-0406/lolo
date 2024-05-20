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
import { changeNotificationsUsers, getNotificationsUsersByScheduleNotificationId } from '@/services/config/scheluded-notifications-users.service';
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

  const convertTimeToISO = (time: string) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const [hours, minutes] = time.split(':');
    const dateTimeString = `${year}-${month}-${day}T${hours}:${minutes}:00.000Z`;
    const dateWithTime = new Date(dateTimeString).toString();
    return dateWithTime;
  }
  const convertISOToTime = (isoString: string): string => {
    const date = new Date(isoString);
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}

  const defaultValues = {
    scheduledNotification: {
      nameNotification: '',
      descriptionNotification: '',
      frequencyToNotify: 0,
      hourTimeToNotify: new Date().toString(),
      customerHasBankId: parseInt(chb) ?? 0,
      logicKey: '',
      state: false,
    },
    scheduledNotificationsUsers: [] as Array<
      Omit<ScheduledNotificationsUsersType, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>
    >,
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

  const { mutate: createNotification } = useMutation<
    AxiosResponse<ScheduledNotificationsType>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const scheduledNotification = getValues('scheduledNotification')
      const formatDate = convertTimeToISO(scheduledNotification.hourTimeToNotify.toString())

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
        hourTimeToNotify: convertTimeToISO(getScheduledNotification?.hourTimeToNotify.toString()),
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

const { mutate: changeNotificationsUsersMt } = useMutation<
  AxiosResponse<ScheduledNotificationsType>,
  AxiosError<CustomErrorResponse>
>(
  async () => {
    const getScheduledNotification = getValues('scheduledNotificationsUsers')
    return await changeNotificationsUsers(scheduledNotification?.id ?? 0, JSON.stringify(getScheduledNotification))
  },
  {
    onSuccess: (result) => {
      updateScheduledNotificationsCache(result.data)
      notification({ type: 'success', message: 'Asignaciones actualizadas' })
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

useEffect(() => {
  if (modalActions === 'edit' && scheduledNotification) {
    setValue('scheduledNotification.id', scheduledNotification.id)
    setValue('scheduledNotification.customerHasBankId', scheduledNotification.customerHasBankId)
    setValue('scheduledNotification.logicKey', scheduledNotification.logicKey)
    setValue('scheduledNotification.nameNotification', scheduledNotification.nameNotification)
    setValue('scheduledNotification.descriptionNotification', scheduledNotification.descriptionNotification)
    setValue('scheduledNotification.frequencyToNotify', scheduledNotification.frequencyToNotify)
    setValue('scheduledNotification.hourTimeToNotify', convertISOToTime(scheduledNotification.hourTimeToNotify))
    setValue('scheduledNotification.state', scheduledNotification.state)
  }
}, [scheduledNotification])
 
  const onCreateNotification = () => {
    createNotification()
    onClose()
  }

  const onEditNotification = () => {
    editNotification()
    changeNotificationsUsersMt()
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
              disabled={!chb} 
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