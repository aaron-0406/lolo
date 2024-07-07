import Container from "@/ui/Container"
import JudicialNotaryActions from "./JudicialCollateralChargesEncumbrancesActions"
import JudicialNotaryTable from "./JudicialCollateralChargesEncumbrancesTable"

const JudicialCollateralChargesEncumbrances = () => {
  return (
    <Container width="100%" height="100%" display="flex" flexDirection="column" alignItems="center">
      <JudicialNotaryActions />
      <JudicialNotaryTable />
    </Container> 
  )
}

export default JudicialCollateralChargesEncumbrances