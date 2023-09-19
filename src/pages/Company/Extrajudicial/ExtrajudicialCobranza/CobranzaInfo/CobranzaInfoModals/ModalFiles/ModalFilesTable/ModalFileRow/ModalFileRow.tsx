import React, { Dispatch, ReactNode } from 'react'
import styled, { css } from 'styled-components'
import { useQuery } from 'react-query'
import { FileType } from '@/types/extrajudicial/file.type'
import Container from '@/ui/Container'
import pdfIcon from '@/assets/icons/pdf.png'
import wordIcon from '@/assets/icons/word-doc.png'
import fileIcon from '@/assets/icons/file.png'
import Img from '@/ui/Img'
import Text from '@/ui/Text'
import Button from '@/ui/Button'
import { deleteFile, getFileById } from '@/services/extrajudicial/file.service'
import { useLoloContext } from '@/contexts/LoloProvider'

type ModalFileRowProps = {
  file: FileType
  files: FileType[]
  setFiles: Dispatch<FileType[]>
  code: number
  showModalFile: () => void
  setFileSelected: Dispatch<FileType>
}

const ModalFileRow: React.FC<ModalFileRowProps> = (props) => {
  const {
    client: { customer },
    bank: { selectedBank },
  } = useLoloContext()
  const {
    showModalFile,
    setFileSelected,
    code,
    file: { name, originalName, id },
    files,
    setFiles,
  } = props

  const getIconFile = (): ReactNode => {
    if (name.endsWith('.docx') || name.endsWith('.doc')) return <Img placeholderImage="" src={wordIcon} />
    if (name.endsWith('.pdf')) return <Img placeholderImage="" src={pdfIcon} />
    return <Img placeholderImage="" src={fileIcon} />
  }

  const { refetch: refetchDelete, isFetching } = useQuery(
    `query-delete-file${id}`,
    async () => {
      return await deleteFile(Number(customer.id), Number(selectedBank.idCHB), code, id)
    },
    {
      enabled: false,
      onSuccess: ({ data }) => {
        setFiles(files.filter((item) => item.id !== Number(data.id)))
      },
    }
  )
  const { refetch: refetchViewFile, isFetching: isFetchingGet } = useQuery(
    `query-get-file${id}`,
    async () => {
      return await getFileById(Number(customer.id), Number(selectedBank.idCHB), code, id)
    },
    {
      enabled: false,
      onSuccess: ({ data }) => {
        showModalFile()
        setFileSelected(data)
      },
    }
  )

  const onDeleteFile = () => {
    refetchDelete()
  }

  const onViewFile = () => {
    refetchViewFile()
  }

  return (
    <StyledRow display={'flex'} justifyContent="space-between" alignItems="center" padding="10px 10px" gap="10px">
      <Container display={'flex'} justifyContent="start" gap="10px" alignItems="center">
        <Container width="2rem">{getIconFile()}</Container>
        <Text.Body size="m" weight="bold">
          {originalName}
        </Text.Body>
      </Container>
      <Container display={'flex'} gap="1rem" justifyContent="end" alignItems="center">
        <Button
          shape="round"
          display="default"
          trailingIcon="ri-eye-line"
          onClick={onViewFile}
          loading={isFetchingGet}
          permission="P03-06-01"
        />
        <Button
          onClick={onDeleteFile}
          disabled={isFetching}
          shape="round"
          display="danger"
          trailingIcon="ri-close-line"
          permission="P03-06-03"
        />
      </Container>
    </StyledRow>
  )
}

export default ModalFileRow

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
`
