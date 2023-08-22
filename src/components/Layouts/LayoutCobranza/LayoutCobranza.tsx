import styled, { css } from 'styled-components'
import { device } from '../../../shared/breakpoints/reponsive'
import { useMediaQuery } from '../../../shared/hooks/useMediaQuery'
import Container from '../../../ui/Container'

type LayoutCobranzaProps = {
  leftHeader: React.ReactNode
  rightActions: React.ReactNode
  leftContent: React.ReactNode
  buttonsContent : React.ReactNode
  // rightComments: React.ReactNode
}

const LayoutCobranza: React.FC<LayoutCobranzaProps> = (props) => {
  const { leftHeader, rightActions, leftContent, buttonsContent } = props

  const greaterThanTabletL = useMediaQuery(device.tabletL)

  return (
    <StyledContainer width="100%" height="100%" padding="20px" display="flex" flexDirection="column" >
      <Container className="container__top" width="100%" display="flex" flexDirection="row" gap="30px" padding="15px 0">
        {leftHeader}

        {rightActions}
      </Container>

      <Container className="container__left" width="100%" height="calc(100%-156px)" display="flex" overFlowY="auto">
        {leftContent}
      </Container>

      <Container className='container__buttons' width="100%" padding="15px 0" >
        {buttonsContent}
      </Container>


      {/* <Container
        width="300px"
        className={`container__right ${!greaterThanTabletL && 'hide-component'}`}
        backgroundColor="#eff0f6ff"
      >
        {rightComments}
      </Container> */}
    </StyledContainer>
  )
}

export default LayoutCobranza

const StyledContainer = styled(Container)`
  ${({ theme }) => css`
    /* .container__right {
      border-radius: 8px;
      border: 1px solid ${theme.colors.Neutral4};
    } */
    @media ${theme.device.mobile} {
      .container__top {
        flex-direction: column;
        gap: 5px;
      }
    }
    @media ${theme.device.tabletS} {
      padding: 20px;
      .container__top {
        flex-direction: row;
      }
    }
    @media ${theme.device.tabletL} {
      .container__top {
        /* width: calc(100% - 300px);//700 */
      }
    }

    @media ${theme.device.desktopS} {
      .container__top {
        /* width: calc(100% - 400px);//600 */
        gap: 10px;
      }
      /* 
      .container__right {
        width: 400px;
      } */
    }
  `}
`
