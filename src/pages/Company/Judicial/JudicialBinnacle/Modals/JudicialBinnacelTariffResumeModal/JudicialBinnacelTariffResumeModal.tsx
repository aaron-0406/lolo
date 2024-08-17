import Modal from '@/ui/Modal'
import JudicialBinnacelTariffResumeTable from './JudicialBinnacelTariffResumeTable'

type JudicialBinnacelTariffResumeModalProps = {
  visible: boolean
  onClose: () => void
  tariffHistory: string
}

const JudicialBinnacelTariffResumeModal = ({ visible, onClose, tariffHistory } : JudicialBinnacelTariffResumeModalProps) => {
  return (
    <Modal
      id="judicial-binnacle-tariff-modal"
      title="Cuadro de tarifas"
      visible={visible}
      onClose={onClose}
      clickOutsideToClose={onClose}
      size="large"
      contentOverflowY="auto"
      minHeight="140px"
    >
      <JudicialBinnacelTariffResumeTable tariffHistoryArray={tariffHistory} />
    </Modal>
  )
}

export default JudicialBinnacelTariffResumeModal