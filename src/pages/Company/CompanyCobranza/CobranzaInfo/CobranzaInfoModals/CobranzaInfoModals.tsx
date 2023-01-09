import { useFormContext } from "react-hook-form";
import useModal from "../../../../../shared/hooks/useModal";
import { ClientType } from "../../../../../shared/types/client.type";
import Button from "../../../../../ui/Button";
import Container from "../../../../../ui/Container";
import Modal from "../../../../../ui/Modal";

const CobranzaInfoModals = () => {
  const { getValues } = useFormContext<ClientType>();
  const { visible, showModal, hideModal } = useModal();

  return (
    <div className="fields-wrapper-container-t">
      <Button
        width="100%"
        label="Fiadores"
        trailingIcon="ri-archive-drawer-line"
        disabled={!getValues("id")}
        onClick={showModal}
      />
      <Button
        width="100%"
        label="Direcciones"
        trailingIcon="ri-archive-drawer-line"
        disabled={!getValues("id")}
      />

      <Modal
        id="modal-fiadores"
        title="Fiadores"
        visible={visible}
        onClose={hideModal}
      >
        <Container
          display="flex"
          flexDirection="column"
          position="relative"
          overFlowY="auto"
          height="100%"
          width="100%"
        ></Container>
      </Modal>
    </div>
  );
};

export default CobranzaInfoModals;
