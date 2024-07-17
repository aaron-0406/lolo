import Container from "@/ui/Container"
import DistrictTable from "./DistrictTable/DistrictTable"

const Department = () => {
  return (
    <Container width="100%" height="100%" display="flex" flexDirection="column" justifyContent="space-between">
      <DistrictTable />
    </Container>
  )
}

export default Department