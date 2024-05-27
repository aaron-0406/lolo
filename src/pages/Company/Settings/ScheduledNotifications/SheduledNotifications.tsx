import Container from '@/ui/Container'
import ScheduleNotificationsTable from './ScheduledNotificationsTable'
import ScheduledNotificationsInfo from 'pages/Company/Settings/ScheduledNotifications/ScheduledNotificationsInfo'

const ScheduledNotifications = () => {

  return (
    <Container width="100%" height="100%" display="flex" flexDirection="column" justifyContent="space-between">
      <ScheduledNotificationsInfo/>
      <ScheduleNotificationsTable />
    </Container>
  )
}

export default ScheduledNotifications
