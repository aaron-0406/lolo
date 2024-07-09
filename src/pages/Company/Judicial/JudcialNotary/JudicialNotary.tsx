import Container from "@/ui/Container"
import JudicialNotaryActions from "./JudicialNotaryActions"
import JudicialNotaryTable from "./JudicialNotaryTable"

const JudicialNotary = () => {
  return (
    <Container width="100%" height="100%" display="flex" flexDirection="column" alignItems="center">
      <JudicialNotaryActions />
      <JudicialNotaryTable />
    </Container> 
  )
}

export default JudicialNotary