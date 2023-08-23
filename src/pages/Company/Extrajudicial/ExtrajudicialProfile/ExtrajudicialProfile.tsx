import Container from '../../../../ui/Container'
import CommentChart from './CommentChart'
import ProfileInfo from './ProfileInfo'
import { device } from '../../../../shared/breakpoints/reponsive'
import { useMediaQuery } from '../../../../shared/hooks/useMediaQuery'
import styled from 'styled-components'
import GoalInfo from './GoalInfo'

const ExtrajudicialProfile = () => {
  const greaterThanTabletL = useMediaQuery(device.desktopS)

  return (
    <Container
      backgroundColor="#eff0f6ff"
      padding="15px"
      gap="15px"
      display="flex"
      width="100%"
      height="100%"
      flexWrap={greaterThanTabletL ? 'nowrap' : 'wrap'}
      overFlowY="auto"
    >
      <ProfileInfo />
      <Container
        minWidth={greaterThanTabletL ? 'calc(60% - 7.5px)' : '100%'}
        gap="15px"
        display="flex"
        flexDirection="column"
        backgroundColor="#F2F2F2"
      >
        <StyledContainer backgroundColor="#fff" padding="1rem">
          <GoalInfo />
        </StyledContainer>
        <StyledContainer backgroundColor="#fff" padding="1rem">
          <CommentChart />
        </StyledContainer>
      </Container>
    </Container>
  )
}

export default ExtrajudicialProfile

const StyledContainer = styled(Container)`
  border-radius: 5px;
`
