import useModal from '@/hooks/useModal'

import NotaryModal from '../Modals/CollateralFilesModal'
import Container from '@/ui/Container'
import Button from '@/ui/Button'

import { useLoloContext } from '@/contexts/LoloProvider'
import { LinkType } from '@/ui/Breadcrumbs/Breadcrumbs.type'
import paths from 'shared/routes/paths'
import { useParams } from 'react-router-dom'
import Breadcrumbs from '@/ui/Breadcrumbs'

const JudicialCollateralFileActions = () => {
  const { hideModal, showModal, visible } = useModal()
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
    client: { customer },
  } = useLoloContext()
  const code = useParams().code ?? ''
  const collateralCode = useParams().collateralCode ?? ''

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
      name: 'Archivos',
    },
  ]

  return (
    <Container
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      height="fit-content"
      width="100%"
      padding="20px"
    >
      <Breadcrumbs routes={routers} />
      <Button
        permission="P13-01-06-01-03-01"
        messageTooltip="Agregar Archivos"
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

export default JudicialCollateralFileActions
