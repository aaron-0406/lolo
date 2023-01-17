import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useLoloContext } from "../../../../shared/contexts/LoloProvider";
import paths from "../../../../shared/routes/paths";
import { getAllClientsByCHB } from "../../../../shared/services/client.service";
import { getAllFuncionariosByCHB } from "../../../../shared/services/funcionario.service";
import { getAllNegociacionesByCHB } from "../../../../shared/services/negotiation.service";
import { ClientType } from "../../../../shared/types/client.type";
import Container from "../../../../ui/Container";
import CustomersRow from "../CustomersRow";

const CustomersTable = () => {
  const {
    client: {
      customer: { urlIdentifier },
    },
    bank: { selectedBank },
    negociacion: { setNegociaciones },
    funcionario: { setFuncionarios },
  } = useLoloContext();

  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingNegotiations, setIsLoadingNegotiations] = useState(false);
  const [isLoadingFuncionarions, setIsLoadingFuncionarions] = useState(false);

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

  const { refetch: refetchNegotiations } = useQuery(
    "query-get-all-negociaciones",
    async () => {
      return await getAllNegociacionesByCHB(selectedBank.idCHB);
    },
    {
      enabled: !!selectedBank.idCHB.length,
      onSuccess: (response) => {
        setNegociaciones(response.data);
        setIsLoadingNegotiations(false);
      },
    }
  );

  const { refetch: refetchFuncionarios } = useQuery(
    "query-get-all-funcionarios",
    async () => {
      return await getAllFuncionariosByCHB(selectedBank.idCHB);
    },
    {
      enabled: !!selectedBank.idCHB.length,
      onSuccess: (response) => {
        setFuncionarios(response.data);
        setIsLoadingFuncionarions(false);
      },
    }
  );

  const onClickRow = (code: string) => {
    navigate(`${paths.company.cobranza(urlIdentifier)}?code=${code}`);
  };

  useEffect(() => {
    if (selectedBank.idCHB.length) {
      setIsLoading(true);
      setIsLoadingNegotiations(true);
      setIsLoadingFuncionarions(true);

      refetch();
      refetchNegotiations();
      refetchFuncionarios();
    }
  }, [selectedBank, refetch, refetchNegotiations, refetchFuncionarios]);

  if (isLoading || isLoadingNegotiations || isLoadingFuncionarions) {
    return <div>Loading ...</div>;
  }

  return (
    <Container
      width="100%"
      height="calc(100% - 112px)"
      padding="20px"
      overFlowY="auto"
    >
      <div>
        {customers.map((client: ClientType, index: number) => {
          return (
            <CustomersRow
              key={index}
              code={client.code}
              name={client.name}
              negotiationId={client.negotiationId}
              createdAt={client.createdAt}
              onClick={onClickRow}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default CustomersTable;
