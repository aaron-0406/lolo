import Button from "@/ui/Button"
import Container from "@/ui/Container"
import DragAndDropFile from "@/ui/DragAndDropFile"
import Text from "@/ui/Text"
import Img from "@/ui/Img"

import pdfIcon from '@/assets/icons/pdf.png'
import wordIcon from '@/assets/icons/word-doc.png'
import fileIcon from '@/assets/icons/file.png'
import excelIcon from '@/assets/icons/excel.png' 

import { ReactNode } from "react"

import styled, { css } from "styled-components"
import { useFormContext } from "react-hook-form"
import { useMutation } from "react-query"
import { AxiosError } from "axios"
import { CustomErrorResponse } from "types/customErrorResponse"
import { compareExcelsFiles } from "@/services/config/compare-excels.service"

const CompareExcelInfo = () => {

  const { setValue, watch } = useFormContext<{
    prevFile: File | undefined
    newFile: File | undefined
    resultFile: any | undefined
  }>()

  const getIconFile = (name: string): ReactNode => {
    if (name.endsWith('.docx') || name.endsWith('.doc')) return <Img width="30px" placeholderImage="" src={wordIcon} />
    if (name.endsWith('.pdf')) return <Img width="30px" placeholderImage="" src={pdfIcon} />
    if (name.endsWith('.xlsx')) return <Img width="30px" placeholderImage="" src={excelIcon} /> 
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

  const { mutate: sendExcelFiles } = useMutation<any, AxiosError<CustomErrorResponse>, { prevFile: File, newFile: File }>(
    async ({ prevFile, newFile }) => {
      const formData = new FormData()
      formData.append('prevFile', prevFile)
      formData.append('newFile', newFile)
      await compareExcelsFiles(prevFile, newFile)
    },
    {
      onSuccess: (data) => {
        setValue('resultFile', data)
        console.log(data)
      },
      onError: (error) => {
        throw new Error(error.response?.data.message)
      },
    }
  ) 

  const onSendExcelFiles = () => {
    if (watch('prevFile') && watch('newFile')){ 
      sendExcelFiles({ prevFile: watch('prevFile')!, newFile: watch('newFile')! })
    }
  }

  return (
    <StyledComponent>
      <Container className="header">
        <Text.Body size="l" weight="bold" color="Primary5">
          Comparador de Excels para la gestión de la cobranza
        </Text.Body>
      </Container>
      <Container className="container__content">
        <Container className="content">
          <Container className="container__dropzone">
            <Text.Body size="m" weight="bold" color="Neutral9">
              Archivo Previo
            </Text.Body>
            {watch('prevFile') ? (
              <Container className="file__element">
                <Container className="file__element--icon">{getIconFile(watch('prevFile')?.name ?? '')}</Container>
                <Container className="file__element--resume">
                  <Text.Body size="m" weight="regular" color="Primary5">
                    {watch('prevFile')?.name}
                  </Text.Body>
                  <Text.Body size="m" weight="regular" color="Primary5">
                    {formatFileSize(watch('prevFile')?.size ?? 0)}
                  </Text.Body>
                </Container>
                <Container className="file__element--button">
                  <Button
                    leadingIcon="ri-close-line"
                    hierarchy="tertiary"
                    shape="round"
                    onClick={() => setValue('prevFile', undefined)}
                  />
                </Container>
              </Container>
            ) : (
              <DragAndDropFile
                onChange={(e) => {
                  setValue('prevFile', e[0])
                }}
              />
            )}
          </Container>

          <Container className="container__dropzone">
            <Text.Body size="m" weight="bold" color="Neutral9">
              Archivo Nuevo
            </Text.Body>
            {watch('newFile') ? (
              <Container className="file__element">
                <Container className="file__element--icon">{getIconFile(watch('newFile')?.name ?? '')}</Container>
                <Container className="file__element--resume">
                  <Text.Body size="m" weight="regular" color="Primary5">
                    {watch('newFile')?.name}
                  </Text.Body>
                  <Text.Body size="m" weight="regular" color="Primary5">
                    {formatFileSize(watch('newFile')?.size ?? 0)}
                  </Text.Body>
                </Container>
                <Container className="file__element--button">
                  <Button
                    leadingIcon="ri-close-line"
                    hierarchy="tertiary"
                    shape="round"
                    onClick={() => setValue('newFile', undefined)}
                  />
                </Container>
              </Container>
            ) : (
              <DragAndDropFile
                onChange={(e) => {
                  setValue('newFile', e[0])
                }}
              />
            )}
          </Container>

          <Container width="100%" height="auto" display="flex" justifyContent="end" alignItems="end">
            <Button size="default" color="Primary5" label="Comparar" permission="P33-01" onClick={onSendExcelFiles} />
          </Container>

          <Container className="container__result">
            <Text.Body size="m" weight="regular" color="Primary5">
              Resultado
            </Text.Body>
          </Container>
        </Container>
      </Container>
    </StyledComponent>
  )
}

const StyledComponent = styled(Container)`
  ${({ theme }) => css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;

    .header {
      width: 100%;
      height: 4rem;
      padding: 0px 20px;
      display: flex;
      align-items: center;
      background-color: #eff0f6ff;
    }

    .container__content{
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: start;
      align-items: center;

      .content {
        padding: 10px;
        width: 95%;
        height: auto;
        margin: 20px 0px;
        display: flex;
        gap: 10px;
        flex-direction: row;
        justify-content: space-around;
        flex-wrap: wrap;
        border: solid 1px ${theme.colors.TransparentLight};
        border-radius: 12px;
  
        .container__dropzone {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 10px;
          min-height: 150px;
          min-width: 300px;
          background-color: ${theme.colors.Neutral3};
          border-radius: 12px;
          padding: 15px;

          .dropzone{
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border: 1px dashed ${theme.colors.Primary6};
            border-radius: 12px;
            padding: 20px;
            gap: 10px;

            &:hover {
              cursor: pointer;
          }

          }
            .file__element{
              width: 100%;
              height: 100%;
              min-height: 105px;
              display: flex;
              align-items: center;
              flex-direction: row;
              padding-left: 10px;
              background:${theme.colors.Neutral0};
              border-radius: 12px;
              gap: 15px;
              
              .file__element--icon{

              }
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
      .container__result{
        width: 100%;
        height: 5rem;
        background-color: ${theme.colors.Neutral3};
        border-radius: 12px;
        padding: 15px;
        display: flex;
        justify-content: center;
        align-items: center;

        .result__filename {
          flex: 1; ru
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 10px;
        }
      }
    }

  `}
` 

export default CompareExcelInfo

