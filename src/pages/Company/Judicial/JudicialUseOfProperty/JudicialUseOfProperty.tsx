import Container from "@/ui/Container"
import JudicialUseOfPropertyActions from "./JudicialUseOfPropertyActions"
import JudicialUseOfPropertyTable from "./JudicialUseOfPropertyTable"

const JudicialUseOfProperty = () => {
  return (
    <Container width="100%" height="100%" display="flex" flexDirection="column" alignItems="center">
      <JudicialUseOfPropertyActions />
      <JudicialUseOfPropertyTable />
    </Container> 
  )
}

export default JudicialUseOfProperty