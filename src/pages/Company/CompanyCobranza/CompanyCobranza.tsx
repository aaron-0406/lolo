import { FormProvider, useForm } from "react-hook-form";
import LayoutCobranza from "../../../components/Layouts/LayoutCobranza";
import { ClientType } from "../../../shared/types/client.type";
import CobranzaActions from "./CobranzaActions";
import CobranzaComments from "./CobranzaComments";
import CobranzaInfo from "./CobranzaInfo";
import CobranzaSearch from "./CobranzaSearch";

const CompanyCobranza = () => {
  const formMethods = useForm<ClientType>({
    mode: "all",
    defaultValues: {
      id: 0,
      code: "",
      state: "",
      dniOrRuc: "",
      name: "",
      cityId: 0,
      funcionarioId: 0,
      customerUserId: 0,
      customerHasBankId: 0,
    },
  });

  return (
    <FormProvider {...formMethods}>
      <LayoutCobranza
        leftHeader={<CobranzaSearch />}
        leftActions={<CobranzaActions />}
        leftContent={<CobranzaInfo />}
        rightComments={<CobranzaComments />}
      />
    </FormProvider>
  );
};

export default CompanyCobranza;
