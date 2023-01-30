import Container from "../../../ui/Container";
import CustomersActions from "./CustomersActions";
import CustomersTable from "./CustomersTable";

const CompanyCustomers = () => {
  return (
    <Container width="100%" height="100%" display="flex" flexDirection="column">
      <CustomersActions />

      <CustomersTable />
    </Container>
  );
};

export default CompanyCustomers;
