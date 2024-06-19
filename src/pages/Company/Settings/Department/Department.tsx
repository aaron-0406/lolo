import Container from "@/ui/Container"
import DepartmentTable from "./DapartmentTable/DepartmentTable"

const Department = () => {
  return (
    <Container width="100%" height="100%" display="flex" flexDirection="column" justifyContent="space-between">
      <DepartmentTable />
    </Container>
  )
}

export default Department