import { useQuery } from "react-query";
import { useLoloContext } from "../../../shared/contexts/LoloProvider";
import { getAllClientsByCHB } from "../../../shared/services/client.service";
import { ClientType } from "../../../shared/types/client.type";
import Container from "../../../ui/Container";
import CustomersRow from "./CustomersRow";

const CompanyCustomers = () => {
  const {
    bank: { selectedBank },
  } = useLoloContext();

  const { data, isLoading, isError } = useQuery("query-client", async () => {
    return await getAllClientsByCHB(selectedBank);
  });

  if (isLoading) {
    <div>Loading ...</div>;
  }

  return (
    <Container width="100%" height="100%" padding="20px">
      {data?.data.map((client: ClientType, index: number) => {
        return (
          <CustomersRow
            key={index}
            code={client.code}
            name={client.name}
            state={client.state}
            createdAt={client.createdAt}
          />
        );
      })}
    </Container>
  );
};

export default CompanyCustomers;
