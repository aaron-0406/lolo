import Container from "../../../ui/Container";
import CommentChart from "./CommentChart";
import ProfileInfo from "./ProfileInfo";

const CompanyProfile = () => {
  return (
    <Container
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      height="100%"
      width="100%"
      padding="10px"
    >
      <Container width="50%">
        <ProfileInfo />
      </Container>
      <Container width="50%"></Container>
      <Container width="50%"></Container>
      <Container
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="50%"
      >
        <CommentChart />
      </Container>
    </Container>
  );
};

export default CompanyProfile;
