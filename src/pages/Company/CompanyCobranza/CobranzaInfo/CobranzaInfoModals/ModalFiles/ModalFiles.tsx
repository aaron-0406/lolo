/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled, { css } from "styled-components";
import { useLoloContext } from "../../../../../../shared/contexts/LoloProvider";
import {
  getFiles,
  postCreateFile,
} from "../../../../../../shared/services/file.service";
import { FileType } from "../../../../../../shared/types/file.type";
import Container from "../../../../../../ui/Container";
import Icon from "../../../../../../ui/Icon";
import InputFile from "../../../../../../ui/inputs/InputFile";
import notification from "../../../../../../ui/notification";
import ModalFilesTable from "./ModalFilesTable";

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

type ModalFilesProps = {
  clientId: number;
  code: number;
};

const ModalFiles: React.FC<ModalFilesProps> = (props) => {
  const {
    bank: { selectedBank },
  } = useLoloContext();
  const [sendingFiles, setSendingFiles] = useState<boolean>(false);
  const [files, setFiles] = useState<FileType[]>([]);
  const { clientId, code } = props;
  const handleInputChange = async (e: ChangeEvent) => {
    if (e.target.files) {
      try {
        const formData = new FormData();
        if (e.target.files.length > 0) {
          const archivos = e.target.files;
          for (let i = 0; i < archivos.length; i += 1) {
            const element = archivos[i];
            formData.append("file", element);
          }
          setSendingFiles(true);
          const { data } = await postCreateFile(
            formData,
            clientId,
            code,
            Number(selectedBank.idBank)
          );
          setSendingFiles(false);
          setFiles([...files, ...data]);
          notification({ type: "success", message: "Documentos Creados" });
        }
      } catch (error: any) {
        notification({
          type: "info",
          message: error.response.data.message,
        });
      }
    }
  };
  const { refetch, isFetching } = useQuery(
    "query-get-files",
    async () => {
      return await getFiles(clientId);
    },
    {
      onSuccess: ({ data }) => {
        setFiles(data);
      },
    }
  );
  useEffect(() => {
    refetch();
    return () => {};
  }, []);

  return (
    <Container
      width="100%"
      height="100%"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      padding="0 0 2rem 0"
    >
      <ContainerTableFile
        backgroundColor={"#eff0f6ff"}
        width="100%"
        minHeight="90%"
        padding="1rem"
        overFlowY="auto"
        maxHeight="90%"
      >
        <ModalFilesTable code={code} files={files} setFiles={setFiles} />
        {(sendingFiles || isFetching) && (
          <Container
            backgroundColor="#eff0f6ff"
            width="100%"
            height="20%"
            display="flex"
            justifyContent="center"
            padding="2rem 0"
          >
            <StyledIcon remixClass="ri-loader-line"></StyledIcon>
          </Container>
        )}
      </ContainerTableFile>
      <Container
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        padding="0 3rem"
      >
        <InputFile multiple onChange={handleInputChange} />
      </Container>
    </Container>
  );
};

export default ModalFiles;

const StyledIcon = styled(Icon)`
  animation: rotate 2s linear infinite;
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ContainerTableFile = styled(Container)`
  ${({ theme }) =>
    css`
      border: 2px solid ${theme.colors.Neutral4};
      ::-webkit-scrollbar-thumb {
        background: ${theme.colors.Neutral5};
        border-radius: 10px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: ${theme.colors.Neutral4};
      }
      ::-webkit-scrollbar-track {
        background-color: transparent;
      }
      ::-webkit-scrollbar {
        width: 10px;
        background-color: transparent;
      }
    `}
`;
