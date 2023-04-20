import Container from "../../../ui/Container";
import CommentChart from "./CommentChart";
import ProfileInfo from "./ProfileInfo";
import { device } from "../../../shared/breakpoints/reponsive";
import { useMediaQuery } from "../../../shared/hooks/useMediaQuery";
import styled, { css } from "styled-components";

const CompanyProfile = () => {

  const greaterThanTabletL = useMediaQuery(device.desktopS);

  return (
    <StyledCompanyProfile height="100%" width="100%">
      <Container className={`main_container ${!greaterThanTabletL && "main_container_tablet"}`}>
        <Container className={`side_bar ${!greaterThanTabletL && "side_bar_tablet"}`}>
          <ProfileInfo />
        </Container>
        <Container className={`body_area ${!greaterThanTabletL && "body_area_tablet"}`}>
          <CommentChart />
        </Container>
      </Container>
    </StyledCompanyProfile>
  );
};

export default CompanyProfile;

const StyledCompanyProfile = styled(Container)`
  ${({ theme }) => css`
    .main_container{
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      height: 100%;
      width: 100%;

      .side_bar{
        display:flex;
        width: 30%;
        height: 100%;
        text-align: center;
        align-items: center;
        justify-content: center;
        background-color:#e5e7eb;
      }

      .body_area{
        display: flex;
        width: 66%;
        margin: auto 2% auto 2%;
        height: 100%;
        justify-content: center;
        align-items: center;
      }
    }

    .main_container_tablet{
      flex-direction: column;

      .side_bar_tablet{
        width: 100%;
        height: 37%;
      }

      .body_area_tablet{
        margin: auto 5% auto 5%;
        width: 90%;
        height: 57%;
      }
    }
  `}
`;
