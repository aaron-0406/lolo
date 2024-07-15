import { useFiltersContext } from '@/contexts/FiltersProvider';
import { useLoloContext } from '@/contexts/LoloProvider';
import Button from '@/ui/Button';
import Container from '@/ui/Container';
import Modal from '@/ui/Modal'
import Text from '@/ui/Text';
import { useNavigate } from 'react-router-dom';
import paths from 'shared/routes/paths';

type Props = {
  clientCode: string;
  idBank: number;
  visible: boolean
  onClose: () => void
}

const RedirectToTransferClientModal = ({ visible, onClose, idBank, clientCode }: Props) => {
  const navigate = useNavigate()
  const {
    bank: {
      setSelectedBank
    },
    client: { customer },
  } = useLoloContext()

  const {
    clearAllFilters,
  } = useFiltersContext()

  const onChangeBank = (key: string) => {
    clearAllFilters()

    const customerBank = customer.customerBanks.find((customerBank) => String(customerBank.id) === key)

    setSelectedBank({
      idBank: key,
      idCHB: String(customerBank?.CUSTOMER_HAS_BANK.id),
    })
  }

  const onRedirectToTransferClient = () => {
    onChangeBank(String(idBank))
    navigate(`${paths.cobranza.cobranza(customer.urlIdentifier, clientCode)}`)
    onClose()
  }
  return (
    <Modal
      id="redirect-to-transfer-client-modal"
      visible={visible}
      onClose={onClose}
      clickOutsideToClose={onClose}
      title="Redirecionar al cliente"
      size='small'
      footer={
        <Container width="100%" display='flex' justifyContent='flex-end'>
          <Button
            label="Redirecionar"
            onClick={onRedirectToTransferClient}
            width="fit-content"
            trailingIcon="ri-arrow-right-line"
            color="primary"
          />
        </Container>
      }
    >
      <Container padding="10px" display='flex' flexDirection='column' gap="10px">
        <Text.Body size="m" weight='regular'>
          Este cliente se encuentra en otro banco.
        </Text.Body>
        <Text.Body size="m" weight='regular'>
          ¿Desea redireccionar al banco de este cliente?
        </Text.Body>
      </Container>
    </Modal>
  )
}

export default RedirectToTransferClientModal