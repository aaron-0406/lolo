import Container from "@/ui/Container"
import JudicialRegistrationAreaActions from "./JudicialRegistrationAreaActions"
import JudicialRegistrationAreaTable from "./JudicialRegistrationAreaTable"

const JudicialRegistrationArea = () => {
  return (
    <Container width="100%" height="100%" display="flex" flexDirection="column" alignItems="center">
      <JudicialRegistrationAreaActions />
      <JudicialRegistrationAreaTable />
    </Container> 
  )
}

export default JudicialRegistrationArea