import { Outlet, useParams } from "react-router-dom";
import MenuCompany from "../../../components/Menus/MenuCompany";
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
  //TODO: Validate url identifier

  //TODO: Get isAuthenticated from context - useGeneralContext
  const isAuthenticated = true;

  if (!isAuthenticated) {
    storage.clear();
    return <RedirectRoute pathname={pathname} />;
  }

  return (
    <MenuCompany urlIdentifier={urlIdentifier ?? ""}>
      <Outlet />
    </MenuCompany>
  );
};

export default ProtectedRoutesCompany;
