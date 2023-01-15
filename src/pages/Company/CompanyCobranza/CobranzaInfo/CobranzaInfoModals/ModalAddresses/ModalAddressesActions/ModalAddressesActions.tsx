import React from "react";
import { useFormContext } from "react-hook-form";
import { useMutation } from "react-query";
import {
  createDirection,
  deleteDirection,
  editDirection,
} from "../../../../../../../shared/services/direction.service";
import Button from "../../../../../../../ui/Button";
import Container from "../../../../../../../ui/Container";
import notification from "../../../../../../../ui/notification";
import { DirectionFormType } from "../hookforms.interfaces";

const ModalAddressesActions = () => {
  const { setValue, getValues, handleSubmit, watch } =
    useFormContext<DirectionFormType>();
  const { isLoading: loadingCreateDirection, mutate: createDirectionMutate } =
    useMutation<any, Error>(
      async () => {
        const { id, directions, ...restClient } = getValues();
        return await createDirection(restClient);
      },
      {
        onSuccess: (data) => {
          setValue("id", data.data.id);
          setValue("directions", [...getValues("directions"), data.data]);
          onCleanFields();
          notification({ type: "success", message: "Dirección creada" });
        },
        onError: (error: any) => {
          notification({
            type: "error",
            message: error.response.data.message,
          });
        },
      }
    );

  const { isLoading: loadingEditDirection, mutate: editDirectionMutate } =
    useMutation<any, Error>(
      async () => {
        const { id, directions, clientId, ...restClient } = getValues();
        return await editDirection(restClient, id);
      },
      {
        onSuccess: ({ data }) => {
          setValue("id", data.id);
          setValue("directions", [
            ...getValues("directions").map((item) => {
              if (item.id === Number(data.id)) return data;
              return item;
            }),
          ]);
          onCleanFields();
          notification({ type: "success", message: "Dirección editada" });
        },
        onError: (error: any) => {
          notification({
            type: "error",
            message: error.response.data.message,
          });
        },
      }
    );
  const { isLoading: loadingDeleteDirection, mutate: deleteDirectionMutate } =
    useMutation<any, Error>(
      async () => {
        const { id } = getValues();
        return await deleteDirection(id);
      },
      {
        onSuccess: ({ data }) => {
          setValue("directions", [
            ...getValues("directions").filter(
              (item) => item.id !== Number(data.id)
            ),
          ]);
          onCleanFields();
          notification({ type: "success", message: "Dirección eliminada" });
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
    setValue("direction", "");
    setValue("createdAt", undefined);
  };

  const onAddDirection = () => {
    handleSubmit(() => {
      createDirectionMutate();
    })();
  };
  const onEditDirection = () => {
    handleSubmit(() => {
      editDirectionMutate();
    })();
  };
  const onDeleteDirection = () => {
    handleSubmit(() => {
      deleteDirectionMutate();
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
        disabled={watch("id") !== 0}
        onClick={onAddDirection}
        loading={loadingCreateDirection}
      />
      <Button
        width="100px"
        shape="round"
        trailingIcon="ri-edit-2-line"
        disabled={watch("id") === 0}
        onClick={onEditDirection}
        loading={loadingEditDirection}
      />
      <Button
        width="100px"
        shape="round"
        disabled={watch("id") === 0}
        display="danger"
        trailingIcon="ri-close-line"
        onClick={onDeleteDirection}
        loading={loadingDeleteDirection}
      />
      <Button
        width="100px"
        shape="round"
        display="warning"
        trailingIcon="ri-brush-2-line"
        onClick={onCleanFields}
      />
    </Container>
  );
};

export default ModalAddressesActions;
