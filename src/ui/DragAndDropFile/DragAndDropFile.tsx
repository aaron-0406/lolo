import { useState } from 'react'
import Container from '../Container'
import Text from '../Text'
import styled from 'styled-components'

const DragAndDropFile = ({ onChange }: { onChange: (files: FileList) => void }) => {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    const files = e.dataTransfer.files
    handleFiles(files)
  }

  const handleFiles = (files: FileList) => {
    onChange(files)
  }

  return (
    <StyledContainer
      position="relative"
      height="100px"
      textAlign="center"
      padding="50px"
      margin="0 auto"
      className={`file-dropzone ${isDragging ? 'dragging' : ''}`}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Text.Body size="m" weight="regular">
        Arrastra y suelta archivos aquí
      </Text.Body>
      <input
        type="file"
        multiple
        onChange={(e) => {
          if (!e.target.files) return
          onChange(e.target.files)
        }}
      />
    </StyledContainer>
  )
}

export default DragAndDropFile

const StyledContainer = styled(Container)`
  border: 3px dashed #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  input {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
`
