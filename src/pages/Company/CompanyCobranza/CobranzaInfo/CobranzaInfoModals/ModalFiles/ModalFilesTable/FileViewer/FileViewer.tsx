/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { FileType } from "../../../../../../../../shared/types/file.type";
import DocViewer, {
  DocViewerRenderers,
  IDocument,
} from "@cyntler/react-doc-viewer";

import { DOMAIN } from "../../../../../../../../shared/utils/constant/api";
import styled from "styled-components";
import Container from "../../../../../../../../ui/Container";
import Button from "../../../../../../../../ui/Button";

type FileViewerProps = {
  file?: FileType;
};

const FileViewer: React.FC<FileViewerProps> = (props) => {
  const { file } = props;
  const [docs, setDocs] = useState<IDocument[]>([]);
  const loadFileData = () => {
    if (!file) return;
    setTimeout(() => {
      setDocs([
        { uri: `${DOMAIN}/download/${file.name}`, fileName: file.originalName },
      ]);
    }, 2000);
  };
  useEffect(() => {
    loadFileData();
  }, [file]);

  return (
    <>
      {file?.name.endsWith(".pdf") ? (
        <DocViewer
          className="doc-viewer"
          documents={docs}
          pluginRenderers={DocViewerRenderers}
          config={{
            header: { disableHeader: true },
          }}
        />
      ) : (
        <StyledContainerButton
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <a
            rel="noreferrer"
            download={file?.originalName}
            target="_blank"
            href={docs[0]?.uri}
          >
            <Button
              label="Descargar Archivo"
              trailingIcon="ri-download-cloud-fill"
            />
          </a>
        </StyledContainerButton>
      )}
    </>
  );
};

export default FileViewer;
const StyledContainerButton = styled(Container)`
  height: calc(100vh - 49px);
`;
