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
    <StyledContainer width="100%" height="100%" display="flex" flexDirection="column">
      <Container
        className="container__top"
        width="100%"
        height="88px"
        display="flex"
        flexDirection="row"
        justifyContent="end"
        gap="15px"
        padding="20px"
        backgroundColor="#eff0f6ff"
      >
        {actionsContent}
      </Container>

      <Container
        className="container__info"
        width="100%"
        height="calc(100% - 170px)"
        display="flex"
        flexDirection="column"
        overFlowY="auto"
      >
        <Container backgroundColor="#d9dbe9ff" width="100%" display="flex">
          {ownerContent}
        </Container>
        <Container width="100%" display="flex">
          {infoContent}
        </Container>
      </Container>

      <Container
        className="container__down"
        width="100%"
        height="78px"
        padding="15px 40px"
        backgroundColor="#eff0f6ff"
        overFlowX="auto"
      >
        {modalsContent}
      </Container>
    </StyledContainer>
  )
}

export default LayoutFileCase

const StyledContainer = styled(Container)`
  ${({ theme }) => css`
    .container__top {
      padding-right: 60px !important;
    }

    @media ${theme.device.tabletS} {
      .container__top {
        flex-direction: row;
        gap: 30px;
      }

      .container__info {
        height: calc(100% - 156px);
      }
    }
  `}
`
