/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import DocViewer, { DocViewerRenderers, IDocument } from '@cyntler/react-doc-viewer'

import styled from 'styled-components'
import Container from '@/ui/Container'
import Button from '@/ui/Button'
import { DOMAIN } from 'shared/utils/constant/api'
import { JudicialObsFileType } from '@/types/judicial/judicial-obs-file.type'

type FileViewerProps = {
  file?: JudicialObsFileType
}

const FileViewer: React.FC<FileViewerProps> = ({ file }: FileViewerProps) => {
  const [docs, setDocs] = useState<IDocument[]>([])

  const loadFileData = () => {
    if (!file) return
    setTimeout(() => {
      setDocs([{ uri: `${DOMAIN}/download/${file.awsName}`, fileName: file.originalName }])
    }, 2000)
  }

  useEffect(() => {
    loadFileData()
  }, [file])

  return (
    <>
      {file?.awsName.endsWith('.pdf') ||
      file?.awsName.endsWith('.jpeg') ||
      file?.awsName.endsWith('.jpg') ||
      file?.awsName.endsWith('.png') ? (
        <DocViewer
          className="doc-viewer"
          documents={docs}
          pluginRenderers={DocViewerRenderers}
          config={{
            header: { disableHeader: true },
          }}
        />
      ) : (
        <StyledContainerButton width="100%" display="flex" justifyContent="center" alignItems="center">
          <a rel="noreferrer" download={file?.originalName} target="_blank" href={docs[0]?.uri}>
            <Button label="Descargar Archivo" trailingIcon="ri-download-cloud-fill" />
          </a>
        </StyledContainerButton>
      )}
    </>
  )
}

export default FileViewer
const StyledContainerButton = styled(Container)`
  height: calc(100vh - 49px);
`
