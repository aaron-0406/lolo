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
import ExtrajudicialAddressType from '@/pages/extrajudicial/ExtrajudicialAddressType'
import ExtrajudicialContactType from '@/pages/extrajudicial/ExtrajudicialContactType'
import ExtrajudicialProductName from '@/pages/extrajudicial/ExtrajudicialProductName'

//JUDICIAL
import JudicialFileCasesList from 'pages/Company/Judicial/JudicialFileCasesList'
import JudicialFileCase from 'pages/Company/Judicial/JudicialFileCase/JudicialFileCase'
import JudicialSubject from 'pages/Company/Judicial/JudicialSubject'
import JudicialCourt from 'pages/Company/Judicial/JudicialCourt'
import JudicialProceduralWay from 'pages/Company/Judicial/JudicialProceduralWay/JudicialProceduralWay'
import JudicialFileCaseDemandedProducts from 'pages/Company/Judicial/JudicialFileCaseDemandedProducts'
import JudicialObsType from 'pages/Company/Judicial/JudicialObsType'
import JudicialObservation from 'pages/Company/Judicial/JudicialFileCaseObservation'
import JudicialProcessReason from 'pages/Company/Judicial/JudicialProcessReason'
import JudicialSede from 'pages/Company/Judicial/JudicialSede'

import ErrorPage from '../../../pages/ErrorPage'
import NotFound from '../../../pages/NotFound'
import Unauthorized from 'pages/Unauthorized'

import AppSwitch from '../AppSwitch'
import GuestRoute from '../GhestRoutes'
import GuestRouteCompany from '../GuestRoutesCompany'
import ProtectedRoutes from '../ProtectedRoutes'
import ProtectedRoutesCompany from '../ProtectedRoutesCompany'

import paths from '../paths'
import JudicialBinnacleList from 'pages/Company/Judicial/JudicialBinnacleList'
import JudicialBinnacle from 'pages/Company/Judicial/JudicialBinnacle'
import JudicialBinTypeBinnacle from 'pages/Company/Judicial/JudicialBinTypeBinnacle'
import JudicialBinProceduralStage from 'pages/Company/Judicial/JudicialBinProceduralStage'
import JudicialFileCaseProcessStatus from 'pages/Company/Judicial/JudicialFileCaseProcessStatus'
import JudicialFileCaseRelatedProcess from 'pages/Company/Judicial/JudicialFileCaseRelatedProcess'
import JudicialFileCaseRelatedProcessList from 'pages/Company/Judicial/JudicialFileCaseRelatedProcessesList'

import ScheduledNotifications from 'pages/Company/Settings/ScheduledNotifications/SheduledNotifications'
import CompareExcel from 'pages/Company/Settings/CompareExcel'
import Department from 'pages/Company/Settings/Department'
import District from 'pages/Company/Settings/District'
import Province from 'pages/Company/Settings/Province'
import JudicialUseOfProperty from 'pages/Company/Judicial/JudicialUseOfProperty'
import JudicialRegistrationArea from 'pages/Company/Judicial/JudicialRegistrationArea'
import JudicialRegisterOffice from 'pages/Company/Judicial/JudicialRegisterOffice'
import JudicialNotary from 'pages/Company/Judicial/JudcialNotary/JudicialNotary'
import JudicialCollateral from 'pages/Company/Judicial/JudicialCollateral/JudicialCollateral'
import JudicialCollateralList from 'pages/Company/Judicial/JudicialCollateralList'
import JudicialCollateralChargesEncumbrancesTypeLoad from 'pages/Company/Judicial/JudicialCollateralChargesEncumbrancesTypeLoad'
import JudicialCollateralChargesEncumbrances from 'pages/Company/Judicial/JudicialCollateralChargesEncumbrances'
import JudicialCollateralFiles from 'pages/Company/Judicial/JudicialCollateralFiles'
import JudicialCollateralAuctionList from 'pages/Company/Judicial/JudicialCollateralAuctionRoundList'
import JudicialCollateralAuctionRound from 'pages/Company/Judicial/JudicialCollateralAuctionRound'
import JudicialFileCaseAuctionRoundList from 'pages/Company/Judicial/JudicialFileCaseAuctionRoundList'
import Tariff from 'pages/Company/Settings/Tariff'
import JudicialBinNotificationList from 'pages/Company/Judicial/JudicialBinNotificationList'


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
        {/* COMPANY */}
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
        <Route path={paths.cobranza.tipoDirecciones()} element={<ExtrajudicialAddressType />} />
        <Route path={paths.cobranza.tipoContactos()} element={<ExtrajudicialContactType />} />
        <Route path={paths.cobranza.nombreProductos()} element={<ExtrajudicialProductName />} />

        {/* JUDICIAL */}
        <Route path={paths.judicial.viaProcedimental()} element={<JudicialProceduralWay />} />
        <Route path={paths.judicial.juzgados()} element={<JudicialCourt />} />
        <Route path={paths.judicial.expedientes()} element={<JudicialFileCasesList />} />
        <Route path={paths.judicial.materias()} element={<JudicialSubject />} />
        <Route path={paths.judicial.detallesExpediente()} element={<JudicialFileCase />} />
        <Route path={paths.judicial.productosDemandados()} element={<JudicialFileCaseDemandedProducts />} />
        <Route path={paths.judicial.processStatus()} element={<JudicialFileCaseProcessStatus />} />
        <Route path={paths.judicial.bitacora()} element={<JudicialBinnacleList />} />
        <Route path={paths.judicial.bitacoraDetalles()} element={<JudicialBinnacle />} />
        <Route path={paths.judicial.bitacoraProcesoConexo()} element={<JudicialBinnacleList />} />
        <Route path={paths.judicial.bitacoraDetallesRelatedProcess()} element={<JudicialBinnacle />} />
        <Route path={paths.judicial.bitacoraTipo()} element={<JudicialBinTypeBinnacle />} />
        <Route path={paths.judicial.bitacoraProceduralStage()} element={<JudicialBinProceduralStage />} />
        <Route path={paths.judicial.observacionTipo()} element={<JudicialObsType />} />
        <Route path={paths.judicial.observacion()} element={<JudicialObservation />} />
        <Route path={paths.judicial.processReason()} element={<JudicialProcessReason />} />
        <Route path={paths.judicial.sedes()} element={<JudicialSede />} />
        <Route path={paths.judicial.relatedProcess()} element={<JudicialFileCaseRelatedProcessList />} />
        <Route path={paths.judicial.detallesExpedienteRelatedProcess()} element={<JudicialFileCaseRelatedProcess />} />
        <Route path={paths.judicial.useOfProperty()} element={<JudicialUseOfProperty />} />
        <Route path={paths.judicial.registrationArea()} element={<JudicialRegistrationArea />} />
        <Route path={paths.judicial.registerOffice()} element={<JudicialRegisterOffice />} />
        <Route path={paths.judicial.notary()} element={<JudicialNotary />} />
        <Route path={paths.judicial.collateral()} element={<JudicialCollateralList />} /> 
        <Route path={paths.judicial.detailCollateral()} element={<JudicialCollateral />} /> 
        <Route path={paths.judicial.typeChargesEncumbrances()} element={<JudicialCollateralChargesEncumbrancesTypeLoad />} /> 
        <Route path={paths.judicial.chargesEncumbrances()} element={<JudicialCollateralChargesEncumbrances />} />  
        <Route path={paths.judicial.collateralFiles()} element={<JudicialCollateralFiles />} />
        <Route path={paths.judicial.collateralAuction()} element={<JudicialCollateralAuctionRound />} />
        <Route path={paths.judicial.collateralAuctionList()} element={<JudicialCollateralAuctionList />} />
        <Route path={paths.judicial.caseFileAuctionList()} element={<JudicialFileCaseAuctionRoundList />} />
        <Route path={paths.judicial.notificationsRelatedProcess()} element={<JudicialBinNotificationList />} />
        <Route path={paths.judicial.notifications()} element={<JudicialBinNotificationList />} />
        {/* SETTINGS */}
        <Route path={paths.settings.scheduldedNotifications()} element={<ScheduledNotifications />} />
        <Route path={paths.settings.compareExcel()} element={<CompareExcel />} />
        <Route path={paths.settings.department()} element={<Department />} />
        <Route path={paths.settings.district()} element={<District />} />
        <Route path={paths.settings.province()} element={<Province />} />
        <Route path={paths.settings.tariff()} element={<Tariff />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </AppSwitch>
  )
}

export default AppRouter
