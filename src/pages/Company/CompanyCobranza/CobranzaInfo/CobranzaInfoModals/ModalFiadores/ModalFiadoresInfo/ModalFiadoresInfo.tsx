import { Controller, useFormContext } from "react-hook-form";
import { GuarantorType } from "../../../../../../../shared/types/guarantor.type";
import Container from "../../../../../../../ui/Container";
import TextAreaField from "../../../../../../../ui/fields/TextAreaField";

const ModalFiadoresInfo = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<GuarantorType>();

  return (
    <Container width="100%" display="flex" flexDirection="column" gap="10px">
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextAreaField
            width="100%"
            label="Nombre:"
            rows={1}
            value={field.value}
            onChange={field.onChange}
            hasError={!!errors.name}
          />
        )}
      />

      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <TextAreaField
            width="100%"
            label="Teléfono:"
            rows={1}
            value={field.value}
            onChange={field.onChange}
            hasError={!!errors.phone}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextAreaField
            width="100%"
            label="Correo:"
            rows={1}
            value={field.value}
            onChange={field.onChange}
            hasError={!!errors.email}
          />
        )}
      />
    </Container>
  );
};

export default ModalFiadoresInfo;
