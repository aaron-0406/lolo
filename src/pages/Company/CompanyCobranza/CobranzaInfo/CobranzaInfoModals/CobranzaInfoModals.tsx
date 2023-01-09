import { useFormContext } from "react-hook-form";
import useModal from "../../../../../shared/hooks/useModal";
import { ClientType } from "../../../../../shared/types/client.type";
import Button from "../../../../../ui/Button";
import Container from "../../../../../ui/Container";
import Modal from "../../../../../ui/Modal";

const CobranzaInfoModals = () => {
  const { getValues } = useFormContext<ClientType>();
  const {
    visible: visibleModalFiadores,
    showModal: showModalFiadores,
    hideModal: hideModalFiadores,
  } = useModal();
  const {
    visible: visibleModalAddresses,
    showModal: showModalAddresses,
    hideModal: hideModalAddresses,
  } = useModal();

  return (
    <div className="fields-wrapper-container-t">
      <Button
        width="100%"
        label="Fiadores"
        trailingIcon="ri-archive-drawer-line"
        disabled={!getValues("id")}
        onClick={showModalFiadores}
      />
      <Button
        width="100%"
        label="Direcciones"
        trailingIcon="ri-archive-drawer-line"
        disabled={!getValues("id")}
        onClick={showModalAddresses}
      />

      <Modal
        id="modal-fiadores"
        title="Fiadores"
        visible={visibleModalFiadores}
        onClose={hideModalFiadores}
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

      <Modal
        id="modal-addresses"
        title="Direcciones"
        visible={visibleModalAddresses}
        onClose={hideModalAddresses}
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
