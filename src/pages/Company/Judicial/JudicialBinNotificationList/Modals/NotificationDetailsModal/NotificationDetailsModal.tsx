import { JudicialBinNotificationType } from "@/types/judicial/judicial-bin-notification.type"
import Container from "@/ui/Container"
import Modal from "@/ui/Modal"
import Text from "@/ui/Text"
import moment from "moment"
import styled from "styled-components"
import { css } from "styled-components"

type NotificationDetailsModalProps = {
  notification?: JudicialBinNotificationType
  visible: boolean
  onClose: () => void
}
const NotificationDetailsModal = ( { visible, onClose, notification } : NotificationDetailsModalProps) => {
  return (
    <Modal
      id="notification-details-modal"
      visible={visible}
      onClose={onClose}
      clickOutsideToClose={onClose}
      title={`NOTIFICACIÓN ${String(notification?.notificationCode) ?? ''}`}
      contentOverflowY="auto"
      withPortal
    >
      <StyledContainer>
        <Container className="contaner__content">
          <Text.Body size="m" weight="bold">
            Destinatario:
          </Text.Body>
          <Text.Body size="m" weight="regular">
            {notification?.addressee}
          </Text.Body>
        </Container>
        <Container className="contaner__content">
          <Text.Body size="m" weight="bold">
            Anexos:
          </Text.Body>
          <Text.Body size="m" weight="regular">
            {notification?.attachments}
          </Text.Body>
        </Container>
        <Container className="container__table">
          <Container className="container__table-row--header">
            <Text.Body size="m" weight="bold">
              Días en Juzgado
            </Text.Body>
          </Container>
          <Container className="container__table-row--content">
            <Container className="container__table-row--content-item">
              <Text.Body size="s" weight="bold">
                Fecha de Resolución:
              </Text.Body>
              <Text.Body size="s" weight="bold">
                {moment(notification?.resolutionDate).format('DD/MM/YYYY') || ''}
              </Text.Body>
            </Container>
            <Container className="container__table-row--content-item">
              <Text.Body size="s" weight="bold">
                Notificación Impresa el:
              </Text.Body>
              <Text.Body size="s" weight="bold">
                {notification?.notificationPrint &&
                moment(notification?.notificationPrint).format('DD/MM/YYYY') !== 'Invalid date'
                  ? moment(notification?.notificationPrint).format('DD/MM/YYYY')
                  : ''}
              </Text.Body>
            </Container>
            <Container className="container__table-row--content-item">
              <Text.Body size="s" weight="bold">
                Enviada a la Central de Notificación o Casilla Electrónica:
              </Text.Body>
              <Text.Body size="s" weight="bold">
                {notification?.notificationPrint &&
                moment(notification?.notificationPrint).format('DD/MM/YYYY') !== 'Invalid date'
                  ? moment(notification?.notificationPrint).format('DD/MM/YYYY')
                  : ''}
              </Text.Body>
            </Container>
            <Container className="container__table-row--content-item">
              <Text.Body size="s" weight="bold">
                Recepcionada en la central de Notificación el:
              </Text.Body>
              <Text.Body size="s" weight="bold">
                {notification?.centralReceipt &&
                moment(notification?.centralReceipt).format('DD/MM/YYYY') !== 'Invalid date'
                  ? moment(notification?.centralReceipt).format('DD/MM/YYYY')
                  : ''}
              </Text.Body>
            </Container>
          </Container>
          <Container className="container__table-row--header">
            <Text.Body size="m" weight="bold">
              Días en central de notificación
            </Text.Body>
          </Container>
          <Container className="container__table-row--content">
            <Container className="container__table-row--content-item">
              <Text.Body size="s" weight="bold">
                Notificación al destinatario el:
              </Text.Body>
              <Text.Body size="s" weight="bold">
                {notification?.notificationToRecipientOn &&
                moment(notification?.notificationToRecipientOn).format('DD/MM/YYYY') !== 'Invalid date'
                  ? moment(notification?.notificationToRecipientOn).format('DD/MM/YYYY')
                  : ''}
              </Text.Body>
            </Container>
            <Container className="container__table-row--content-item">
              <Text.Body size="s" weight="bold">
                Cargo devuelto al juzgado el:
              </Text.Body>
              <Text.Body size="s" weight="bold">
                {notification?.chargeReturnedToCourtOn &&
                moment(notification?.chargeReturnedToCourtOn).format('DD/MM/YYYY') !== 'Invalid date'
                  ? moment(notification?.chargeReturnedToCourtOn).format('DD/MM/YYYY')
                  : ''}
              </Text.Body>
            </Container>
          </Container>
        </Container>
      </StyledContainer>
    </Modal>
  )
}

export default NotificationDetailsModal

const StyledContainer = styled(Container)`
  ${({ theme }) => css`
    width: 100%;
    height: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    .container__table {
      display: flex;
      flex-direction: column;
      margin: 0px 15px;
      border: 1px solid ${theme.colors.Neutral3};
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      .container__table-row--header {
        display: flex;
        padding: 10px;
        background: ${theme.colors.Neutral3};
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
      }
      .container__table-row--content {
        padding: 10px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        .container__table-row--content-item {
          display: flex;
          width: 100%;
          justify-content: space-between;
          padding-bottom: 10px;
          border-bottom: 1px solid ${theme.colors.Neutral3};  
        }
      }
    }
    .contaner__content {
      display: flex;
      flex-direction: row;
      gap: 20px;
      width: 100%;
      justify-content: space-between;
      padding-bottom: 10px;
      border-bottom: 1px solid ${theme.colors.Neutral4};
    }
  `}
`
