import { ScheduledNotificationsType } from '@/types/config/scheduled-notifications.type';
import { AxiosResponse } from 'axios'
import { QueryClient } from 'react-query'
export const KEYS_CHUDULED_NOTIFICATIONS_CACHE = 'key-schuduled-notifications-cache'

type QueryDataType = AxiosResponse<ScheduledNotificationsType[]> | undefined

const scheduledNotificationsCache = (queryClient: QueryClient) => {
  const createScheduledNotificationsCache = (data: ScheduledNotificationsType) => {
    queryClient.setQueryData<QueryDataType>(KEYS_CHUDULED_NOTIFICATIONS_CACHE, (old) => {
      if (old) {
        return { ...old, data: [...old.data, data] }
      }
    })
  }

  const updateScheduledNotificationsCache = (data: ScheduledNotificationsType) => {
    queryClient.setQueryData<QueryDataType>(KEYS_CHUDULED_NOTIFICATIONS_CACHE, (old) => {
      if (old) {
        const dataUpdated = old.data.map((user: ScheduledNotificationsType) => {
          if (user.id === data.id) {
            return data
          }

          return user
        })

        return { ...old, data: dataUpdated }
      }
    })
  }

  const deleteScheduledNotificationsCache = (idNotification: number) => {
    queryClient.setQueryData<QueryDataType>(KEYS_CHUDULED_NOTIFICATIONS_CACHE, (old) => {
      if (old) {
        const dataUpdated = old.data.filter((user: ScheduledNotificationsType) => user.id !== idNotification)
        return { ...old, data: dataUpdated }
      }
    })
  }

  const onRefetchQueryCache = async () => {
    await queryClient.refetchQueries(KEYS_CHUDULED_NOTIFICATIONS_CACHE)
  }

  const onMutateCache = async () => {
    const old = queryClient.getQueryData(KEYS_CHUDULED_NOTIFICATIONS_CACHE)
    if (!old) {
      await queryClient.prefetchQuery(KEYS_CHUDULED_NOTIFICATIONS_CACHE)
    }

    return { old }
  }

  const onSettledCache = () => {
    queryClient.cancelQueries(KEYS_CHUDULED_NOTIFICATIONS_CACHE)
  }

  const onErrorCache = (context: { old: QueryDataType }) => {
    queryClient.setQueryData(KEYS_CHUDULED_NOTIFICATIONS_CACHE, context.old)
  }

  return {
    actions: {
      createScheduledNotificationsCache,
      updateScheduledNotificationsCache,
      deleteScheduledNotificationsCache,
    },
    onRefetchQueryCache,
    onMutateCache,
    onSettledCache,
    onErrorCache,
  }
}

export default scheduledNotificationsCache
