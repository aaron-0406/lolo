import Container from "@/ui/Container"
import JudicialNotaryActions from "./JudicialCollateralFilesActions"
import JudicialNotaryTable from "./JudicialCollateralFilesTable"

const JudicialCollateralFiles = () => {
  return (
    <Container width="100%" height="100%" display="flex" flexDirection="column" alignItems="center">
      <JudicialNotaryActions />
      <JudicialNotaryTable />
    </Container> 
  )
}

export default JudicialCollateralFiles