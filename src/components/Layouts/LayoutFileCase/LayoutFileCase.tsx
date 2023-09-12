import Container from '@/ui/Container/Container'
import styled, { css } from 'styled-components'

type LayoutFileCaseProps = {
  searchContent: React.ReactNode
  actionsContent: React.ReactNode
  ownerContent: React.ReactNode
  infoContent: React.ReactNode
  modalsContent: React.ReactNode
}

const LayoutFileCase = (props: LayoutFileCaseProps) => {
  const { actionsContent, infoContent, modalsContent, ownerContent, searchContent } = props
  return (
    <StyledContainer width="100%" height="100%" display="flex" flexDirection="column">
      <Container
        className="container__top"
        width="100%"
        height="133px"
        display="flex"
        flexDirection="row"
        gap="15px"
        padding="15px 40px"
      >
        {searchContent}
        {actionsContent}
      </Container>

      <Container backgroundColor="#eff0f6ff" width="100%" height="200px" display="flex" overFlowY="auto">
        {ownerContent}
      </Container>
      <Container className="container__info" width="100%" height="calc(100% - 250px)" display="flex" overFlowY="auto">
        {infoContent}
      </Container>

      <Container
        className="container__down"
        width="100%"
        height="88px"
        display="flex"
        alignItems="center"
        padding="10px 40px"
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
    @media ${theme.device.mobile} {
      .container__top {
        flex-direction: column;
      }
    }

    @media ${theme.device.tabletS} {
      .container__top {
        flex-direction: row;
        height: 78px;
        gap: 30px;
      }

      .container__info {
        height: calc(100% - 156px);
      }
    }
  `}
`
