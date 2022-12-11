import Button from "../../../ui/Button";
import Container from "../../../ui/Container";

const Home = () => {
  return (
    <Container width="400px" padding="20px">
      <Button width="100px" title="Button" hierarchy="primary" />
      <Button width="100px" title="Button" hierarchy="secondary" />
      <Button width="100px" title="Button" hierarchy="tertiary" />
    </Container>
  );
};

export default Home;
