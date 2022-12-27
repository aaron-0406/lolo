import { useQuery } from "react-query";
import { Outlet, useParams } from "react-router-dom";
import MenuCompany from "../../../components/Menus/MenuCompany";
import { useLoloContext } from "../../contexts/LoloProvider";
import { getCustomerByUrl } from "../../services/customer.service";
import storage from "../../utils/storage";
import { GuestParamsType } from "../GuestRoutesCompany/GuestRoutesCompany.interfaces";
import RedirectRoute from "../RedirectRoute";

type ProtectedRoutesCompanyProps = {
  pathname: string;
};

const ProtectedRoutesCompany: React.FC<ProtectedRoutesCompanyProps> = ({
  pathname,
}) => {
  const { urlIdentifier } = useParams<GuestParamsType>();

  const {
    client: { setCustomer },
  } = useLoloContext();

  const { isLoading, isError } = useQuery(
    "query-customer",
    async () => {
      return await getCustomerByUrl(urlIdentifier ?? "");
    },
    {
      onSuccess: (response) => {
        setCustomer(response.data);
      },
    }
  );

  //TODO: Get isAuthenticated from context - useGeneralContext
  const isAuthenticated = true;

  if (!isAuthenticated) {
    storage.clear();
    return <RedirectRoute pathname={pathname} />;
  }

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError) {
    return <div>Pagina no encontrada</div>;
  }

  return (
    <MenuCompany urlIdentifier={urlIdentifier ?? ""}>
      <Outlet />
    </MenuCompany>
  );
};

export default ProtectedRoutesCompany;
