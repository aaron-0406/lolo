import Container from '@/ui/Container'
import RolesActions from './RolesActions'
import RolesTable from './RolesTable'

const DashboardRoles = () => {
  return (
    <Container
      width="100%"
      height="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <RolesActions />
      <RolesTable />
    </Container>
  )
}

export default DashboardRoles
