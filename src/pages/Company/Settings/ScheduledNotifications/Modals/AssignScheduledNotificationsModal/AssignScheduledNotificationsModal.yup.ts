import { yupResolver } from '@hookform/resolvers/yup'
import yup from '../../../../../../shared/yupLocale'
import { ScheduledNotificationsType } from '@/types/config/scheduled-notifications.type'
import { ScheduledNotificationsUsersType } from '@/types/config/scheduled-notifications-users.type'

export type ModalScheduleNotificationsType = {
  scheduledNotification: Omit<ScheduledNotificationsType,  'createdAt' | 'deletedAt' | 'updatedAt'>
  scheduledNotificationsUsers: Array<Omit<ScheduledNotificationsUsersType, 'createdAt' | 'deletedAt' | 'updatedAt'>>
}

const ModalScheduleNotificationsSchema: yup.SchemaOf<ModalScheduleNotificationsType> = yup.object({
  scheduledNotification: yup.object().shape({
    id: yup.number().required(),
    nameNotification: yup.string().required(),
    descriptionNotification: yup.string().required(),
    frequencyToNotify: yup.number().required(),
    hourTimeToNotify: yup.date().required(),
    customerHasBankId: yup.number().required(),
    logicKey: yup.string().required(),
    state: yup.boolean().required(),
  }),
  scheduledNotificationsUsers: yup.array().of(yup.object().shape({
    id: yup.number().required(),
    customerUserId: yup.number().required(),
    scheduledNotificationId: yup.number().required(),
    customerHasBankId: yup.number().required(),
  }))
})

export const ModalScheduleNotificationsResolver = yupResolver(ModalScheduleNotificationsSchema)