import useModal from "@/hooks/useModal"

import NotaryModal from "../Modals/JudicialChargesEncumbrancesModal"
import Container from "@/ui/Container"
import Button from "@/ui/Button"

import { useLoloContext } from "@/contexts/LoloProvider"
import { useParams } from "react-router-dom"

import { LinkType } from "@/ui/Breadcrumbs/Breadcrumbs.type"
import paths from "shared/routes/paths"
import Breadcrumbs from "@/ui/Breadcrumbs"
import { device } from "@/breakpoints/responsive"
import { useMediaQuery } from "@/hooks/useMediaQuery"


const JudicalNotaryActions = () => {
  const { hideModal, showModal, visible } = useModal()
  const { 
    bank: {
      selectedBank: { idCHB: chb },
    },
    client: { customer },
  } = useLoloContext()

  const code = useParams().code ?? ''
  const collateralCode = useParams().collateralCode ?? ''

  const greaterThanTabletL = useMediaQuery(device.tabletL)

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
      link: paths.judicial.chargesEncumbrances(customer.urlIdentifier, code, collateralCode),
      name: 'Cargas y gravámenes',
    }
  ]

  return (
    <Container
      display="flex"
      justifyContent="space-between"
      flexDirection={ greaterThanTabletL ? 'row' : 'column'}
      alignItems={ greaterThanTabletL ? 'center' : 'flex-start'}
      height="fit-content"
      width="100%"
      padding="20px 20px 10px 10px"
    >
      <Breadcrumbs routes={routers} />
      <Button
        permission="P41-01"
        messageTooltip="Agregar Carga y Gravamen"
        shape="round"
        size="small"
        leadingIcon="ri-add-line"
        onClick={showModal}
        disabled={!chb}
      />
      {hideModal ? <NotaryModal isOpen={visible} onClose={hideModal} /> : null}
    </Container>
  )
}

export default JudicalNotaryActions