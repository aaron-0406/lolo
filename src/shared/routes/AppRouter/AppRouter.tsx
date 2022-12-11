import { Route } from "react-router-dom";

//HOME - PUBLIC
import Home from "../../../pages/Home";

//DASHBOARD
import DashLogin from "../../../pages/Dashboard/Login";
import DashHome from "../../../pages/Dashboard/Home";

import ErrorPage from "../../../pages/ErrorPage";
import NotFound from "../../../pages/NotFound";

import AppSwitch from "../AppSwitch";
import GuestRoute from "../GhestRoutes";
import ProtectedRoutes from "../ProtectedRoutes";

import paths from "../paths";

const AppRouter = () => {
  return (
    <AppSwitch>
      <Route path={paths.root} element={<Home />} />
      <Route path={paths.error} element={<ErrorPage />} />
      <Route path={paths.general.notFound} element={<NotFound />} />

      <Route element={<GuestRoute pathname={paths.dash.root} />}>
        <Route path={paths.dash.login} element={<DashLogin />} />
      </Route>
      <Route element={<ProtectedRoutes pathname={paths.dash.login} />}>
        <Route path={paths.dash.root} element={<DashHome />} />
        <Route path={paths.dash.root} element={<div>X</div>} />
        <Route path={paths.dash.root} element={<div>Y</div>} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </AppSwitch>
  );
};

export default AppRouter;
