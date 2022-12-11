import { useParams, Outlet } from "react-router-dom";
import paths from "../paths";
import RedirectRoute from "../RedirectRoute";
import { GuestParamsType } from "./GuestRoutesCompany.interfaces";

type GuestRouteCompanyProps = {
  pathname: string;
};

const GuestRouteCompany: React.FC<GuestRouteCompanyProps> = ({ pathname }) => {
  const { urlIdentifier } = useParams<GuestParamsType>();

  if (urlIdentifier) {
    //TODO: check if urlIdentifier exists
    //TODO: maybe we can create a custom hook to get the url identifier
    if (urlIdentifier !== "aaron") {
      //TODO: if the url does not exists, then we redirect to NotFound page
      return <RedirectRoute pathname={paths.general.notFound} />;
    }
  }

  //TODO: Get isAuthenticated from context - useGeneralContext
  const isAuthenticated = false;

  if (isAuthenticated) {
    return <RedirectRoute pathname={pathname} />;
  }

  return (
    <div className="login-provider">
      <Outlet />
    </div>
  );
};

export default GuestRouteCompany;
