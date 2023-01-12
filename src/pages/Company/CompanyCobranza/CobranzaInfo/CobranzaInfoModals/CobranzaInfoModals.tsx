import { useFormContext } from "react-hook-form";
import useModal from "../../../../../shared/hooks/useModal";
import { ClientType } from "../../../../../shared/types/client.type";
import Button from "../../../../../ui/Button";
import Container from "../../../../../ui/Container";
import Modal from "../../../../../ui/Modal";
import ModalAddresses from "./ModalAddresses";
import ModalFiadores from "./ModalFiadores";
import ModalFiles from "./ModalFiles/ModalFiles";

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
  const {
    visible: visibleModalFiles,
    showModal: showModalFiles,
    hideModal: hideModalFiles,
  } = useModal();

  const clientId = getValues("id");
  const code = getValues("code");

  return (
    <div className="fields-wrapper-container-t">
      <Button
        width="100%"
        label="Archivos"
        trailingIcon="ri-archive-drawer-line"
        disabled={!clientId}
        onClick={showModalFiles}
      />
      <Button
        width="100%"
        label="Fiadores"
        trailingIcon="ri-archive-drawer-line"
        disabled={!clientId}
        onClick={showModalFiadores}
      />
      <Button
        width="100%"
        label="Direcciones"
        trailingIcon="ri-archive-drawer-line"
        disabled={!clientId}
        onClick={showModalAddresses}
      />

      <Modal
        id="modal-fiadores"
        title="Fiadores"
        visible={visibleModalFiadores}
        onClose={hideModalFiadores}
      >
        <ModalFiadores clientId={clientId} />
      </Modal>
      <Modal
        id="modal-files"
        title="Archivos"
        visible={visibleModalFiles}
        onClose={hideModalFiles}
        contentOverflowY="auto"
      >
        <ModalFiles clientId={clientId} code={Number(code)}/>
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
        >
          <ModalAddresses />
        </Container>
      </Modal>
    </div>
  );
};

export default CobranzaInfoModals;
