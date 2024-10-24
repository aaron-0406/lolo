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
import RelatedProcessQrModal from './Modals/RelatedProcessScanQrModal/RelatedProcessSchanQrModal'
import useModal from '@/hooks/useModal'

type JudicialFileCasesActionsProps = {
  clientName: string
}

const FileCasesRelatedProcessActions: React.FC<JudicialFileCasesActionsProps> = ({ clientName }) => {
  const navigate = useNavigate()
  const codeParams = useParams().code ?? ''
  const {
    hideModal: hideScanQrModal,
    showModal: showScanQrModal,
    visible: isVisebleScanQrModal,
  } = useModal()
  const {
    client: { customer },
    bank: { selectedBank },
  } = useLoloContext()

  const handleClickCaseFileRelatedProcess = () => {
    navigate(`${paths.judicial.detallesExpedienteRelatedProcess(customer.urlIdentifier, codeParams, '000000000')}`)
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
      name: 'Procesos Conexos',
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
      <Container display="flex" flexDirection="column" gap="10px" width="100%">
        <Breadcrumbs routes={routers} />
        <Container
          display="flex"
          flexDirection="row"
          margin="0px 0px 10px 0px"
          width="100%"
          justifyContent="space-between"
          alignItems="center"
        >
          <Container padding="10px" width="fit-content" backgroundColor="#eff0f6ff">
            <Text.Body size="m" weight="bold">
              {clientName ?? '-'}
            </Text.Body>
          </Container>
          <Container width="fit-content" display="flex" justifyContent="space-between" alignItems="center" gap="10px">
            <Button
              width="100px"
              shape="round"
              trailingIcon="ri-qr-code-line"
              permission="P13-01"
              messageTooltip="Escanea código QR"
              disabled={!selectedBank.idBank}
              onClick={showScanQrModal}
            />
            <Button
              width="130px"
              shape={'round'}
              size={greaterThanTabletS ? 'default' : 'small'}
              trailingIcon="ri-add-fill"
              onClick={handleClickCaseFileRelatedProcess}
              permission="P13-01-05-01"
              messageTooltip="Agregar proceso conexo"
            />
          </Container>
        </Container>
      </Container>
      {isVisebleScanQrModal ? (
        <RelatedProcessQrModal isVisible={isVisebleScanQrModal} onClose={hideScanQrModal} />
      ) : null}
    </StyledContainer>
  )
}

export default FileCasesRelatedProcessActions

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
