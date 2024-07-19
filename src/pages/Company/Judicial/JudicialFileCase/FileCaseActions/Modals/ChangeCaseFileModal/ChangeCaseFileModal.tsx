import { useLoloContext } from "@/contexts/LoloProvider"
import Button from "@/ui/Button"
import Container from "@/ui/Container"
import Modal from "@/ui/Modal"
import Text from "@/ui/Text"

type ChangeCaseFileModalProps = {
  isVisible: boolean
  onClose: () => void
  numberCaseFile?: string
  chbOfCaseFile?: number
  refetch: () => void; 
}

const ChangeCaseFileModal = ({ isVisible, onClose, numberCaseFile, chbOfCaseFile, refetch }: ChangeCaseFileModalProps) => {

  const {
    bank: { setSelectedBank },
    client: { customer },
  } = useLoloContext()

  const onChangeBank = () => {
    const customerBank = customer.customerBanks.find((customerBank) => String(customerBank.id) === String(chbOfCaseFile) ?? "")
    setSelectedBank({
      idBank: String(customerBank?.CUSTOMER_HAS_BANK.id),
      idCHB: String(customerBank?.CUSTOMER_HAS_BANK.id),
    })
    refetch()
    onClose()
  }
  return (
    <Modal
      id="change-case-file-modal"
      visible={isVisible}
      onClose={onClose}
      clickOutsideToClose={onClose}
      withPortal={true}
      size="small"
      title="Cambiar de banco"
      footer={
        <Container display="flex" justifyContent="end" gap="10px" width="100%">
          <Button onClick={onChangeBank} width="fit-content" label="Cambiar" shape="default" trailingIcon="ri-arrow-left-right-line" />
        </Container>
      }
    >
      <Container
        width="100%"
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        padding="10px"
        gap="10px"
      >
        <Text.Body weight="bold" size="m">
          ¿Desea cambiar de banco?
        </Text.Body>
        <Text.Body size="s" weight="regular">
          El expediente con el número {numberCaseFile} 
        </Text.Body>
        <Text.Body size="s" weight="regular">
          No se encuentra en este banco
        </Text.Body>
      </Container>
    </Modal>
  )
}

export default ChangeCaseFileModal