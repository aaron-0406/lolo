import { Dispatch, FC, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useLoloContext } from "../../../../shared/contexts/LoloProvider";
import paths from "../../../../shared/routes/paths";
import { getAllClientsByCHB } from "../../../../shared/services/client.service";
import { getAllFuncionariosByCHB } from "../../../../shared/services/funcionario.service";
import { getAllNegociacionesByCHB } from "../../../../shared/services/negotiation.service";
import { ClientType } from "../../../../shared/types/client.type";
import { NegotiationType } from "../../../../shared/types/negotiation.type";
import Container from "../../../../ui/Container";
import Pagination from "../../../../ui/Pagination";
import { Opts } from "../../../../ui/Pagination/interfaces";
import CustomersRow from "../CustomersRow";

type CustomersTableProps = {
  opts: Opts;
  setOpts: Dispatch<Opts>;
};

const CustomersTable: FC<CustomersTableProps> = ({ opts, setOpts }) => {
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
  const [customersCount, setCustomersCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingNegotiations, setIsLoadingNegotiations] = useState(false);
  const [isLoadingFuncionarions, setIsLoadingFuncionarions] = useState(false);

  const { refetch } = useQuery(
    "query-get-all-clients-by-chb",
    async () => {
      return await getAllClientsByCHB(
        selectedBank.idCHB,
        opts.page,
        opts.limit,
        opts.filter
      );
    },
    {
      enabled: !!selectedBank.idCHB.length,
      onSuccess: ({ data }) => {
        setCustomers(data.clients);
        setCustomersCount(data.quantity);
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
      setIsLoadingNegotiations(true);
      setIsLoadingFuncionarions(true);

      refetchNegotiations();
      refetchFuncionarios();
    }
  }, [selectedBank, refetch, refetchNegotiations, refetchFuncionarios]);

  useEffect(() => {
    if (selectedBank.idCHB.length) {
      setIsLoading(true);
      refetch();
    }
  }, [refetch, opts, selectedBank]);

  // if (isLoading || isLoadingNegotiations || isLoadingFuncionarions) {
  //   return <div>Loading ...</div>;
  // }

  return (
    <Container
      width="100%"
      height="calc(100% - 112px)"
      padding="20px"
      overFlowY="auto"
    >
      <Pagination count={customersCount} opts={opts} setOpts={setOpts} />
      <div>
        {isLoading || isLoadingNegotiations || isLoadingFuncionarions ? (
          <div>Loading ...</div>
        ) : (
          <>
            {customers.map(
              (
                client: ClientType & { negotiation: NegotiationType },
                index: number
              ) => {
                return (
                  <CustomersRow
                    key={index}
                    code={client.code}
                    name={client.name}
                    negotiationName={client.negotiation.name}
                    negotiationId={client.negotiationId}
                    createdAt={client.createdAt}
                    onClick={onClickRow}
                  />
                );
              }
            )}
          </>
        )}
      </div>
    </Container>
  );
};

export default CustomersTable;
