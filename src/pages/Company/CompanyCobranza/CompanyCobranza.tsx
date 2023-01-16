import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import LayoutCobranza from "../../../components/Layouts/LayoutCobranza";
import { useLoloContext } from "../../../shared/contexts/LoloProvider";
import { getAllUsersByID } from "../../../shared/services/customer-user.service";
import { getAllFuncionarios } from "../../../shared/services/funcionario.service";
import { getAllNegociaciones } from "../../../shared/services/negotiation.service";
import { ClientType } from "../../../shared/types/client.type";
import CobranzaActions from "./CobranzaActions";
import CobranzaComments from "./CobranzaComments";
import CobranzaInfo from "./CobranzaInfo";
import CobranzaSearch from "./CobranzaSearch";
import { CompanyCobranzaResolver } from "./CompanyCobranza.yup";

const CompanyCobranza = () => {
  const formMethods = useForm<ClientType>({
    resolver: CompanyCobranzaResolver,
    mode: "all",
    defaultValues: {
      id: 0,
      code: "",
      negotiationId: 0,
      dniOrRuc: "",
      name: "",
      cityId: 0,
      funcionarioId: 0,
      customerUserId: 0,
      customerHasBankId: 0,
    },
  });

  const {
    client: {
      customer: { id: customerID },
    },
    user: { setUsers },
    funcionario: { setFuncionarios },
    negociacion: { setNegociaciones },
  } = useLoloContext();

  const { isLoading: isLoadingUsers } = useQuery(
    "query-get-all-users-by-id",
    async () => {
      return await getAllUsersByID(customerID);
    },
    {
      onSuccess: (response) => {
        setUsers(response.data);
      },
    }
  );

  const { isLoading: isLoadingFuncionarios } = useQuery(
    "query-get-all-funcionarios",
    async () => {
      return await getAllFuncionarios();
    },
    {
      onSuccess: (response) => {
        setFuncionarios(response.data);
      },
    }
  );
  const { isLoading: isLoadingNegotiation } = useQuery(
    "query-get-all-negociaciones",
    async () => {
      return await getAllNegociaciones();
    },
    {
      onSuccess: (response) => {
        setNegociaciones(response.data);
      },
    }
  );

  const [loading, setLoading] = useState<boolean>(false);

  const setLoadingGlobal = (state: boolean) => {
    setLoading(state);
  };

  return (
    <FormProvider {...formMethods}>
      <LayoutCobranza
        leftHeader={<CobranzaSearch setLoadingGlobal={setLoadingGlobal} />}
        leftActions={<CobranzaActions />}
        leftContent={
          <CobranzaInfo
            loading={
              loading ||
              isLoadingUsers ||
              isLoadingFuncionarios ||
              isLoadingNegotiation
            }
          />
        }
        rightComments={<CobranzaComments />}
      />
    </FormProvider>
  );
};

export default CompanyCobranza;
