import React, { Dispatch, useState } from 'react'
import useModal from '@/hooks/useModal'
import { FileType } from '@/types/extrajudicial/file.type'
import Container from '@/ui/Container'
import Modal from '@/ui/Modal'
import FileViewer from './FileViewer/FileViewer'
import ModalFileRow from './ModalFileRow'

type ModaFilesTableProps = {
  files: FileType[]
  setFiles: Dispatch<FileType[]>
  code: number
}

const ModalFilesTable: React.FC<ModaFilesTableProps> = (props) => {
  const { files, setFiles, code } = props
  const { visible: visibleModalFile, showModal: showModalFile, hideModal: hideModalFile } = useModal()
  const [fileSelected, setFileSelected] = useState<FileType>()
  return (
    <Container width="100%" display="flex" gap="0.2rem" flexDirection="column">
      {files.map((item) => {
        return (
          <ModalFileRow
            code={code}
            setFileSelected={setFileSelected}
            showModalFile={showModalFile}
            files={files}
            setFiles={setFiles}
            file={item}
            key={item.id + 'files'}
          />
        )
      })}
      <Modal
        id="modal-file-view"
        title={fileSelected?.originalName}
        visible={visibleModalFile}
        onClose={hideModalFile}
        contentOverflowY="auto"
      >
        <Container
          display="flex"
          flexDirection="column"
          position="relative"
          overFlowY="auto"
          height="100%"
          width="100%"
        >
          <FileViewer file={fileSelected}></FileViewer>
        </Container>
      </Modal>
    </Container>
  )
}

export default ModalFilesTable
