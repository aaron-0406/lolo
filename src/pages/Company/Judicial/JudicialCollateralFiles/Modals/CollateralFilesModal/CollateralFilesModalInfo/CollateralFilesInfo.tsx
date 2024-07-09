import Container from "@/ui/Container"
import { useFormContext } from "react-hook-form"
import { JudicialCollateralFilesType } from "@/types/judicial/judicial-collateral-files.type"
import { ReactNode, useEffect } from "react"
import DragAndDropFile from "@/ui/DragAndDropFile"
import styled, { css } from "styled-components"
import Button from "@/ui/Button"
import Img from "@/ui/Img"

import pdfIcon from '@/assets/icons/pdf.png'
import wordIcon from '@/assets/icons/word-doc.png'
import fileIcon from '@/assets/icons/file.png'
import Text from "@/ui/Text"

const CollateralFilesModalInfo = () => {
  const {
    setValue,
    reset,
    watch,
  } = useFormContext<Omit<JudicialCollateralFilesType, 'createdAt' | 'updatedAt' | 'deletedAt'> & { filesDnD: File[] }>()

  const getIconFile = (name: string): ReactNode => {
    if (name.endsWith('.docx') || name.endsWith('.doc')) return <Img width="30px" placeholderImage="" src={wordIcon} />
    if (name.endsWith('.pdf')) return <Img width="30px" placeholderImage="" src={pdfIcon} />
    return <Img width="30px" placeholderImage="type-file" src={fileIcon} />
  }

  const formatFileSize = (sizeInBytes: number): string => {
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB']

    let unitIndex = 0
    let size = sizeInBytes

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024
      unitIndex++
    }

    return `${size.toFixed(2)} ${units[unitIndex]}`
  }

  const onAddFile = (file: File) => {
    const existFile = watch('filesDnD').find((f) => f.name === file.name)
    if (!existFile) {
      setValue('filesDnD', [...watch('filesDnD'), file])
    }
  }

  const onRemoveFile = (file: File) => {
    const existFile = watch('filesDnD').find((f) => f.name === file.name)
    if (existFile) {
      setValue('filesDnD', watch('filesDnD').filter((f) => f.name !== file.name))
    }
  }
  useEffect(()=> {
    return reset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <StyledComponent>
      <DragAndDropFile
        onChange={(e) => {
          onAddFile(e[0])
        }}
      />
      <Container width="100%" overFlowY="auto" gap="5px" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        {Array.isArray(watch('filesDnD'))
          ? watch('filesDnD').map((file, index) => (
              <Container className="file__element" key={index}>
                <Container className="file__element--icon">{getIconFile(file?.name ?? '')}</Container>
                <Container className="file__element--resume">
                  <StyledFileName data-tooltip-content={file.name} width="100%">
                    {file?.name}
                  </StyledFileName>
                  <Text.Body size="m" weight="regular" color="Primary5">
                    {formatFileSize(file?.size ?? 0)}
                  </Text.Body>
                </Container>
                <Container className="file__element--button">
                  <Button
                    leadingIcon="ri-close-line"
                    hierarchy="tertiary"
                    shape="round"
                    onClick={() => onRemoveFile(file)}
                  />
                </Container>
              </Container>
            ))
          : null}
      </Container>
    </StyledComponent>
  )
}

export default CollateralFilesModalInfo

const StyledComponent = styled(Container)`
  ${({ theme }) => css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 10px;
    align-items: center;
    padding-bottom: 10px;
    gap:10px;

      .file__element{
        width: 90%;
        padding: 10px 10px 10px 10px;
        border: 2px solid #e9e8ed;
        background-color: #F9FAFE;
        height: 80px;
        gap: 10px;
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        border-radius: 4px;
        justify-content: space-between;

        .file__element--resume{
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .file__element--button{
          padding-right: 10px;
          padding-left: 10px;
        }
    }
  
    }
  `}
`

const StyledFileName = styled(Container)`
  max-width: 200px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`
