/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  getFiles,
  postCreateFile,
} from "../../../../../../shared/services/file.service";
import { FileType } from "../../../../../../shared/types/file.type";
import Container from "../../../../../../ui/Container";
import InputFile from "../../../../../../ui/inputs/InputFile";
import notification from "../../../../../../ui/notification";
import ModalFilesTable from "./ModalFilesTable";

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

type ModalFilesProps = {
  clientId: number;
};

const ModalFiles: React.FC<ModalFilesProps> = (props) => {
  const [files, setFiles] = useState<FileType[]>([]);
  const { clientId } = props;
  const handleInputChange = async (e: ChangeEvent) => {
    if (e.target.files) {
      try {
        const formData = new FormData();
        if (e.target.files.length > 0) {
          const archivos = e.target.files;
          for (let o = 0; o < archivos.length; o++) {
            const element = archivos[o];
            formData.append("file", element);
          }
          const { data } = await postCreateFile(formData, clientId);
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
  const { refetch } = useQuery(
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
      justifyContent="center"
      gap="3rem"
    >
      <Container
        backgroundColor={"#eff0f6ff"}
        width="100%"
        padding="1rem"
        overFlowY="auto"
        height={"37.5rem"}
      >
        <ModalFilesTable files={files} setFiles={setFiles} />
      </Container>
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
