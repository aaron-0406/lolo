import Container from "@/ui/Container"
import ProvinceTable from "./ProvinceTable/ProvinceTable"

const Province = () => {
  return (
    <Container width="100%" height="100%" display="flex" flexDirection="column" justifyContent="space-between">
      <ProvinceTable />
    </Container>
  )
}

export default Province