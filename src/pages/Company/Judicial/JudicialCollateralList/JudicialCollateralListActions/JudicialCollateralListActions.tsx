import React from 'react'
import paths from 'shared/routes/paths'
import styled, { css } from 'styled-components'

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
      link: '',
      name: 'Garantías',
    },
  ]

  return (
    <StyledContainer
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      padding="20px 20px 0 20px"
      gap="20px"
    >
      <Container display="flex" flexDirection="column" gap="10px">
        <Breadcrumbs routes={routers} />
        <Container padding="10px" width="100%" margin="0px 0px 10px 0px" backgroundColor="#eff0f6ff">
          <Text.Body size="m" weight="bold">
            {clientName ?? '-'}
          </Text.Body>
        </Container>
      </Container>

      <Container width="fit-content" display="flex" justifyContent="space-between" alignItems="center" gap="10px">
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
    </StyledContainer>
  )
}

export default FileCasesCollateralActions

const StyledContainer = styled(Container)`
  ${({ theme }) => css`
    .btn-excel {
      background-color: ${theme.colors.Success5};
      border: none;
    }
    @media ${theme.device.tabletS} {
      flex-direction: row;

      .actions__textfield .actions_select {
        width: 50%;
      }
    }

    @media ${theme.device.tabletL} {
      .actions__textfield {
        width: 60%;
      }

      .actions__select {
        width: 40%;
      }
    }

    @media ${theme.device.desktopS} {
      .actions__textfield {
        width: 70%;
      }

      .actions__select {
        width: 30%;
      }
    }
  `}
`
