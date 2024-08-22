import Container from "@/ui/Container"
import JudicialBinNotificationListActions from "./JudicialBinNotificationListActions"
import JudicialBinNotificationListTable from "./JudicialBinNotificationListTable"

const JudicialBinNotificationList = () => {
  return (
    <Container width="100%" height="calc(100% - 50px)" display="flex" flexDirection="column">
      <JudicialBinNotificationListActions />
      <JudicialBinNotificationListTable />
    </Container>
  )
}

export default JudicialBinNotificationList