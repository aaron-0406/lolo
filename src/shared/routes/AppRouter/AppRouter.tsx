import { Route } from 'react-router-dom'

//HOME - PUBLIC
import Home from '../../../pages/Home'

//DASHBOARD
import DashLogin from '../../../pages/Dashboard/Login'
import DashHome from '../../../pages/Dashboard/Home'

//COMPANY
import CompanyLogin from '../../../pages/Company/Login'
import CompanyHome from '../../../pages/Company/Home'
import CompanyCustomers from '../../../pages/Company/CompanyCustomers'
import CompanyProfile from '../../../pages/Company/CompanyProfile'

import ErrorPage from '../../../pages/ErrorPage'
import NotFound from '../../../pages/NotFound'

import AppSwitch from '../AppSwitch'
import GuestRoute from '../GhestRoutes'
import GuestRouteCompany from '../GuestRoutesCompany'
import ProtectedRoutes from '../ProtectedRoutes'
import ProtectedRoutesCompany from '../ProtectedRoutesCompany'

import paths from '../paths'
import CompanyCobranza from '../../../pages/Company/CompanyCobranza'
import CompanyTemplate from '../../../pages/Company/CompanyTemplate'
import ProtectedRoutesCompanyDash from '../ProtectedRoutesCompanyDash'
import Dashboard from '../../../pages/Company/CompanyDashboard/Dashboard'

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
        <Route path={paths.dash.clientes} element={<div>clientes</div>} />
        <Route path={paths.dash.gestiones} element={<div>gestiones</div>} />
        <Route path={paths.dash.reportes} element={<div>reportes</div>} />
      </Route>

      {/* COMPANY */}
      <Route element={<GuestRouteCompany pathname={paths.company.cobranza()} />}>
        <Route path={paths.company.login()} element={<CompanyLogin />} />
      </Route>
      <Route element={<ProtectedRoutesCompany pathname={paths.company.login()} />}>
        <Route path={paths.company.root()} element={<CompanyHome />} />
        <Route path={paths.company.perfil()} element={<CompanyProfile />} />
        <Route path={paths.company.clientes()} element={<CompanyCustomers />} />
        <Route path={paths.company.cobranza()} element={<CompanyCobranza />} />
        <Route path={paths.company.document()} element={<CompanyTemplate />} />
        <Route element={<ProtectedRoutesCompanyDash pathname={paths.company.login()} />}>
          <Route path={paths.companyDashboard.dashboard()} element={<Dashboard />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </AppSwitch>
  )
}

export default AppRouter
