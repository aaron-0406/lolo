import { device } from "@/breakpoints/responsive"
import { useLoloContext } from "@/contexts/LoloProvider"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import Breadcrumbs from "@/ui/Breadcrumbs"
import { LinkType } from "@/ui/Breadcrumbs/Breadcrumbs.type"
import Container from "@/ui/Container"
import Text from "@/ui/Text"
import { useParams } from "react-router-dom"
import paths from 'shared/routes/paths';

type JudicialFileCaseAuctionRoundListActionsProps = {
  clientName: string
}

const JudicialFileCaseAuctionRoundListActions = ( { clientName }: JudicialFileCaseAuctionRoundListActionsProps ) => {
  const greaterThanTabletS = useMediaQuery(device.tabletS)
  const codeParams = useParams().code ?? ''
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
      link: '#',
      name: 'Rondas de remates',
    },
  ]
  return (
    <Container
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems={greaterThanTabletS ? 'start' : 'flex-start'}
      padding="10px 20px 10px 20px"
      gap="10px"
    >
      <Container display="flex" flexDirection="column" gap="10px">
        <Breadcrumbs routes={routers} />
      </Container>

      <Container width="100%" display="flex" justifyContent="space-between" alignItems="center" gap="10px">
        <Container padding="10px" width="fit-content" margin="0px 0px 0px 0px" backgroundColor="#eff0f6ff">
          <Text.Body size="m" weight="bold">
            {clientName ?? '-'}
          </Text.Body>
        </Container>
      </Container>
    </Container>
  )
}

export default JudicialFileCaseAuctionRoundListActions