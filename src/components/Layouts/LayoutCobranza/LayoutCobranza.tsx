import styled, { css } from 'styled-components'
import Container from '@/ui/Container'

type LayoutCobranzaProps = {
  leftTopContent: React.ReactNode
  rightTopContent: React.ReactNode
  infoContent: React.ReactNode
  downContent: React.ReactNode
}

const LayoutCobranza: React.FC<LayoutCobranzaProps> = (props) => {
  const { leftTopContent, rightTopContent, infoContent, downContent } = props

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
        backgroundColor="#eff0f6ff"
      >
        {leftTopContent}
        {rightTopContent}
      </Container>

      <Container className="container__info" width="100%" height="calc(100% - 211px)" display="flex" overFlowY="auto">
        {infoContent}
      </Container>

      <Container
        className="container__down"
        width="100%"
        height="78px"
        padding="15px 40px"
        backgroundColor="#eff0f6ff"
        overFlowX="auto"
      >
        {downContent}
      </Container>
    </StyledContainer>
  )
}

export default LayoutCobranza

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
