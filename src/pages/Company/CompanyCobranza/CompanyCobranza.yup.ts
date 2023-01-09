import { yupResolver } from "@hookform/resolvers/yup";
import { ClientType } from "../../../shared/types/client.type";
import { CommentType } from "../../../shared/types/comment.type";
import yup from "../../../shared/yupLocale";

const CompanyCobranzaSchema: yup.SchemaOf<
  Omit<ClientType, "id" | "createdAt">
> = yup.object().shape({
  code: yup.string().required().min(2).max(50),
  state: yup.string().required(),
  dniOrRuc: yup.string().optional().max(20),
  name: yup.string().required().min(5).max(200),
  salePerimeter: yup.string().optional(),
  phone: yup.string().optional(),
  email: yup.string().optional(),
  cityId: yup.number().required().min(1),
  funcionarioId: yup.number().required().min(1),
  customerUserId: yup.number().required().min(1),
  customerHasBankId: yup.number().required().min(1),
});

const CompanyCobranzaCommentSchema: yup.SchemaOf<Omit<CommentType, "id">> = yup
  .object()
  .shape({
    clientId: yup.number().min(1).required(),
    customerUserId: yup.number().min(1).required(),
    comment: yup.string().required(),
    date: yup.string().required(),
    negotiation: yup.string().required(),
  });

export const CompanyCobranzaResolver = yupResolver(CompanyCobranzaSchema);
export const CompanyCobranzaCommentResolver = yupResolver(
  CompanyCobranzaCommentSchema
);
