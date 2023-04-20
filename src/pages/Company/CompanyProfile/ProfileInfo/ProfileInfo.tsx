import ProfilePicture from "../../../../shared/assets/icons/ProfilePicture.png";
import { useLoloContext } from "../../../../shared/contexts/LoloProvider";
import { useMediaQuery } from "../../../../shared/hooks/useMediaQuery";
import { device } from "../../../../shared/breakpoints/reponsive";
import Container from "../../../../ui/Container";
import styled, { css } from "styled-components";
import Text from "../../../../ui/Text";
import Img from "../../../../ui/Img";

const ProfileInfo = () => {
  const {
    customerUser: { user },
  } = useLoloContext();

  const greaterThanDesktopS = useMediaQuery(device.desktopS);

  return (
    <StyledProfile width="100%" height="100%">
      <Container className={`main_container ${!greaterThanDesktopS && "main_container_tablet"}`}>
        <Container className={`nav_image ${!greaterThanDesktopS && "nav_image_tablet"}`}>
          <Img placeholderImage="" src={ProfilePicture}/>
        </Container>
        <Container className={`nav_information ${!greaterThanDesktopS && "nav_information_tablet"}`}>
          <Text.Body size="l" weight="bold">
            {`${user.name} ${user.lastName}`}
          </Text.Body>
          <Text.Body size="m" weight="regular">
            DNI: {user.dni}
          </Text.Body>
          <Text.Body size="m" weight="regular">
            Correo Electrónico: {user.email}
          </Text.Body>
          <Text.Body size="m" weight="regular">
            Teléfono: {user.phone}
          </Text.Body>
        </Container>
      </Container>
    </StyledProfile>
  );
};

export default ProfileInfo;


const StyledProfile = styled(Container)`
  ${({ theme }) => css`
    .main_container {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      height: 100%;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .nav_image {
        display: flex;
        width: 50%;
        text-align: center:
      }
      
      .nav_information {
        display: flex;
        width: 100%;
        flex-direction: column;
        justify-content: center;
      }
    }

    .main_container_tablet {
      flex-wrap: wrap;
      flex-direction: row;

      .nav_image_tablet {
        width: 29%;
        max-width: 208px;
        margin: auto 2% auto 2%;
      }

      .nav_information_tablet {
        width: 67%;
        overflow-wrap: break-word;
      }
    }

    @media ${theme.device.desktopS} {
      width: auto;
      height: auto;
    }
  `}
`;
