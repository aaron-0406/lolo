import Container from "@/ui/Container"
import UsersToSendReportTable from "./UsersToSendReportTable"
import { useLoloContext } from "@/contexts/LoloProvider"
import { useQuery } from "react-query"
import { getAllUsersByID } from "@/services/dash/customer-user.service"
import { useEffect } from "react"
import { KEY_USUARIOS_SCHUDULED_NOTIFICATIONS_CACHE } from "pages/Company/Settings/ScheduledNotifications/Modals/AssignScheduledNotificationsModal/ScheduledNotificationsInfoModal/ScheduledNoticationsUsersTable/utils/users.cache"

const AssignUsersToSendReportInfo = () => {
  const {
    client: {
      customer: { id: customerId },
    },
  } = useLoloContext()

  const { data, isLoading, refetch } = useQuery(KEY_USUARIOS_SCHUDULED_NOTIFICATIONS_CACHE, async () => {
    return await getAllUsersByID(customerId)
  })

  useEffect(() => {
    refetch()
    // eslint-disable-next-line
  }, [])

  const users = data?.data ?? []

  return (
    <Container width="100%" height="100%" maxHeight="100%" display="flex" padding="20px" overFlowY="auto"> 
      <UsersToSendReportTable 
        users={users} 
        isLoading={isLoading}
      />
    </Container>
  )
}

export default AssignUsersToSendReportInfo