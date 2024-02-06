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

//COMPANY
import CompanyLogin from '../../../pages/Company/Login'
import CompanyHome from '../../../pages/Company/Home'

//EXTRAJUDICIAL
import ExtrajudicialActions from '@/pages/extrajudicial/ExtrajudicialActions'
import ExtrajudicialFuncionarios from '@/pages/extrajudicial/ExtrajudicialFuncionarios'
import ExtrajudicialNegotiations from '@/pages/extrajudicial/ExtrajudicialNegotiations'
import ExtrajudicialProfile from '@/pages/extrajudicial/ExtrajudicialProfile'
import ExtrajudicialCobranza from '@/pages/extrajudicial/ExtrajudicialCobranza'
import ExtrajudicialTemplate from '@/pages/extrajudicial/ExtrajudicialTemplate'
import Dashboard from '@/pages/extrajudicial/ExtrajudicialDashboard/Dashboard'
import ExtrajudicialMetas from '@/pages/extrajudicial/ExtrajudicialMetas'
import ExtrajudicialCustomers from '@/pages/extrajudicial/ExtrajudicialCustomers/ExtrajudicialCustomers'
import ExtrajudicialRoles from '@/pages/extrajudicial/ExtrajudicialRoles'
import ExtrajudicialdUsers from '@/pages/extrajudicial/ExtrajudicialUsers/ExtrajudicialdUsers'
import ExtrajudicialUserLogs from '@/pages/extrajudicial/ExtrajudicialUserLogs'
import ExtrajudicialCobranzaComments from '@/pages/extrajudicial/ExtrajudicialCobranzaComments/ExtrajudicialCobranzaComments'
import ExtrajudicialCobranzaContacts from '@/pages/extrajudicial/ExtrajudicialCobranzaContacts'
import ExtrajudicialCobranzaProducts from '@/pages/extrajudicial/ExtrajudicialCobranzaProducts'
import ExtrajudicialCobranzaAddresses from '@/pages/extrajudicial/ExtrajudicialCobranzaAddresses'
import ExtrajudicialCobranzaFiles from '@/pages/extrajudicial/ExtrajudicialCobranzaFiles'
import ExtrajudicialIpAddressBank from '@/pages/extrajudicial/ExtrajudicialIpAddressBank'
import ExtrajudicialTags from '@/pages/extrajudicial/ExtrajudicialTags'

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
        <Route path={paths.company.roles()} element={<ExtrajudicialRoles />} />
        <Route path={paths.company.usuarios()} element={<ExtrajudicialdUsers />} />
        <Route path={paths.company.userLogs()} element={<ExtrajudicialUserLogs />} />
        <Route path={paths.company.direccionesIp()} element={<ExtrajudicialIpAddressBank />} />
        <Route path={paths.cobranza.perfil()} element={<ExtrajudicialProfile />} />
        <Route path={paths.cobranza.clientes()} element={<ExtrajudicialCustomers />} />
        <Route path={paths.cobranza.cobranza()} element={<ExtrajudicialCobranza />} />
        <Route path={paths.cobranza.cobranzaComments()} element={<ExtrajudicialCobranzaComments />} />
        <Route path={paths.cobranza.cobranzaContacts()} element={<ExtrajudicialCobranzaContacts />} />
        <Route path={paths.cobranza.cobranzaProducts()} element={<ExtrajudicialCobranzaProducts />} />
        <Route path={paths.cobranza.cobranzaAddresses()} element={<ExtrajudicialCobranzaAddresses />} />
        <Route path={paths.cobranza.cobranzaFiles()} element={<ExtrajudicialCobranzaFiles />} />
        <Route path={paths.cobranza.metas()} element={<ExtrajudicialMetas />} />
        <Route path={paths.cobranza.document()} element={<ExtrajudicialTemplate />} />
        <Route path={paths.cobranza.dashboard()} element={<Dashboard />} />
        <Route path={paths.cobranza.funcionarios()} element={<ExtrajudicialFuncionarios />} />
        <Route path={paths.cobranza.acciones()} element={<ExtrajudicialActions />} />
        <Route path={paths.cobranza.negociaciones()} element={<ExtrajudicialNegotiations />} />
        <Route path={paths.cobranza.etiquetas()} element={<ExtrajudicialTags />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </AppSwitch>
  )
}

export default AppRouter
