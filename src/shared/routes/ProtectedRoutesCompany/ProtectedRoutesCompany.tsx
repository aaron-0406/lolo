import { Outlet } from "react-router-dom";
import storage from "../../utils/storage";
import RedirectRoute from "../RedirectRoute";

type ProtectedRoutesCompanyProps = {
  pathname: string;
};

const ProtectedRoutesCompany: React.FC<ProtectedRoutesCompanyProps> = ({
  pathname,
}) => {
  //TODO: Get isAuthenticated from context - useGeneralContext
  const isAuthenticated = false;

  if (!isAuthenticated) {
    storage.clear();
    return <RedirectRoute pathname={pathname} />;
  }

  return (
    <div className="main-layout">
      <Outlet />
    </div>
  );
};

export default ProtectedRoutesCompany;
