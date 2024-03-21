import React, { useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import Container from '@/ui/Container'
import Button from '@/ui/Button'
import Text from '@/ui/Text'

type ChangeEvent = React.ChangeEvent<HTMLInputElement>

type InputFileProps = {
  onChangeFiles?: (files: FileList | null) => void
  multiple?: boolean
}

const InputFile: React.FC<InputFileProps> = ({ onChangeFiles, multiple }: InputFileProps) => {
  const [files, setFiles] = useState<File[]>([])
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleClickButton = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  const arrayToFileList = (array: File[]): FileList => {
    const dataTransfer = new DataTransfer()
    array.forEach((file) => {
      dataTransfer.items.add(file)
    })
    return dataTransfer.files
  }

  const handleChangeInput = (e: ChangeEvent) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files) as File[]
      setFiles((prevFiles) => {
        const lastFiles = [...prevFiles, ...newFiles]
        return lastFiles
      })

      if (onChangeFiles) onChangeFiles(arrayToFileList([...files, ...newFiles]))
    }
  }

  const onClickDeleteFile = (file: File) => {
    setFiles((prevFiles) => {
      const lastFiles = prevFiles.filter((prevFile) => prevFile.name !== file.name && prevFile.size !== file.size)
      return lastFiles
    })

    if (onChangeFiles)
      onChangeFiles(
        arrayToFileList(files.filter((prevFile) => prevFile.name !== file.name && prevFile.size !== file.size))
      )
  }

  return (
    <Container width="100%" position="relative" display="flex" flexDirection="column" gap="10px">
      <StyledInput onChange={handleChangeInput} type="file" ref={inputRef} multiple={multiple} />
      <Button size="small" label="Seleccionar Archivos" onClick={handleClickButton} />

      {Array.from(files ?? []).map((file, index) => {
        return (
          <StyledContainerRow key={index} width="100%" display="flex" padding="5px 0" gap="10px">
            <StyledContainerFileName width="90%">
              <Text.Body size="m" weight="regular">
                {file.name}
              </Text.Body>
            </StyledContainerFileName>

            <Button
              width="10%"
              shape="round"
              size="small"
              leadingIcon="ri-delete-bin-line"
              display="danger"
              onClick={() => onClickDeleteFile(file)}
            />
          </StyledContainerRow>
        )
      })}
    </Container>
  )
}

export default InputFile

const StyledInput = styled.input`
  display: none;
`

const StyledContainerRow = styled(Container)`
  ${({ theme }) =>
    css`
      border-bottom: 2px solid ${theme.colors.Neutral5};
    `}
`

const StyledContainerFileName = styled(Container)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
