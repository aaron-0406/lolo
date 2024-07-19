import useModal from '@/hooks/useModal'

import CollateralFilesModal from '../Modals/CollateralFilesModal'
import Container from '@/ui/Container'
import Button from '@/ui/Button'

import { useLoloContext } from '@/contexts/LoloProvider'
import { LinkType } from '@/ui/Breadcrumbs/Breadcrumbs.type'
import paths from 'shared/routes/paths'
import { useLocation, useParams } from 'react-router-dom'
import Breadcrumbs from '@/ui/Breadcrumbs'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { device } from '@/breakpoints/responsive'
import Text from '@/ui/Text'
import { useFiltersContext } from '@/contexts/FiltersProvider'
import TextField from '@/ui/fields/TextField'

type JudicalNotaryActionsProps = {
  clientName: string
}

const JudicialCollateralFileActions = ({ clientName }: JudicalNotaryActionsProps) => {
  const { hideModal, showModal, visible } = useModal()
  const location = useLocation()
  const currentPath = location.pathname
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
    client: { customer },
  } = useLoloContext()
  const {
    filterSearch: { getSearchFilters, setSearchFilters },
  } = useFiltersContext()

  const searchFilter = getSearchFilters(currentPath)?.opts ?? { filter: '', limit: 50, page: 1 }
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
      name: 'Archivos',
    },
  ]

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchFilters({ url: currentPath, opts: { ...searchFilter, filter: value } })
  }

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
        <Breadcrumbs routes={routers} />
        <TextField
          onChange={onChangeSearch}
          width="100%"
          placeholder="Buscar con nombre del archivo"
          value={searchFilter.filter}
          clearInput
        />
        <Button
          permission="P13-01-06-01-03-01"
          messageTooltip="Agregar Archivos"
          shape="round"
          size="small"
          leadingIcon="ri-add-line"
          onClick={showModal}
          disabled={!chb}
        />
      </Container>

      {visible ? <CollateralFilesModal isOpen={visible} onClose={hideModal} /> : null}
    </Container>
  )
}

export default JudicialCollateralFileActions
