import useModal from "@/hooks/useModal"

import JudicialCollateralChargesEncumbrancesTypeLoadModal from "../Modals/JudicialCollateralChargesEncumbrancesTypeLoadModal"
import Container from "@/ui/Container"
import Text from "@/ui/Text"
import Button from "@/ui/Button"

import { useLoloContext } from "@/contexts/LoloProvider"

const JudicialCollateralChargesEncumbrancesTypeLoadActions = () => {
  const { hideModal, showModal, visible } = useModal()
  const { 
    bank: {
      selectedBank: { idCHB: chb },
    },
   } = useLoloContext()
  return (
    <Container display="flex" justifyContent="space-between" alignItems="center" height="fit-content" width="100%" padding="20px">
      <Text.Body size="m" weight="bold" className="label__text">
        Tipos de cargas y gravámenes
      </Text.Body>
      <Button
        permission="P41-01"
        messageTooltip="Agregar Tipo de carga y gravámenes"
        shape="round"
        size="small"
        leadingIcon="ri-add-line"
        onClick={showModal}
        disabled={!chb}
      />
      {hideModal ? <JudicialCollateralChargesEncumbrancesTypeLoadModal isOpen={visible} onClose={hideModal} /> : null}
    </Container>
  )
}

export default JudicialCollateralChargesEncumbrancesTypeLoadActions