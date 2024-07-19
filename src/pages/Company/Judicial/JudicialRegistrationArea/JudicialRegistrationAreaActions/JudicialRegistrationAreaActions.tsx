import useModal from "@/hooks/useModal"

import RegistrationAreaModal from "../Modals/RegistrationAreaModal"
import Container from "@/ui/Container"
import Text from "@/ui/Text"
import Button from "@/ui/Button"

import { useLoloContext } from "@/contexts/LoloProvider"

const JudicalRegistrationArea = () => {
  const { hideModal, showModal, visible } = useModal()
  const { 
    bank: {
      selectedBank: { idCHB: chb },
    },
   } = useLoloContext()
  return (
    <Container display="flex" justifyContent="space-between" alignItems="center" height="fit-content" width="100%" padding="20px">
      <Text.Body size="m" weight="bold" className="label__text">
        ZONA REGISTRAL
      </Text.Body>
      <Button
        permission="P39-01"
        messageTooltip="Agregar zona registral"
        shape="round"
        size="small"
        leadingIcon="ri-add-line"
        onClick={showModal}
        disabled={!chb}
      />
      {visible ? <RegistrationAreaModal isOpen={visible} onClose={hideModal} /> : null}
    </Container>
  )
}

export default JudicalRegistrationArea