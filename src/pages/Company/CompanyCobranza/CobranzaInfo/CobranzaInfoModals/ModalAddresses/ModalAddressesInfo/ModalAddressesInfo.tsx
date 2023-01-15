import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { DirectionType } from "../../../../../../../shared/types/direction.type";
import Container from "../../../../../../../ui/Container";
import TextAreaField from "../../../../../../../ui/fields/TextAreaField";
import Label from "../../../../../../../ui/Label";

const ModalAddressesInfo = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<DirectionType>();

  return (
    <Container width="100%" display="flex" flexDirection="column" gap="10px">
      <Container width="100%" display="flex" gap="10px">
        <Label label="Dirección: " />
        <Controller
          name="direction"
          control={control}
          render={({ field }) => (
            <TextAreaField
              width="100%"
              rows={1}
              value={field.value}
              onChange={field.onChange}
              hasError={!!errors.direction}
            />
          )}
        />
      </Container>
    </Container>
  );
};

export default ModalAddressesInfo;
