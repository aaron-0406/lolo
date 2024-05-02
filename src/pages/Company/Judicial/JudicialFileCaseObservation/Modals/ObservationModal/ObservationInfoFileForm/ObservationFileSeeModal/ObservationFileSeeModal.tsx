import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { getJudicialBinFileById } from '@/services/judicial/judicial-bin-file.service'
import { JudicialObsFileType } from '@/types/judicial/judicial-obs-file.type'
import Container from '@/ui/Container'
import Modal from '@/ui/Modal'
import FileViewer from './FileViewer'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { KEY_JUDICIAL_URL_OBSERVATION_CODE_CACHE } from 'pages/Company/Judicial/JudicialFileCaseObservation/FileCaseObservationTable/utils/judicial-observation.cache'
import { useLoloContext } from '@/contexts/LoloProvider'

type ObservationFileSeeModalProps = {
  visible: boolean
  onClose: () => void
  idFile?: number
  clientCustomerHasBankId?: number
  clientCode: string
  judicialFileCaseId: number
}

const ObservationFileSeeModal = ({
  visible,
  onClose,
  idFile = 0,
  clientCustomerHasBankId = 0,
  clientCode,
  judicialFileCaseId,
}: ObservationFileSeeModalProps) => {
  const {
    client: { customer },
  } = useLoloContext()

  const [fileSelected, setFileSelected] = useState<JudicialObsFileType>()

  const { refetch: refetchViewFile } = useQuery<AxiosResponse<JudicialObsFileType>, AxiosError<CustomErrorResponse>>(
    [KEY_JUDICIAL_URL_OBSERVATION_CODE_CACHE, `FILE-${idFile}`],
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
        <FileViewer file={fileSelected} />
      </Container>
    </Modal>
  )
}

export default ObservationFileSeeModal
