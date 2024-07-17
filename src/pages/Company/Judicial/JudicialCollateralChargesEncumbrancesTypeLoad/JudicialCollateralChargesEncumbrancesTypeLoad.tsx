import Container from "@/ui/Container"
import JudicialCollateralChargesEncumbrancesTypeLoadActions from "./JudicialCollateralChargesEncumbrancesTypeLoadActions"
import JudicialCollateralChargesEncumbrancesTypeLoadTable from "./JudicialCollateralChargesEncumbrancesTypeLoadTable"

const JudicialCollateralChargesEncumbrancesTypeLoad = () => {
  return (
    <Container width="100%" height="100%" display="flex" flexDirection="column" alignItems="start">
      <JudicialCollateralChargesEncumbrancesTypeLoadActions />
      <JudicialCollateralChargesEncumbrancesTypeLoadTable />
    </Container> 
  )
}

export default JudicialCollateralChargesEncumbrancesTypeLoad