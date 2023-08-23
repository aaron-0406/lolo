import styled, { css } from 'styled-components'
import { device } from '../../../shared/breakpoints/reponsive'
import { useMediaQuery } from '../../../shared/hooks/useMediaQuery'
import Container from '../../../ui/Container'

type LayoutCobranzaCommentsProps = {
  rightComments: React.ReactNode
}

const LayoutCobranzaComments: React.FC<LayoutCobranzaCommentsProps> = (props) => {
  const { rightComments } = props

//   const greaterThanTabletL = useMediaQuery(device.tabletL)

  return (
    <StyledContainer width="100%" height="100%" padding="15px" display="flex" gap="10px" flexDirection="column">
      {/* <Container className="container__top" width="100%" height="100%" display="flex" flexDirection="row" gap="30px">
        {leftHeader}

        {rightActions}
      </Container>

      <Container className="container__left" width="100%" height="85%" display="flex">
        {leftContent}
      </Container> */}

      <Container
        width="300px"
        className="container__right"
        backgroundColor="#eff0f6ff"
      >
        {rightComments}
      </Container>
    </StyledContainer>
  )
}

export default LayoutCobranzaComments

const StyledContainer = styled(Container)`
  ${({ theme }) => css`
    /* .container__right {
      border-radius: 8px;
      border: 1px solid ${theme.colors.Neutral4};
    } */
    /* @media ${theme.device.mobile} {
      .container__top {
        flex-direction: column;
        gap: 5px;
      }
    }
    @media ${theme.device.tabletS} {
      padding: 30px;
      .container__top {
        flex-direction: row;
      }
    }
    @media ${theme.device.tabletL} {
      .container__top {
        /* width: calc(100% - 300px);//700 */
      /* }
    } */

    @media ${theme.device.desktopS} {
       /* .container__top {
         width: calc(100% - 400px);//600 */
        gap: 10px;
      }  */
      
      .container__right {
        width: 400px;
      }
    }
  `}
`

