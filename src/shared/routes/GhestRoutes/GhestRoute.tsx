import { Outlet } from "react-router";
import paths from "../paths";
import RedirectRoute from "../RedirectRoute";

type GuestRouteProps = {
  pathname: string;
};

const GuestRoute: React.FC<GuestRouteProps> = ({ pathname }) => {
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

export default GuestRoute;
