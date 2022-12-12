import LoginHeader from "../../../components/Login/LoginHeader";
import { StyledLoginContainer } from "../../../components/Login/LoginStyled";
import Button from "../../../ui/Button";
import Container from "../../../ui/Container";
import TextField from "../../../ui/fields/TextField";
import Icon from "../../../ui/Icon";

const Login = () => {
  return (
    <StyledLoginContainer
      width="100%"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Container className="login__container" width="100%" height="100%">
        <LoginHeader title="Iniciar sesión" />

        <Container
          width="100%"
          height="calc(100% - 56px)"
          display="flex"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
          gap="52px"
          padding="23px"
        >
          <Icon remixClass="ri-user-line" size={120} color="Primary5" />

          <Container
            width="100%"
            display="flex"
            flexDirection="column"
            gap="10px"
          >
            <TextField width="100%" label="Email" type="email" />
            <TextField width="100%" label="Password" type="password" />
          </Container>

          <Button width="100%" label="Continuar" />
        </Container>
      </Container>
    </StyledLoginContainer>
  );
};

export default Login;
