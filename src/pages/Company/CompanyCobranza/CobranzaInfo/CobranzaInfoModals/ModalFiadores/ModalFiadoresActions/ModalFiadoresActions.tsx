import { useFormContext } from "react-hook-form";
import { useMutation } from "react-query";
import { createGuarantor } from "../../../../../../../shared/services/guarantor.service";
import Button from "../../../../../../../ui/Button";
import Container from "../../../../../../../ui/Container";
import notification from "../../../../../../../ui/notification";
import { GuarantorFormType } from "../hookforms.interfaces";

const ModalFiadoresActions = () => {
  const { setValue, getValues, handleSubmit } =
    useFormContext<GuarantorFormType>();

  const { isLoading: loadingCreateGuarantor, mutate: createGuarantorMutate } =
    useMutation<any, Error>(
      async () => {
        const { id, guarantors, ...restClient } = getValues();
        return await createGuarantor(restClient);
      },
      {
        onSuccess: (data) => {
          setValue("id", data.data.id);
          setValue("guarantors", [...getValues("guarantors"), data.data]);
          onCleanFields();
          notification({ type: "success", message: "Fiador creado" });
        },
        onError: (error: any) => {
          notification({
            type: "error",
            message: error.response.data.message,
          });
        },
      }
    );

  const onCleanFields = () => {
    setValue("id", 0);
    setValue("name", "");
    setValue("phone", "");
    setValue("email", "");
    setValue("createdAt", undefined);
  };

  const onAddFiador = () => {
    handleSubmit(() => {
      createGuarantorMutate();
    })();
  };

  return (
    <Container
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap="20px"
    >
      <Button
        width="100px"
        shape="round"
        trailingIcon="ri-add-fill"
        onClick={onAddFiador}
        loading={loadingCreateGuarantor}
      />
      <Button width="100px" shape="round" trailingIcon="ri-edit-2-line" />
      <Button
        width="100px"
        shape="round"
        display="danger"
        trailingIcon="ri-close-line"
      />
      <Button
        width="100px"
        shape="round"
        display="warning"
        trailingIcon="ri-delete-bin-line"
        onClick={onCleanFields}
      />
    </Container>
  );
};

export default ModalFiadoresActions;
