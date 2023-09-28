import Container from '@/ui/Container'
import UserLogsActions from './UserLogsActions'
import UserLogsTable from './UserLogsTable'

const ExtrajudicialUserLogs = () => {
  return (
    <Container
      width="100%"
      height="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap="20px"
    >
      <UserLogsActions />
      <UserLogsTable />
    </Container>
  )
}

export default ExtrajudicialUserLogs
