import useModal from "@/hooks/useModal"

import JudicialChargesEncumbrancesModal from "../Modals/JudicialChargesEncumbrancesModal"
import Container from "@/ui/Container"
import Button from "@/ui/Button"

import { useLoloContext } from "@/contexts/LoloProvider"
import { useParams } from "react-router-dom"

import { LinkType } from "@/ui/Breadcrumbs/Breadcrumbs.type"
import paths from "shared/routes/paths"
import Breadcrumbs from "@/ui/Breadcrumbs"
import { device } from "@/breakpoints/responsive"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import Text from "@/ui/Text"

type JudicalNotaryActionsProps = {
  clientName: string
}

const JudicalNotaryActions = ({ clientName } : JudicalNotaryActionsProps) => {
  const { hideModal, showModal, visible } = useModal()
  const { 
    bank: {
      selectedBank: { idCHB: chb },
    },
    client: { customer },
  } = useLoloContext()

  const code = useParams().code ?? ''
  const collateralCode = useParams().collateralCode ?? ''

  const greaterThanDesktopS = useMediaQuery(device.desktopS)
  const greaterThanTabletS = useMediaQuery(device.tabletS)

  const routers: LinkType[] = [
    {
      link: paths.judicial.expedientes(customer.urlIdentifier),
      name: 'Expedientes',
    },
    {
      link: paths.judicial.detallesExpediente(customer.urlIdentifier, code),
      name: code,
    },
    {
      link: paths.judicial.collateral(customer.urlIdentifier, code),
      name: 'Garantías',
    },
    {
      link: paths.judicial.detailCollateral(customer.urlIdentifier, code, collateralCode),
      name: collateralCode,
    },
    {
      link: '#',
      name: 'Cargas y gravámenes',
    }
  ]

  return (
    <Container
      width="100%"
      display="flex"
      justifyContent="space-between"
      gap="10px"
      padding="10px 20px 10px 20px"
      flexDirection="column"
    >
      <Container display="flex">
        <Breadcrumbs routes={routers} />
      </Container>
      <Container
        width="100%"
        display="flex"
        justifyContent="space-between"
        alignItems={greaterThanDesktopS ? 'center' : 'start'}
        gap="20px"
        flexDirection="row"
      >
        <Container
          padding="10px"
          width="100%"
          maxWidth={greaterThanTabletS ? '500px' : '250px'}
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          overFlowX="hidden"
          backgroundColor="#eff0f6ff"
        >
          <Text.Body size="m" weight="bold">
            {clientName ?? '-'}
          </Text.Body>
        </Container>
        <Button
          permission="P13-01-06-01-02-01"
          messageTooltip="Agregar Carga y Gravamen"
          shape="round"
          size="small"
          leadingIcon="ri-add-line"
          onClick={showModal}
          disabled={!chb}
        />
      </Container>
      {visible ? <JudicialChargesEncumbrancesModal isOpen={visible} onClose={hideModal} /> : null}
    </Container>
  )
}

export default JudicalNotaryActions