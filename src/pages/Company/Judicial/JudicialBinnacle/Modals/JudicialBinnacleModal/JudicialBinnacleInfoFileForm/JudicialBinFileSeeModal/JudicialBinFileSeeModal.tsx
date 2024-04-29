import { useLoloContext } from '@/contexts/LoloProvider'
import { getJudicialBinFileById } from '@/services/judicial/judicial-bin-file.service'
import { JudicialBinFileType } from '@/types/judicial/judicial-bin-file.type'
import Container from '@/ui/Container'
import Modal from '@/ui/Modal'
import { KEY_JUDICIAL_URL_BINNACLE_CODE_CACHE } from 'pages/Company/Judicial/JudicialBinnacle/JudicialBinnacleTable/utils/judicial-binnacle.cache'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import FileViewer from './FileViewer'

type JudicialBinFileSeeModalProps = {
  visible: boolean
  onClose: () => void
  idFile?: number
  clientCustomerHasBankId?: number
  clientCode: string
  judicialFileCaseId: number
}

const JudicialBinFileSeeModal = ({
  visible,
  onClose,
  idFile = 0,
  clientCustomerHasBankId = 0,
  clientCode,
  judicialFileCaseId,
}: JudicialBinFileSeeModalProps) => {
  const [fileSelected, setFileSelected] = useState<JudicialBinFileType>()
  const {
    client: { customer },
  } = useLoloContext()

  const { refetch: refetchViewFile } = useQuery(
    [KEY_JUDICIAL_URL_BINNACLE_CODE_CACHE, `FILE-${idFile}`],
    async () => {
      return await getJudicialBinFileById(
        Number(customer.id),
        clientCode,
        clientCustomerHasBankId,
        judicialFileCaseId,
        idFile
      )
    },
    {
      enabled: false,
      onSuccess: ({ data }) => {
        setFileSelected(data)
      },
    }
  )

  useEffect(() => {
    if (!!idFile) {
      refetchViewFile()
    }
  }, [idFile, refetchViewFile])

  return (
    <Modal
      id="modal-file-view"
      title={fileSelected?.originalName}
      visible={visible}
      onClose={onClose}
      contentOverflowY="auto"
      size="large"
    >
      <Container display="flex" flexDirection="column" position="relative" overFlowY="auto" height="100%" width="100%">
        <FileViewer file={fileSelected}></FileViewer>
      </Container>
    </Modal>
  )
}

export default JudicialBinFileSeeModal
