import React, { Dispatch, ReactNode } from "react";
import styled, { css } from "styled-components";
import { FileType } from "../../../../../../../../shared/types/file.type";
import Container from "../../../../../../../../ui/Container";
import pdfIcon from "../../../../../../../../shared/assets/icons/pdf.png";
import wordIcon from "../../../../../../../../shared/assets/icons/word-doc.png";
import fileIcon from "../../../../../../../../shared/assets/icons/file.png";
import Img from "../../../../../../../../ui/Img";
import Text from "../../../../../../../../ui/Text";
import Button from "../../../../../../../../ui/Button";
import { deleteFile } from "../../../../../../../../shared/services/file.service";
import { useQuery } from "react-query";

type ModalFileRowProps = {
  file: FileType;
  files: FileType[];
  setFiles: Dispatch<FileType[]>;
};

const ModalFileRow: React.FC<ModalFileRowProps> = (props) => {
  const {
    file: { name, originalName, id },
    files,
    setFiles,
  } = props;

  const getIconFile = (): ReactNode => {
    if (name.endsWith(".docx") || name.endsWith(".doc"))
      return <Img placeholderImage="" src={wordIcon} />;
    if (name.endsWith(".pdf")) return <Img placeholderImage="" src={pdfIcon} />;
    return <Img placeholderImage="" src={fileIcon} />;
  };

  const { refetch: refetchDelete } = useQuery(
    "query-delete-file",
    async () => {
      return await deleteFile(id);
    },
    {
      enabled: false,
      onSuccess: ({ data }) => {
        setFiles(files.filter(item=>item.id!==Number(data.id)))
      },
    }
  );

  const onDeleteFile = () => {
    refetchDelete();
  };

  return (
    <StyledRow
      display={"flex"}
      justifyContent="space-between"
      alignItems="center"
      padding="10px 10px"
      gap="10px"
    >
      <Container
        display={"flex"}
        justifyContent="start"
        gap="10px"
        alignItems="center"
      >
        <Container width="2rem">{getIconFile()}</Container>
        <Text.Body size="m" weight="bold">
          {originalName}
        </Text.Body>
      </Container>
      <Container
        display={"flex"}
        gap="1rem"
        justifyContent="end"
        alignItems="center"
      >
        <Button
          shape="round"
          display="default"
          trailingIcon="ri-eye-line"
        ></Button>
        <Button
          onClick={onDeleteFile}
          shape="round"
          display="danger"
          trailingIcon="ri-close-line"
        ></Button>
      </Container>
    </StyledRow>
  );
};

export default ModalFileRow;

const StyledRow = styled(Container)`
  ${({ theme }) => css`
    background-color: #fff;
    transition: all 400ms;
    border-bottom: 2px solid ${theme.colors.Neutral4};
    border-radius: 10px;
    :hover {
      background-color: ${theme.colors.Neutral4};
    }
  `}
`;
