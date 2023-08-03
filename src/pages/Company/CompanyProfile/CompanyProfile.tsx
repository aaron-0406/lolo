import Container from '../../../ui/Container'
import CommentChart from './CommentChart'
import ProfileInfo from './ProfileInfo'
import { device } from '../../../shared/breakpoints/reponsive'
import { useMediaQuery } from '../../../shared/hooks/useMediaQuery'
import styled, { css } from 'styled-components'
import GoalInfo from './GoalInfo'

const CompanyProfile = () => {
  const greaterThanTabletL = useMediaQuery(device.desktopS)

  return (
    <StyledCompanyProfile height="100%" width="100%" overFlowY="auto">
      <Container className={`main_container ${!greaterThanTabletL && 'main_container_tablet'}`}>
        <Container className={`side_bar ${!greaterThanTabletL && 'side_bar_tablet'}`}>
          <ProfileInfo />
        </Container>
        <Container className={`body_area ${!greaterThanTabletL && 'body_area_tablet'}`}>
          <GoalInfo />
          <CommentChart />
        </Container>
      </Container>
    </StyledCompanyProfile>
  )
}

export default CompanyProfile

const StyledCompanyProfile = styled(Container)`
  ${() => css`
    .main_container {
      display: flex;
      flex-direction: row;
      /* flex-wrap: wrap; */
      height: 100%;
      width: 100%;

      .side_bar {
        display: flex;
        width: 30%;
        height: 100%;
        text-align: center;
        align-items: center;
        justify-content: center;
        background-color: #e5e7eb;
      }

      .body_area {
        display: flex;
        width: 70%;
        height: 100%;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
      }
    }

    .main_container_tablet {
      flex-direction: column;
      .side_bar_tablet {
        width: 100%;
        /* height: 37%; */
      }

      .body_area_tablet {
        width: 100%;
        /* height: calc(63% - 10px); */
      }
    }
  `}
`
