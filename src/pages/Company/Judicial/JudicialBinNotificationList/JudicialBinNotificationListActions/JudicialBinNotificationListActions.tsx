import { useLoloContext } from "@/contexts/LoloProvider"
import Breadcrumbs from "@/ui/Breadcrumbs"
import { LinkType } from "@/ui/Breadcrumbs/Breadcrumbs.type"
import Container from "@/ui/Container"
import Text from "@/ui/Text"
import { useParams } from "react-router-dom"
import paths from "shared/routes/paths"

type JudicialBinNotificationListActionsProps = {
  clientName: string
}

const JudicialBinNotificationListActions = ( { clientName } : JudicialBinNotificationListActionsProps) => {
  const codeParams = useParams().code ?? ''
  const relatedProcessCodeParams = useParams().relatedProcessCode ?? ''
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

  const routersFileCaseRelatedProcess: LinkType[] = [
    {
      link: paths.judicial.expedientes(customer.urlIdentifier),
      name: 'Expedientes',
    },
    {
      link: paths.judicial.detallesExpediente(customer.urlIdentifier, codeParams),
      name: codeParams,
    },
    {
      link: paths.judicial.relatedProcess(customer.urlIdentifier, codeParams),
      name: 'Procesos Conexos',
    },
    {
      link: paths.judicial.detallesExpedienteRelatedProcess(customer.urlIdentifier, codeParams, relatedProcessCodeParams),
      name: relatedProcessCodeParams,
    },
    {
      link: paths.judicial.bitacoraProcesoConexo(customer.urlIdentifier, codeParams, relatedProcessCodeParams),
      name: 'Bitacora',
    },
    {
      link: paths.judicial.bitacoraDetallesRelatedProcess(customer.urlIdentifier, codeParams, relatedProcessCodeParams, binnacleCode),
      name: binnacleCode,
    },
    {
      link: paths.judicial.notificationsRelatedProcess(customer.urlIdentifier, codeParams, relatedProcessCodeParams, binnacleCode),
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
      <Container display="flex" flexDirection="column" gap="10px">
        <Breadcrumbs routes={relatedProcessCodeParams ? routersFileCaseRelatedProcess : routers} />
        <Container padding="10px" width="100%" margin="0px 0px 10px 0px" backgroundColor="#eff0f6ff">
          <Text.Body size="m" weight="bold">
            {clientName ?? '-'}
          </Text.Body>
        </Container>
      </Container>
    </Container>
  )
}

export default JudicialBinNotificationListActions