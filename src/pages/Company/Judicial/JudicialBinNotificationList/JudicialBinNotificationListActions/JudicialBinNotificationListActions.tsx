import { useLoloContext } from "@/contexts/LoloProvider"
import Breadcrumbs from "@/ui/Breadcrumbs"
import { LinkType } from "@/ui/Breadcrumbs/Breadcrumbs.type"
import Container from "@/ui/Container"
import { useParams } from "react-router-dom"
import paths from "shared/routes/paths"

const JudicialBinNotificationListActions = () => {
  const codeParams = useParams().code ?? ''
  const binnacleCode = useParams().binnacleCode ?? ''
  const {
    client: { customer },
  } = useLoloContext()

  const routers: LinkType[] = [
    {
      link: paths.judicial.expedientes(customer.urlIdentifier),
      name: 'Expedientes',
    },
    {
      link: paths.judicial.detallesExpediente(customer.urlIdentifier, codeParams),
      name: codeParams,
    },
    {
      link: paths.judicial.bitacora(customer.urlIdentifier, codeParams),
      name: 'Bitacora',
    },
    {
      link: paths.judicial.bitacoraDetalles(customer.urlIdentifier, codeParams, binnacleCode),
      name: binnacleCode,
    },
    {
      link: paths.judicial.notifications(customer.urlIdentifier, codeParams, binnacleCode),
      name: 'Notificaciones',
    }
  ]

  return (
    <Container
      width="100%"
      display="flex"
      justifyContent="space-between"
      alignItems="start"
      gap="10px"
      padding="10px 20px 10px 20px"
      flexDirection="column"
    >
      <Breadcrumbs routes={routers} />
      
    </Container>
  )
}

export default JudicialBinNotificationListActions