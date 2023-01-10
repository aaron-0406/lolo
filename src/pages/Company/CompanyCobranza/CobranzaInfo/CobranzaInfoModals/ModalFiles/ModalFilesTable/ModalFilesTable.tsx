import React, { Dispatch } from "react";
import { FileType } from "../../../../../../../shared/types/file.type";
import Container from "../../../../../../../ui/Container";
import ModalFileRow from "./ModalFileRow";

type ModaFilesTableProps = {
  files: FileType[];
  setFiles: Dispatch<FileType[]>;
};

const ModalFilesTable: React.FC<ModaFilesTableProps> = (props) => {
  const { files, setFiles } = props;
  return (
    <Container width="100%" display="flex" gap="0.2rem" flexDirection="column">
      {files.map((item) => {
        return (
          <ModalFileRow
            files={files}
            setFiles={setFiles}
            file={item}
            key={item.id + "files"}
          />
        );
      })}
    </Container>
  );
};

export default ModalFilesTable;
