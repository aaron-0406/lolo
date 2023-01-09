import { useQuery } from "react-query";
import { Outlet, useParams } from "react-router-dom";
import MenuCompany from "../../../components/Menus/MenuCompany";
import { useLoloContext } from "../../contexts/LoloProvider";
import { getAllCities } from "../../services/city.service";
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
    city: { setCities },
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

  const { isLoading: isLoadingCities } = useQuery(
    "query-get-all-cities",
    async () => {
      return await getAllCities();
    },
    {
      onSuccess: (response) => {
        setCities(response.data);
      },
    }
  );

  //TODO: Get isAuthenticated from context - useGeneralContext
  const isAuthenticated = true;

  if (!isAuthenticated) {
    storage.clear();
    return <RedirectRoute pathname={pathname} />;
  }

  if (isLoading || isLoadingCities) {
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
