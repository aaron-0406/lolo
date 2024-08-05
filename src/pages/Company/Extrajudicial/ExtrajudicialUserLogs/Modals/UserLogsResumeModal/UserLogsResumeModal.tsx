import Container from '@/ui/Container'
import Modal from '@/ui/Modal'
import Text from '@/ui/Text';
import UserLogsResumeModalTable from '../UserLogsResumeModal/UserLogsResumeModalTable';
import EmptyState from '@/ui/EmptyState';

type UserLogsResumeModalProps = {
  userLogs: any[]; 
  onClose: () => void
  visible: boolean
  userLogId?: number
}

export type Change = {
  key: string;
  oldValue: any;
  newValue: any;
  withoutChanges: any;
}

interface LogSummaryProps {
  summary: string;
}

const UserLogsResumeModal = ( { visible, onClose, userLogs, userLogId } : UserLogsResumeModalProps ) => {
  const currentLog = userLogs.find((log) => log.id === userLogId)
  return (
    <Modal
      id="user-logs-resume-modal"
      title="Resumen de registros de usuarios"
      size="medium"
      minHeight="500px"
      visible={visible}
      onClose={onClose}
      clickOutsideToClose={onClose}
      contentOverflowY="auto"
    >
      <LogSummary summary={currentLog?.methodSumary ?? ''} />
    </Modal>
  )
}

export default UserLogsResumeModal

const LogSummary: React.FC<LogSummaryProps> = ({ summary }) => {
  if (!summary) {
    return (
      <Container padding="20px" width="100%" height="100%" justifyContent="center" alignItems="center" display="flex">
        <Text.Body size="m" weight="bold">
          No summary available
        </Text.Body>
      </Container>
    )
  }

  const parts = summary.split('CHANGES\n');
  const headerLines = parts[0].split('\n');
  const method = headerLines[0];
  const action = headerLines[1];

  const changes: Change[] = parts[1] 
    ? parts[1].split('\n').map(change => JSON.parse(change) as Change) 
    : [];

  return (
    <Container padding="20px" width="100%" gap="10px" height="100%" justifyContent="start" alignItems="start" display="flex" flexDirection='column'>
      <Container display='flex' gap="10px">
        <Text.Body size="m" weight="bold">
          Método:
        </Text.Body>
        <Text.Body size="m" weight="regular">
          {method}
        </Text.Body>
      </Container>
      <Container display='flex' gap="10px">
        <Text.Body size="m" weight="bold">
          ID de la entidad: 
        </Text.Body>
        <Text.Body size="m" weight="regular">
          {action}
        </Text.Body>
      </Container>
      {/* <Text.Body size="m" weight="bold">
        Cambios:
      </Text.Body> */}
      {changes.length > 0 ? <UserLogsResumeModalTable changes={changes} /> : <EmptyState title="No hay cambios" description="No hay cambios para mostrar" />}
    </Container>
  )
};