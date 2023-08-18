import { Route } from 'react-router-dom'

//HOME - PUBLIC
import Home from '../../../pages/Home'

//DASHBOARD
import DashLogin from '../../../pages/Dashboard/Login'
import DashHome from '../../../pages/Dashboard/Home'
import DashboardCustomers from '../../../pages/Dashboard/DashboardCustomers'
import DashboardActions from '../../../pages/Dashboard/DashboardActions'
import DashboardUsers from '../../../pages/Dashboard/DashboardUsers'
import DashboardNegotiations from '../../../pages/Dashboard/DashboardNegotiations'
import DashboardFuncionarios from '../../../pages/Dashboard/DashboardFuncionarios'

//COMPANY
import CompanyLogin from '../../../pages/Company/Login'
import CompanyHome from '../../../pages/Company/Home'
import CompanyCustomers from '../../../pages/Company/Extrajudicial/CompanyCustomers'
import CompanyProfile from '../../../pages/Company/Extrajudicial/CompanyProfile'

import ErrorPage from '../../../pages/ErrorPage'
import NotFound from '../../../pages/NotFound'

import AppSwitch from '../AppSwitch'
import GuestRoute from '../GhestRoutes'
import GuestRouteCompany from '../GuestRoutesCompany'
import ProtectedRoutes from '../ProtectedRoutes'
import ProtectedRoutesCompany from '../ProtectedRoutesCompany'

import paths from '../paths'
import ExtrajudicialCobranza from '../../../pages/Company/Extrajudicial/ExtrajudicialCobranza'
import ExtrajudicialTemplate from '../../../pages/Company/Extrajudicial/ExtrajudicialTemplate'
import ProtectedRoutesCompanyDash from '../ProtectedRoutesCompanyDash'
import Dashboard from '../../../pages/Company/Extrajudicial/CompanyDashboard/Dashboard'
import CompanyMetas from '../../../pages/Company/Extrajudicial/CompanyMetas/CompanyMetas'

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
        <Route path={paths.dash.clientes} element={<DashboardCustomers />} />
        <Route path={paths.dash.usuarios} element={<DashboardUsers />} />
        <Route path={paths.dash.funcionarios} element={<DashboardFuncionarios />} />
        <Route path={paths.dash.reportes} element={<div>reportes</div>} />
        <Route path={paths.dash.acciones} element={<DashboardActions />} />
        <Route path={paths.dash.negociaciones} element={<DashboardNegotiations />} />
      </Route>

      {/* COMPANY */}
      <Route element={<GuestRouteCompany pathname={paths.cobranza.cobranza()} />}>
        <Route path={paths.company.login()} element={<CompanyLogin />} />
      </Route>
      <Route element={<ProtectedRoutesCompany pathname={paths.company.login()} />}>
        <Route path={paths.company.root()} element={<CompanyHome />} />
        <Route path={paths.cobranza.perfil()} element={<CompanyProfile />} />
        <Route path={paths.cobranza.clientes()} element={<CompanyCustomers />} />
        <Route path={paths.cobranza.cobranza()} element={<ExtrajudicialCobranza />} />
        <Route path={paths.cobranza.metas()} element={<CompanyMetas />} />
        <Route path={paths.cobranza.document()} element={<ExtrajudicialTemplate />} />
        <Route element={<ProtectedRoutesCompanyDash pathname={paths.company.login()} />}>
          <Route path={paths.companyDashboard.dashboard()} element={<Dashboard />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </AppSwitch>
  )
}

export default AppRouter
