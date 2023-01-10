/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import {
  getFile,
  postCreateFile,
} from "../../../../../shared/services/file.service";
import { FileType } from "../../../../../shared/types/file.type";
import Button from "../../../../../ui/Button";
import Container from "../../../../../ui/Container";
import InputFile from "../../../../../ui/inputs/InputFile";
import notification from "../../../../../ui/notification";

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

type CobranzaFileFormProps = {
  clientId: number;
};

const CobranzaFileForm: React.FC<CobranzaFileFormProps> = (props) => {
  const { clientId } = props;
  const [file, setFile] = useState<FileType>();

  const handleInputChange = async (e: ChangeEvent) => {
    if (e.target.files) {
      try {
        const formData = new FormData();
        if (e.target.files[0]) {
          formData.append("file", e.target.files[0]);
          const { data } = await postCreateFile(formData, clientId);
          console.log(data);
          notification({ type: "success", message: "Documento Creado" });
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
    "query-get-file",
    async () => {
      return await getFile(clientId);
    },
    {
      enabled: false,
      onSuccess: ({ data }) => {
        setFile(data);
      },
      onError: (error: any) => {},
    }
  );
  useEffect(() => {
    if (!!clientId) {
      refetch();
    }
    return () => {};
  }, [clientId]);

  return (
    <ContainerForm display="flex" flexDirection="row" width="100%">
      <Container width="80%">
        <InputFile filename={file?.originalName} onChange={handleInputChange} />
      </Container>
      {!!file && (
        <Container width="100%" padding="0 20px">
          <Button shape="round" display="default" trailingIcon="ri-eye-line" />
        </Container>
      )}
    </ContainerForm>
  );
};

export default CobranzaFileForm;

const ContainerForm = styled(Container)`
  flex-direction: row;
  flex-wrap: nowrap;
`;
