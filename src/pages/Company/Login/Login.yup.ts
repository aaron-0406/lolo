import { yupResolver } from "@hookform/resolvers/yup";
import { LoginType } from "../../../shared/types/auth.type";
import yup from "../../../shared/yupLocale";

const LoginSchema: yup.SchemaOf<LoginType> = yup.object().shape({
  email: yup
    .string()
    .email("No tiene un formato válido")
    .required("Esta campo es requerido"),
  password: yup.string().required("Este campo es requerido"),
  customerId: yup.number().required().min(1),
});

export const LoginResolver = yupResolver(LoginSchema);
