import { Route } from 'react-router-dom'

//HOME - PUBLIC
import Home from '../../../pages/Home'

//DASHBOARD
import DashLogin from '@/pages/dashboard/Login'
import DashHome from '@/pages/dashboard/Home'
import DashboardCustomers from '@/pages/dashboard/DashboardCustomers'
import DashboardUsers from '@/pages/dashboard/DashboardUsers'
import DashboardRoles from '@/pages/dashboard/DashboardRoles'
import DashboardPermissions from '@/pages/dashboard/DashboardPermissions'
import DashboardNegotiations from '@/pages/dashboard/DashboardNegotiations'
import DashboardFuncionarios from '@/pages/dashboard/DashboardFuncionarios'

//COMPANY
import CompanyLogin from '../../../pages/Company/Login'
import CompanyHome from '../../../pages/Company/Home'

//EXTRAJUDICIAL
import ExtrajudicialActions from '@/pages/extrajudicial/ExtrajudicialActions'
import ExtrajudicialProfile from '@/pages/extrajudicial/ExtrajudicialProfile'
import ExtrajudicialCobranza from '@/pages/extrajudicial/ExtrajudicialCobranza'
import ExtrajudicialCobranzaComments from '@/pages/extrajudicial/ExtrajudicialCobranzaComments/ExtrajudicialCobranzaComments'
import ExtrajudicialTemplate from '@/pages/extrajudicial/ExtrajudicialTemplate'
import Dashboard from '@/pages/extrajudicial/ExtrajudicialDashboard/Dashboard'
import ExtrajudicialMetas from '@/pages/extrajudicial/ExtrajudicialMetas'
import ExtrajudicialCustomers from '@/pages/extrajudicial/ExtrajudicialCustomers/ExtrajudicialCustomers'

//JUDICIAL
import ErrorPage from '../../../pages/ErrorPage'
import NotFound from '../../../pages/NotFound'
import Unauthorized from 'pages/Unauthorized'

import AppSwitch from '../AppSwitch'
import GuestRoute from '../GhestRoutes'
import GuestRouteCompany from '../GuestRoutesCompany'
import ProtectedRoutes from '../ProtectedRoutes'
import ProtectedRoutesCompany from '../ProtectedRoutesCompany'

import paths from '../paths'

const AppRouter = () => {
  return (
    <AppSwitch>
      <Route path={paths.root} element={<Home />} />
      <Route path={paths.error} element={<ErrorPage />} />
      <Route path={paths.general.notFound} element={<NotFound />} />
      <Route path={paths.general.unauthorized} element={<Unauthorized />} />

      {/* DASHBOARD */}
      <Route element={<GuestRoute pathname={paths.dash.root} />}>
        <Route path={paths.dash.login} element={<DashLogin />} />
      </Route>
      <Route element={<ProtectedRoutes pathname={paths.dash.login} />}>
        <Route path={paths.dash.root} element={<DashHome />} />
        <Route path={paths.dash.clientes} element={<DashboardCustomers />} />
        <Route path={paths.dash.usuarios} element={<DashboardUsers />} />
        <Route path={paths.dash.permisos} element={<DashboardPermissions />} />
        <Route path={paths.dash.roles} element={<DashboardRoles />} />
        <Route path={paths.dash.reportes} element={<div>reportes</div>} />
      </Route>

      {/* COMPANY */}
      <Route element={<GuestRouteCompany pathname={paths.cobranza.perfil()} />}>
        <Route path={paths.company.login()} element={<CompanyLogin />} />
      </Route>
      <Route element={<ProtectedRoutesCompany pathname={paths.company.login()} />}>
        <Route path={paths.company.root()} element={<CompanyHome />} />
        <Route path={paths.cobranza.perfil()} element={<ExtrajudicialProfile />} />
        <Route path={paths.cobranza.clientes()} element={<ExtrajudicialCustomers />} />
        <Route path={paths.cobranza.cobranza()} element={<ExtrajudicialCobranza />} />
        <Route path={paths.cobranza.cobranzaComments()} element={<ExtrajudicialCobranzaComments />} />
        <Route path={paths.cobranza.metas()} element={<ExtrajudicialMetas />} />
        <Route path={paths.cobranza.document()} element={<ExtrajudicialTemplate />} />
        <Route path={paths.cobranza.dashboard()} element={<Dashboard />} />
        <Route path={paths.cobranza.funcionarios()} element={<DashboardFuncionarios />} />
        <Route path={paths.cobranza.acciones()} element={<ExtrajudicialActions />} />
        <Route path={paths.cobranza.negociaciones()} element={<DashboardNegotiations />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </AppSwitch>
  )
}

export default AppRouter
