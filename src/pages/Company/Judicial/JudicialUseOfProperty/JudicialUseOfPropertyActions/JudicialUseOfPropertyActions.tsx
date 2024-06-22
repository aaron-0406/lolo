import Button from "@/ui/Button"
import Container from "@/ui/Container"
import useModal from "@/hooks/useModal"
import UseOfPropertyModal from "../Modals/UseOfPropertyModal"
import { useLoloContext } from "@/contexts/LoloProvider"
import Text from "@/ui/Text"

const JudicialUseOfPropertyActions = () => {
  const { hideModal, showModal, visible } = useModal()
  const { 
    bank: {
      selectedBank: { idCHB: chb },
    },
   } = useLoloContext()
  return (
    <Container display="flex" justifyContent="space-between" alignItems="center" height="fit-content" width="100%" padding="20px">
      <Text.Body size="m" weight="bold" className="label__text">
        USO DE LA PROPIEDAD
      </Text.Body>
      <Button
        permission="P38-01"
        messageTooltip="Agregar uso de propiedad"
        shape="round"
        size="small"
        leadingIcon="ri-add-line"
        onClick={showModal}
        disabled={!chb}
      />
      {hideModal ? <UseOfPropertyModal isOpen={visible} onClose={hideModal} /> : null}
    </Container>
  )
}

export default JudicialUseOfPropertyActions