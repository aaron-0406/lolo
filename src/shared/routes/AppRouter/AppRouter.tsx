import { Route } from "react-router-dom";

//HOME - PUBLIC
import Home from "../../../pages/Home";

//DASHBOARD
import DashLogin from "../../../pages/Dashboard/Login";
import DashHome from "../../../pages/Dashboard/Home";

//COMPANY
import CompanyLogin from "../../../pages/Company/Login";
import CompanyHome from "../../../pages/Company/Home";
import CompanyCustomers from "../../../pages/Company/CompanyCustomers";
import CompanyProfile from "../../../pages/Company/CompanyProfile";

import ErrorPage from "../../../pages/ErrorPage";
import NotFound from "../../../pages/NotFound";

import AppSwitch from "../AppSwitch";
import GuestRoute from "../GhestRoutes";
import GuestRouteCompany from "../GuestRoutesCompany";
import ProtectedRoutes from "../ProtectedRoutes";
import ProtectedRoutesCompany from "../ProtectedRoutesCompany";

import paths from "../paths";
import CompanyCobranza from "../../../pages/Company/CompanyCobranza";

const AppRouter = () => {
  return (
    <AppSwitch>
      <Route path={paths.root} element={<Home />} />
      <Route path={paths.error} element={<ErrorPage />} />
      <Route path={paths.general.notFound} element={<NotFound />} />

      {/* DASHBOARD */}
      <Route element={<GuestRoute pathname={paths.dash.root} />}>
        <Route path={paths.dash.login} element={<DashLogin />} />
      </Route>
      <Route element={<ProtectedRoutes pathname={paths.dash.login} />}>
        <Route path={paths.dash.root} element={<DashHome />} />
        <Route path={paths.dash.root} element={<div>X</div>} />
        <Route path={paths.dash.root} element={<div>Y</div>} />
      </Route>

      {/* COMPANY */}
      <Route element={<GuestRouteCompany pathname={paths.company.root()} />}>
        <Route path={paths.company.login()} element={<CompanyLogin />} />
      </Route>
      <Route
        element={<ProtectedRoutesCompany pathname={paths.company.login()} />}
      >
        <Route path={paths.company.root()} element={<CompanyHome />} />
        <Route path={paths.company.perfil()} element={<CompanyProfile />} />
        <Route path={paths.company.clientes()} element={<CompanyCustomers />} />
        <Route path={paths.company.cobranza()} element={<CompanyCobranza />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </AppSwitch>
  );
};

export default AppRouter;
