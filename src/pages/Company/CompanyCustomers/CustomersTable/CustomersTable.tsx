import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useLoloContext } from "../../../../shared/contexts/LoloProvider";
import paths from "../../../../shared/routes/paths";
import { getAllClientsByCHB } from "../../../../shared/services/client.service";
import { ClientType } from "../../../../shared/types/client.type";
import Container from "../../../../ui/Container";
import CustomersRow from "../CustomersRow";

const CustomersTable = () => {
  const {
    client: {
      customer: { urlIdentifier },
    },
    bank: { selectedBank },
  } = useLoloContext();
  console.log("🚀 ~ CustomersTable ~ selectedBank", selectedBank);

  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { refetch } = useQuery(
    "query-get-all-clients-by-chb",
    async () => {
      return await getAllClientsByCHB(selectedBank.idCHB);
    },
    {
      enabled: !!selectedBank.idCHB.length,
      onSuccess: (data) => {
        setCustomers(data.data);
        setIsLoading(false);
      },
    }
  );

  const onClickRow = (code: string) => {
    navigate(`${paths.company.cobranza(urlIdentifier)}?code=${code}`);
  };

  useEffect(() => {
    if (selectedBank.idCHB.length) {
      setIsLoading(true);
      refetch();
    }
  }, [selectedBank, refetch]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <Container width="100%" height="100%" padding="20px">
      {customers.map((client: ClientType, index: number) => {
        return (
          <CustomersRow
            key={index}
            code={client.code}
            name={client.name}
            state={client.state}
            createdAt={client.createdAt}
            onClick={onClickRow}
          />
        );
      })}
    </Container>
  );
};

export default CustomersTable;
