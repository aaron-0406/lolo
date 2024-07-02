import Modal from '@/ui/Modal'
import FileViewer from '../../FileViewer'
import { JudicialCollateralFilesType } from '@/types/judicial/judicial-collateral-files.type'
import { KEY_JUDICIAL_COLLATERAL_FILES_CACHE } from '../../utils/judicial-collateral-files.cache'
import { useQuery } from 'react-query'
import { AxiosResponse } from 'axios'
import { getJudicialCollateralFilesById } from '@/services/judicial/judicial-collateral-files.service'
import { useLoloContext } from '@/contexts/LoloProvider'
import { useParams } from 'react-router-dom'
import notification from '@/ui/notification'
import { useEffect } from 'react'

type Props = {
  isOpen: boolean
  onClose: () => void
  file: JudicialCollateralFilesType | undefined 
}

const JudicialFileViewerModal = ({ isOpen, onClose, file }: Props) => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    }
  } = useLoloContext()

  const collateralId = useParams().collateralCode ?? ''

  const { data, refetch, isLoading } = useQuery<AxiosResponse<JudicialCollateralFilesType>>(
    [`${KEY_JUDICIAL_COLLATERAL_FILES_CACHE}-GET-BY-ID`, chb],
    async () => {
      return await getJudicialCollateralFilesById(Number(chb), Number(collateralId), file?.id ?? 0)
    },
    {
      onError: (error: any) => {
        notification({
          type: 'error',
          message: error.response?.data.message,
        })
      },
    }
  )

  useEffect(()=>{
    if (file) refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[file])

  return (
    <Modal
      id="judicial-file-viewer-modal"
      title="Judicial File Viewer"
      size="medium"
      contentOverflowY="auto"
      onClose={onClose}
      minHeight="50vh"
      visible={isOpen}
    >
      <FileViewer file={data?.data} loading = {isLoading} />
    </Modal>
  )
}

export default JudicialFileViewerModal