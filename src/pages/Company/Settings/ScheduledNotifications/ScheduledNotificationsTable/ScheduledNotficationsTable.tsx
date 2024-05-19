import useModal from '@/hooks/useModal'
import notification from '@/ui/notification'
import { AxiosError, AxiosResponse } from 'axios'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { KEYS_CHUDULED_NOTIFICATIONS_CACHE } from './utils/scheduled-notifications.cache'
import Container from '@/ui/Container'
import Table from '@/ui/Table'
import EmptyStateCell from '@/ui/Table/EmptyStateCell'
import BodyCell from '@/ui/Table/BodyCell'
import Text from '@/ui/Text'
import Button from '@/ui/Button'
import { demandedProductsColumns } from './utils/columns'
import EmptyState from '@/ui/EmptyState'
import { ScheduledNotificationsType } from '../../../../../shared/types/config/scheduled-notifications.type';
import { getAllScheduledNotification } from '@/services/config/scheduled-notifications.service'
import AssingScheduledNotificationsModal from '../Modals/AssignScheduledNotificationsModal/AssingScheduledNotificationsModal'

import { useMutation } from 'react-query'
import { useQueryClient } from 'react-query'

import { deleteScheduledNotification } from '@/services/config/scheduled-notifications.service'
import scheduledNotificationsCache from './utils/scheduled-notifications.cache'
import DeleteScheduledNotificationsModal from '../Modals/DeleteScheduledNotificationsModal/DeleteScheduledNotificationsModal'

type ScheduleNotificationsTableProps = {
  caseFileId: number
}

const ScheduleNotificationsTable = ({ caseFileId }: ScheduleNotificationsTableProps) => {
  const [ idNotification, setIdNotification ] = useState<number>(0)
  const [ scheduledNotification, setScheduledNotification ] = useState<ScheduledNotificationsType | undefined>(undefined)
  const queryClient = useQueryClient()
  const { hideModal:HideEditModal, showModal:showEditModal, visible:visibleEditModal } = useModal()  
  const { hideModal:HideDeleteModal, showModal:showDeleteModal, visible:visibleDeleteModal } = useModal() 
  const {
    actions:{
      deleteScheduledNotificationsCache,
    }
  } = scheduledNotificationsCache(queryClient)

  const { data:Notifications, isLoading:LoadingNotifications } = useQuery<
    AxiosResponse<Array<ScheduledNotificationsType>>,
    AxiosError<CustomErrorResponse>
  >(
    [KEYS_CHUDULED_NOTIFICATIONS_CACHE],
    async () => {
      return await getAllScheduledNotification()
    },
    {
      onError: (error) => {
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )

  const { mutate: deleteNotification } = useMutation< 
  AxiosResponse<{id: string}>,
  AxiosError<CustomErrorResponse>
>(
  async () => {
    const id = idNotification ?? 0
    return await deleteScheduledNotification( id )
  },
  {
    onSuccess: (result) => {
      deleteScheduledNotificationsCache(parseInt(result.data.id))
      notification({ type: 'success', message: 'Notificación eliminada' })
      setIdNotification(0)
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

  const onDeleteNotification = () => {
    deleteNotification()
    HideDeleteModal()
  }

  const openDeleteModal = (idNotification: number) => {
    setIdNotification(idNotification)
    showDeleteModal()
  }

  const onHideDeleteModal = () => {
    setIdNotification(0)
    HideDeleteModal()
  }

  const onOpenEditNotificationModal = ( notification: ScheduledNotificationsType ) => { 
    setScheduledNotification(notification)
    showEditModal()
  }

  const onHideEditNotificationModal = () => {
    setScheduledNotification(undefined)
    HideEditModal()
  }

  

  const scheduleNotificitions = Notifications?.data ?? []

  return (
    <Container width="100%" height="calc(100% - 80px)" padding="20px">
      <Table
        top="195px"
        columns={demandedProductsColumns}
        loading={LoadingNotifications}
        isArrayEmpty={!scheduleNotificitions?.length}
        emptyState={
          <EmptyStateCell colSpan={demandedProductsColumns.length}>
            <EmptyState
              title="No hay recursos disponibles"
              description="No se encontraron productos demandados, por favor seleccione otros filtros."
              buttonLabel="Limpiar filtros"
              buttonAction={() => {}}
            />
          </EmptyStateCell>
        }
        emptyFirstState={
          <EmptyStateCell colSpan={demandedProductsColumns.length}>
            <EmptyState
              title="No hay recursos disponibles"
              description="No se encontraron notificaciones programadas"
            />
          </EmptyStateCell>
        }
      >
        {scheduleNotificitions && !!scheduleNotificitions?.length ? 
          scheduleNotificitions.map(
            (record: ScheduledNotificationsType, key) => {
              return (
                <tr className="styled-data-table-row" key={record.id}>
                  <BodyCell textAlign="center">
                    <Text.Body size="m" weight="bold" color="Primary5">
                      {record?.id || '-'}
                    </Text.Body>
                  </BodyCell>
                  <BodyCell textAlign="center">
                    <Text.Body size="m" weight="bold" color="Primary5">
                      {record?.nameNotification || '-'}
                    </Text.Body>
                  </BodyCell>
                  <BodyCell textAlign="center">
                    <Text.Body size="m" weight="bold" color="Primary5">
                      {record?.frequencyToNotify || '-'}
                    </Text.Body>
                  </BodyCell>
                  <BodyCell textAlign="center">
                    <Text.Body size="m" weight="bold" color="Primary5">
                      {record?.hourTimeToNotify.toString() ?? '-'}
                    </Text.Body>
                  </BodyCell>
                  <BodyCell textAlign="center">
                    <Text.Body size="m" weight="bold" color="Primary5">
                      {record?.logicKey ?? '-'}
                    </Text.Body>
                  </BodyCell>
                  <BodyCell textAlign="center">
                    <Text.Body size="m" weight="bold" color="Primary5">
                      {record && record?.state ? 'Activo' : 'Inactivo'}
                    </Text.Body>
                  </BodyCell>
                  <BodyCell textAlign="center">
                    {
                      <Container display="flex" gap="10px" justifyContent="space-around">
                        <Button
                          onClick={() => onOpenEditNotificationModal(record)}
                          messageTooltip="Asignar notificación"
                          shape="round"
                          size="small"
                          leadingIcon="ri-pencil-fill"
                          permission="P13-01-03-03"
                          display="default"
                        />
                        <Button
                          onClick={() => openDeleteModal(record.id)}
                          messageTooltip="Eliminar notificación"
                          shape="round"
                          size="small"
                          leadingIcon="ri-delete-bin-line"
                          permission="P13-01-03-03"
                          display="danger"
                        />
                      </Container>
                    }
                  </BodyCell>
                </tr>
              )
            }
          ) : null}
      </Table>

      {
        visibleEditModal ? (
          <AssingScheduledNotificationsModal 
            visible={visibleEditModal} 
            onClose={onHideEditNotificationModal} 
            modalActions='edit'
            scheduledNotification={scheduledNotification}
          />
        ) : null
      }
      {
        visibleDeleteModal ? (
          <DeleteScheduledNotificationsModal 
            visible={visibleDeleteModal}
            onClose={onHideDeleteModal}
            onDelete={onDeleteNotification}
          />
        ) : null
      }
      
    </Container>
  )
}

export default ScheduleNotificationsTable
