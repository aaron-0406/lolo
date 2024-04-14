import styled, { css } from 'styled-components'
import Container from '@/ui/Container/Container'

type LayoutFileCaseProps = {
  actionsContent: React.ReactNode
  ownerContent: React.ReactNode
  infoContent: React.ReactNode
  modalsContent: React.ReactNode
}

const LayoutFileCase = (props: LayoutFileCaseProps) => {
  const { actionsContent, infoContent, modalsContent, ownerContent } = props

  return (
    <StyledContainer width="100%" height="100%" display="flex" flexDirection="column" overFlowX="auto">
      <Container className="container__top" width="100%" display="flex" flexDirection="row" gap="15px" padding="15px 0px">
        {actionsContent}
      </Container>

      <Container backgroundColor="#eff0f6ff" width="100%" display="flex">
        {ownerContent}
      </Container>
      <Container width="100%" display="flex">
        {infoContent}
      </Container>

      <Container
        className="container__down"
        width="100%"
        display="flex"
        alignItems="center"
        padding="10px 40px"
        backgroundColor="#eff0f6ff"
      >
        {modalsContent}
      </Container>
    </StyledContainer>
  )
}

export default LayoutFileCase

const StyledContainer = styled(Container)`
  ${({ theme }) => css`
    @media ${theme.device.mobile} {
      .container__top {
        flex-direction: column;
        justify-content: flex-end;
      }
    }

    @media ${theme.device.tabletS} {
      .container__top {
        flex-direction: row;
        height: 78px;
        gap: 30px;
      }
    }
  `}
`
