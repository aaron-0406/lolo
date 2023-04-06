import { useState } from "react";
import { device } from "../../../../../shared/breakpoints/reponsive";
import { useLoloContext } from "../../../../../shared/contexts/LoloProvider";
import { useMediaQuery } from "../../../../../shared/hooks/useMediaQuery";
import { postDashboardXslx } from "../../../../../shared/services/dashboard.service";
import Button from "../../../../../ui/Button";
import Container from "../../../../../ui/Container";
import InputFile from "../../../../../ui/inputs/InputFile";
import notification from "../../../../../ui/notification";
import { useFormContext } from "react-hook-form";
import { DashFormType } from "../hookform.type";
import Modal from "../../../../../ui/Modal";
import useModal from "../../../../../shared/hooks/useModal";
import ModalUsers from "./ModalUsers";

const Form = () => {
  const [file, setFile] = useState<File>();
  const [loading, setloading] = useState<boolean>(false);
  const { setValue } = useFormContext<DashFormType>();
  const greaterThanDesktopS = useMediaQuery(device.desktopS);

  const {
    client: {
      customer: { id },
    },
  } = useLoloContext();

  const {
    visible: visibleModalUsers,
    showModal: showModalUsers,
    hideModal: hideModalUsers,
  } = useModal();

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) setFile(e.target.files[0]);
  };

  const handleSubmitForm = async () => {
    if (!file) return;
    try {
      setloading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("customerId", String(id));
      const { data } = await postDashboardXslx(formData);
      notification({
        message: "Datos procesados correctamente",
        type: "success",
      });
      setloading(false);
      const {
        clientsAdded,
        clientsDeleted,
        productsAdded,
        productsCastigo,
        productsDeleted,
      } = data;
      setValue("clientsAdded", clientsAdded);
      setValue("clientsDeleted", clientsDeleted);
      setValue("productsAdded", productsAdded);
      setValue("productsDeleted", productsDeleted);
      setValue("productsCastigo", productsCastigo);
    } catch (error: any) {
      setloading(false);
      notification({
        message: error.message,
        type: "error",
      });
    }
  };

  return (
    <Container
      display="flex"
      padding="10px 0 0 0"
      justifyContent="center"
      alignItems="center"
      gap="20px"
    >
      <InputFile onChange={handleChangeInput}></InputFile>
      <Button
        onClick={handleSubmitForm}
        label={greaterThanDesktopS && "Enviar Archivo"}
        shape={greaterThanDesktopS ? "default" : "round"}
        leadingIcon="ri-send-plane-fill"
        loading={loading}
        disabled={loading}
      />
      <Button
        onClick={showModalUsers}
        label={greaterThanDesktopS && "Enviar Email"}
        shape={greaterThanDesktopS ? "default" : "round"}
        leadingIcon="ri-mail-send-line"
        loading={loading}
        disabled={loading}
      />
      <Modal
        id="modal-usuarios"
        title="Usuarios"
        visible={visibleModalUsers}
        onClose={hideModalUsers}
        contentOverflowY="auto"
      >
        <ModalUsers />
      </Modal>
    </Container>
  );
};

export default Form;
