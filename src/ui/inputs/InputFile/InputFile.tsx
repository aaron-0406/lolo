import React, { InputHTMLAttributes, useState } from 'react'
import styled, { css } from 'styled-components'
import Container from '../../Container'

type ChangeEvent = React.ChangeEvent<HTMLInputElement>

interface InputFileProps extends InputHTMLAttributes<HTMLInputElement> {
  onChange?: React.ChangeEventHandler
  filename?: string
}

const InputFile: React.FC<InputFileProps> = (props) => {
  const { onChange, filename, ...rest } = props
  const [file, setFile] = useState<File>()

  const handleChangeInput = (e: ChangeEvent) => {
    if (e.target.files) {
      setFile(e.target.files[0])
      if (onChange) onChange(e)
    }
  }
  return (
    <ContainerInput
      width="100%"
      position="relative"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="row"
      gap="10px"
    >
      <StyledInput onChange={handleChangeInput} type="file" {...rest} />
      <StyledButton>Choose File</StyledButton>
      <StyledContainerNameFile width="100%" display="flex" alignItems="center">
        {file?.name || filename || 'Upload Your File'}
      </StyledContainerNameFile>
    </ContainerInput>
  )
}

export default InputFile

const StyledInput = styled.input`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`

const StyledContainerNameFile = styled(Container)`
  ${({ theme }) => css`
    border-bottom: 1px solid ${theme.colors.Primary5};
  `}
`

const StyledButton = styled.button`
  ${({ theme }) => css`
    background-color: ${theme.colors.Primary5};
  `}
  width: 8rem;
  height: 2rem;
  border-radius: 8px;
  transition: all 0.6s ease-in-out;
  color: #fff;
  box-shadow: 2px 2px #888888;
`

const ContainerInput = styled(Container)`
  &:hover ${StyledButton} {
    ${({ theme }) => css`
      background-color: ${theme.colors.Primary3};
    `}
  }
`
