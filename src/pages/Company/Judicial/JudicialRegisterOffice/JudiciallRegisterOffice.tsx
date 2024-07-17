import Container from "@/ui/Container"
import JudicialRegisterOfficeActions from "./JudicialRegiserOfficeActions"
import JudicialRegisterOfficeTable from "./JudicialRegisterOfficeTable"

const JudicialRegisterOffice = () => {
  return (
    <Container width="100%" height="100%" display="flex" flexDirection="column" alignItems="center">
      <JudicialRegisterOfficeActions />
      <JudicialRegisterOfficeTable />
    </Container> 
  )
}

export default JudicialRegisterOffice