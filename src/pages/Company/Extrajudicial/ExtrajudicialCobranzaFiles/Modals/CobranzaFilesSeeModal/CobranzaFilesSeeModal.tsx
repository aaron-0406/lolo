import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { FileType } from '@/types/extrajudicial/file.type'
import Container from '@/ui/Container'
import Modal from '@/ui/Modal'
import { useLoloContext } from '@/contexts/LoloProvider'
import { getFileById } from '@/services/extrajudicial/file.service'
import { KEY_COBRANZA_URL_FILES_CODE_CACHE } from '../../CobranzaFilesTable/utils/company-files.cache'
import FileViewer from '../../CobranzaFilesTable/FileViewer/FileViewer'

type CobranzaFilesSeeModalProps = {
  visible: boolean
  onClose: () => void
  idFile?: number
  clientCode?: number
}

const CobranzaFilesSeeModal = ({ visible, onClose, idFile = 0, clientCode = 0 }: CobranzaFilesSeeModalProps) => {
  const [fileSelected, setFileSelected] = useState<FileType>()

  const {
    client: { customer },
    bank: { selectedBank },
  } = useLoloContext()

  const { refetch: refetchViewFile } = useQuery(
    [KEY_COBRANZA_URL_FILES_CODE_CACHE, `FILE-${idFile}`],
    async () => {
      return await getFileById(Number(customer.id), Number(selectedBank.idCHB), clientCode, idFile)
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

export default CobranzaFilesSeeModal
