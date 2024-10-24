import { JudicialBinFileType } from '@/types/judicial/judicial-bin-file.type'
import { JudicialBinnacleType } from '@/types/judicial/judicial-binnacle.type'
import Container from '@/ui/Container'
import DragAndDropFile from '@/ui/DragAndDropFile'
import Img from '@/ui/Img'
import { ReactNode, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import styled from 'styled-components'
import pdfIcon from '@/assets/icons/pdf.png'
import wordIcon from '@/assets/icons/word-doc.png'
import fileIcon from '@/assets/icons/file.png'
import Button from '@/ui/Button'
import { useMutation } from 'react-query'
import { deleteJudicialBinFile } from '@/services/judicial/judicial-bin-file.service'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { AxiosError } from 'axios'
import notification from '@/ui/notification'
import JudicialBinFileSeeModal from './JudicialBinFileSeeModal'
import useModal from '@/hooks/useModal'
import { useLoloContext } from '@/contexts/LoloProvider'
import { Tooltip } from 'react-tooltip'

type JudicialBinnacleInfoFileFormProps = {
  clientCode: string
  judicialFileCaseId: number
}

const JudicialBinnacleInfoFileForm = ({ clientCode, judicialFileCaseId }: JudicialBinnacleInfoFileFormProps) => {
  const { setValue, watch } = useFormContext<
    Omit<JudicialBinnacleType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> & {
      judicialBinFiles: JudicialBinFileType[]
      filesDnD: File[]
    }
  >()

  const [idSeeFile, setIdSeeFile] = useState<number>(0)
  const {
    client: {
      customer: { id: idCustomer },
    },
    bank: {
      selectedBank: { idCHB },
    },
  } = useLoloContext()
  const { visible: visibleModalFile, showModal: showModalFile, hideModal: hideModalFile } = useModal()
  const handleClickSeeFile = (id: number) => {
    setIdSeeFile(id)
    showModalFile()
  }

  const onCloseModalSeeFile = () => {
    setIdSeeFile(0)
    hideModalFile()
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

  const { mutate: deleteBinnacleMutate } = useMutation<any, AxiosError<CustomErrorResponse>, number>(
    async (id: number) => {
      return await deleteJudicialBinFile(id, idCustomer, Number(idCHB), clientCode, judicialFileCaseId)
    },
    {
      onSuccess: (data) => {
        notification({ type: 'success', message: 'Archivo eliminado' })
        setValue(
          'judicialBinFiles',
          watch('judicialBinFiles').filter((jbf) => jbf.id !== data.data.id)
        )
      },
      onError: (error) => {
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )

  const getIconFile = (name: string): ReactNode => {
    if (name.endsWith('.docx') || name.endsWith('.doc')) return <Img width="30px" placeholderImage="" src={wordIcon} />
    if (name.endsWith('.pdf')) return <Img width="30px" placeholderImage="" src={pdfIcon} />
    return <Img width="30px" placeholderImage="type-file" src={fileIcon} />
  }

  return (
    <Container>
      <DragAndDropFile
        onChange={(e) => {
          const files: File[] = watch('filesDnD')
          Array.from(e).forEach((file) => {
            if (!watch('filesDnD').some((fileDnD) => file.name === fileDnD.name)) {
              files.push(file)
            }
          })
          setValue('filesDnD', files)
        }}
      />
      <Container width="100%" overFlowY="auto" gap="8px" margin="10px 0 0 0" display="flex" flexDirection="column">
        {watch('judicialBinFiles').map((file) => {
          return (
            <FileItemStyled width="100%" backgroundColor="#F9FAFE" key={file.id}>
              <Container width="calc(100% - 96px)" display="flex" gap="10px" alignItems="center" justifyContent="start">
                <Container width="30px" display="flex" justifyContent="start" alignItems="start">
                  {getIconFile(file.originalName)}
                </Container>
                <Container width="calc(90% - 30px)" display="flex" justifyContent="start" flexDirection="column">
                  <StyledFileName
                    data-tooltip-id={'my-tooltip' + file.id}
                    data-tooltip-content={file.originalName}
                    width="100%"
                  >
                    {file.originalName}
                    <Tooltip content={file.originalName} place="left" id={'my-tooltip' + file.id}>
                      {file.originalName}
                    </Tooltip>
                  </StyledFileName>
                  <Container>{formatFileSize(file.size)}</Container>
                </Container>
              </Container>
              <Container width="20%" display="flex" justifyContent="end" alignItems="center" gap="10px">
                <Button
                  messageTooltip="Ver archivo"
                  shape="round"
                  size="small"
                  leadingIcon="ri-eye-line"
                  permission="P02-02-03-01"
                  display="default"
                  onClick={() => {
                    handleClickSeeFile(file.id)
                  }}
                />
                <Button
                  leadingIcon="ri-close-line"
                  hierarchy="tertiary"
                  shape="round"
                  onClick={() => {
                    deleteBinnacleMutate(file.id)
                  }}
                />
              </Container>
            </FileItemStyled>
          )
        })}
        {watch('filesDnD').map((file) => {
          return (
            <FileItemStyled width="100%" backgroundColor="#F9FAFE" key={file.name}>
              <Container width="calc(100% - 48px)" display="flex" gap="10px" alignItems="center" justifyContent="start">
                <Container width="30px" display="flex" justifyContent="start" alignItems="start">
                  {getIconFile(file.name)}
                </Container>
                <Container width="calc(90% - 30px)" display="flex" justifyContent="start" flexDirection="column">
                  <StyledFileName data-tooltip-id={'my-tooltip-2' + file.name} width="100%">
                    {file.name}
                    <Tooltip content={file.name} place="left" id={'my-tooltip-2' + file.name}>
                      {file.name}
                    </Tooltip>
                  </StyledFileName>
                  <Container>{formatFileSize(file.size)}</Container>
                </Container>
              </Container>
              <Container width="20%" display="flex" justifyContent="end" alignItems="center" gap="10px">
                <Button
                  leadingIcon="ri-close-line"
                  hierarchy="tertiary"
                  shape="round"
                  onClick={() => {
                    setValue(
                      'filesDnD',
                      watch('filesDnD').filter((fileParam) => fileParam.name !== file.name)
                    )
                  }}
                />
              </Container>
            </FileItemStyled>
          )
        })}
      </Container>
      <JudicialBinFileSeeModal
        clientCode={clientCode}
        visible={visibleModalFile}
        onClose={onCloseModalSeeFile}
        judicialFileCaseId={judicialFileCaseId}
        idFile={idSeeFile}
        clientCustomerHasBankId={watch('customerHasBankId')}
      />
    </Container>
  )
}

export default JudicialBinnacleInfoFileForm

const FileItemStyled = styled(Container)`
  border: 2px solid #e9e8ed;
  width: 100%;
  height: 80px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  border-radius: 4px;
  padding: 15px 30px;
  justify-content: space-between;
`

const StyledFileName = styled(Container)`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`
