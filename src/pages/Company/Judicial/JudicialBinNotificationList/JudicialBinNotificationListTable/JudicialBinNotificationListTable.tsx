import Container from "@/ui/Container"
import Table from "@/ui/Table"
import EmptyStateCell from "@/ui/Table/EmptyStateCell"
import EmptyState from "@/ui/EmptyState"
import { useQuery } from "react-query"
import { judicialBinNotificationListColumns } from "./utils/columns"
import { useLoloContext } from "@/contexts/LoloProvider"
import { getAllNotificationsByBinnacleId } from "@/services/judicial/judicial-bin-notification.service"
import { useParams } from "react-router-dom"
import BodyCell from "@/ui/Table/BodyCell"
import { JudicialBinNotificationType } from "@/types/judicial/judicial-bin-notification.type"
import moment from 'moment';
import useModal from "@/hooks/useModal"
import { useState } from "react"
import Button from "@/ui/Button"
import NotificationDetailsModal from "../Modals/NotificationDetailsModal"

const JudicialBinNotificationListTable = () => {
  const [ notificationDetailsModalData, setNotificationDetailsModalData ] = useState<JudicialBinNotificationType>()
  const binnacleCode = useParams()?.binnacleCode ?? ''
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext(); 

  const { hideModal: hideNotificationDetailsModal, showModal: showNotificationDetailsModal, visible: visibleNotificationDetailsModal } = useModal()

  const { data, isLoading } = useQuery(
    ['key-judicial-bin-notification-list', parseInt(chb.length ? chb : '0')],
    async () => {
      return await getAllNotificationsByBinnacleId(parseInt(binnacleCode ? binnacleCode : '0'))
    }
  )

  const onShowNotificationDetailsModal = (notification: JudicialBinNotificationType) => {
    showNotificationDetailsModal()
    setNotificationDetailsModalData(notification)
  }

  const notifications = data?.data ?? []

  return (
    <Container width="100%" height="100%" padding="0px 20px 0px 20px">
      <Table
        top="190px"
        loading={isLoading}
        columns={judicialBinNotificationListColumns}
        isArrayEmpty={data?.data.length}
        emptyState={
          <EmptyStateCell colSpan={judicialBinNotificationListColumns.length}>
            <EmptyState
              title="No hay recursos disponibles"
              description="No se encontraron expedientes, por favor seleccione otros filtros."
              buttonLabel="Limpiar filtros"
            />
          </EmptyStateCell>
        }
      >
        {!!notifications?.length &&
          notifications.map((record: JudicialBinNotificationType, key: number) => {
            return (
              <tr className="styled-data-table-row" key={record.id}>
                <BodyCell textAlign="center">{`${key + 1 || '-'}`}</BodyCell>
                <BodyCell textAlign="center">{`${record.notificationCode || '-'}`}</BodyCell>
                <BodyCell textAlign="left">{`${record.addressee || '-'}`}</BodyCell>
                <BodyCell textAlign="left">{`${record.attachments || '-'}`}</BodyCell>
                <BodyCell textAlign="left">{moment(record.sentCentral).format('DD-MM-YYYY') ?? '-'}</BodyCell>
                <BodyCell textAlign="left">{`${record.deliveryMethod || '-'}`}</BodyCell>
                <BodyCell textAlign="center">
                  <Button
                    onClick={() => onShowNotificationDetailsModal(record)}
                    trailingIcon="ri-file-list-fill"
                    messageTooltip="Ver detalles"
                    shape="round"
                    size="small"
                    color="primary"
                  />
                </BodyCell>
              </tr>
            )
          })}
      </Table>
      {visibleNotificationDetailsModal && notificationDetailsModalData ? (
        <NotificationDetailsModal
          visible={visibleNotificationDetailsModal}
          onClose={hideNotificationDetailsModal}
          notification={notificationDetailsModalData}
        />
      ) : null}
    </Container>
  )
}

export default JudicialBinNotificationListTable