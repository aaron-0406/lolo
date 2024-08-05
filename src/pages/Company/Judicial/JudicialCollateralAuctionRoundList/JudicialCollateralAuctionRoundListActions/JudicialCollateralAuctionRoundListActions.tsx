import { device } from '@/breakpoints/responsive'
import { useLoloContext } from '@/contexts/LoloProvider'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import Breadcrumbs from '@/ui/Breadcrumbs'
import { LinkType } from '@/ui/Breadcrumbs/Breadcrumbs.type'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import Text from '@/ui/Text'
import { useNavigate, useParams } from 'react-router-dom'
import paths from 'shared/routes/paths'

type JudicialFileCasesCollateralActionsProps = {
  clientName: string
}

const JudicialCollateralAuctionRoundListActions = ({ clientName }: JudicialFileCasesCollateralActionsProps) => {
  const greaterThanTabletS = useMediaQuery(device.tabletS)
  const navigate = useNavigate()
  const codeParams = useParams().code ?? ''
  const collateralCode = useParams().collateralCode ?? ''
  const {
    client: { customer },
  } = useLoloContext()
  const handleClickCollateralAuction = () => {
    navigate(`${paths.judicial.collateralAuction(customer.urlIdentifier, codeParams, collateralCode, "00000000")}`)
  }
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
      link: paths.judicial.collateral(customer.urlIdentifier, codeParams),
      name: 'Garantías',
    },
    {
      link: paths.judicial.detailCollateral(customer.urlIdentifier, codeParams, collateralCode),
      name: collateralCode,
    },
    {
      link: paths.judicial.collateralAuctionList(customer.urlIdentifier, codeParams, collateralCode),
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
        <Button
          width="130px"
          shape={'round'}
          size={greaterThanTabletS ? 'default' : 'small'}
          trailingIcon="ri-add-fill"
          onClick={handleClickCollateralAuction}
          permission="P13-01-06-02"
          messageTooltip="Agregar una garantía"
        />
      </Container>
    </Container>
  )
}

export default JudicialCollateralAuctionRoundListActions