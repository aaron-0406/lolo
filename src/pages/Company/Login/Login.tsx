import { Controller, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import LoginHeader from "../../../components/Login/LoginHeader";
import { StyledLoginContainer } from "../../../components/Login/LoginStyled";
import { useLoloContext } from "../../../shared/contexts/LoloProvider";
import { ResponseLogin, signin } from "../../../shared/services/auth.service";
import { LoginType } from "../../../shared/types/auth.type";
import storage from "../../../shared/utils/storage";
import Button from "../../../ui/Button";
import Container from "../../../ui/Container";
import TextField from "../../../ui/fields/TextField";
import Icon from "../../../ui/Icon";
import notification from "../../../ui/notification";
import { LoginResolver } from "./Login.yup";

const Login = () => {
  const {
    client: { customer },
    customerUser: { setUser },
    auth: { setAuthenticate },
  } = useLoloContext();

  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: LoginResolver,
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
      customerId: 0,
    },
  });

  const { mutate: loginQuery, isLoading } = useMutation<ResponseLogin, Error>(
    async (): Promise<ResponseLogin> => {
      notification({ type: "info", message: "Espere por favor..." });
      return await signin(getValues());
    },
    {
      onSuccess: ({ data }) => {
        storage.set("token", data.token);
        setUser(data.user);
        setAuthenticate(true);
        notification({ type: "success", message: "Bienvenido" });
      },
      onError: (error: any) => {
        setAuthenticate(false);
        notification({
          type: "error",
          message: error.response.data.message,
        });
      },
    }
  );
  const onLogin = () => {
    setValue("customerId", customer.id);
    handleSubmit(() => {
      loginQuery();
    })();
  };
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
            gap="30px"
          >
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  width="100%"
                  label="Email"
                  type="email"
                  value={field.value}
                  helperText={errors.email?.message}
                  hasError={!!errors.email}
                  onChange={field.onChange}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  width="100%"
                  label="Password"
                  type="password"
                  value={field.value}
                  helperText={errors.password?.message}
                  hasError={!!errors.password}
                  onChange={field.onChange}
                />
              )}
            />
          </Container>

          <Button
            onClick={onLogin}
            disabled={isLoading}
            loading={isLoading}
            width="100%"
            label="Continuar"
          />
        </Container>
      </Container>
    </StyledLoginContainer>
  );
};

export default Login;
