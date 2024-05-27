import styled, { css } from 'styled-components'
import Container from '@/ui/Container'

type LayoutCobranzaProps = {
  rightTopContent: React.ReactNode
  infoContent: React.ReactNode
  downContent: React.ReactNode
}

const LayoutCobranza: React.FC<LayoutCobranzaProps> = (props) => {
  const { rightTopContent, infoContent, downContent } = props

  return (
    <StyledContainer width="100%" height="calc(100% - 50px)" display="flex" flexDirection="column">
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
        {rightTopContent}
      </Container>

      <Container className="container__info" width="100%" height="calc(100% - 170px)" display="flex" overFlowY="auto">
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
