import useModal from "@/hooks/useModal"

import UseOfPropertyModal from "../Modals/NotaryModal"
import Container from "@/ui/Container"
import Text from "@/ui/Text"
import Button from "@/ui/Button"

import { useLoloContext } from "@/contexts/LoloProvider"

const JudicalNotaryActions = () => {
  const { hideModal, showModal, visible } = useModal()
  const { 
    bank: {
      selectedBank: { idCHB: chb },
    },
   } = useLoloContext()
  return (
    <Container display="flex" justifyContent="space-between" alignItems="center" height="fit-content" width="100%" padding="20px">
      <Text.Body size="m" weight="bold" className="label__text">
        NOTARIA
      </Text.Body>
      <Button
        permission="P41-01"
        messageTooltip="Agregar Notaria"
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

export default JudicalNotaryActions