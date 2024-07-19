import React from 'react'
import paths from 'shared/routes/paths'

import { LinkType } from '@/ui/Breadcrumbs/Breadcrumbs.type'
import { device } from '@/breakpoints/responsive'

import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useLoloContext } from '@/contexts/LoloProvider'
import { useNavigate, useParams } from 'react-router-dom'

import Container from '@/ui/Container'
import Breadcrumbs from '@/ui/Breadcrumbs'
import Button from '@/ui/Button'
import Text from '@/ui/Text'

type JudicialFileCasesCollateralActionsProps = {
  clientName: string
}

const FileCasesCollateralActions: React.FC<JudicialFileCasesCollateralActionsProps> = ({ clientName }) => {
  const navigate = useNavigate()
  const codeParams = useParams().code ?? ''
  const {
    client: { customer },
  } = useLoloContext()

  const handleClickCaseFileCollateral = () => {
    navigate(`${paths.judicial.detailCollateral(customer.urlIdentifier, codeParams, '00000000')}`)
  }

  const greaterThanTabletS = useMediaQuery(device.tabletS)
  const greaterThanDesktopS = useMediaQuery(device.desktopS)

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
          width="130px"
          shape={'round'}
          size={greaterThanTabletS ? 'default' : 'small'}
          trailingIcon="ri-add-fill"
          onClick={handleClickCaseFileCollateral}
          permission="P13-01-06-02"
          messageTooltip="Agregar una garantía"
        />
      </Container>
    </Container>
  )
}

export default FileCasesCollateralActions
