import React, { ReactNode } from 'react'
import Container from '@/ui/Container'
import { device } from '../../../shared/breakpoints/reponsive'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import styled, { css } from 'styled-components'

type LayoutDocumenetProps = {
  firstChild: ReactNode
  actions: ReactNode
  info: ReactNode
  users: ReactNode
  doc: ReactNode
}

const LayoutDocuments: React.FC<LayoutDocumenetProps> = (props) => {
  const { info, doc, firstChild, actions, users } = props
  const greaterThanTabletL = useMediaQuery(device.tabletL)

  let firstContainerWidth = greaterThanTabletL ? '25%' : '100%'
  let secondContainerWidth = greaterThanTabletL ? '25%' : '100%'
  let thirdContainerWidth = greaterThanTabletL ? '50%' : '100%'

  return (
    <Container width="100%" height="100%" display="flex" flexDirection={greaterThanTabletL ? 'row' : 'column'}>
      <Container width={firstContainerWidth} height="100%">
        {firstChild}
      </Container>
      <Container
        width={secondContainerWidth}
        height="100%"
        display="flex"
        flexDirection="column"
        backgroundColor="#eff0f6ff"
      >
        {actions}
        {info}
        {users}
      </Container>
      <StyledContainerDoc
        width={thirdContainerWidth}
        display="flex"
        height="100%"
        justifyContent="center"
        backgroundColor="#eff0f6ff"
      >
        <StyledDocument>{doc}</StyledDocument>
      </StyledContainerDoc>
    </Container>
  )
}

export default LayoutDocuments

const StyledContainerDoc = styled(Container)`
  ${({ theme }) =>
    css`
      border: 2px solid ${theme.colors.Neutral4};
      ::-webkit-scrollbar-thumb {
        background: ${theme.colors.Neutral5};
        border-radius: 10px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: ${theme.colors.Neutral4};
      }
      ::-webkit-scrollbar-track {
        background-color: transparent;
      }
      ::-webkit-scrollbar {
        width: 10px;
        background-color: transparent;
      }
      /* border: 5px solid ${theme.colors.Neutral4}; */
      overflow-x: auto;
    `}
`

const StyledDocument = styled.div`
  width: 793px;
  height: 1122px;
  overflow-x: auto;
  overflow-y: hidden;
  background-color: #fff;
`
