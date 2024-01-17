import Container from '@/ui/Container'
import Icon from '@/ui/Icon'
import InputFile from '@/ui/inputs/InputFile'
import notification from '@/ui/notification'
import styled, { css } from 'styled-components'

type ChangeEvent = React.ChangeEvent<HTMLInputElement>

type CobranzaFilesInfoFormProps = {
  clientId: number
  setStateFormData: (formData: FormData) => void
  loading: boolean
}

const CobranzaFilesInfoForm = ({ clientId, setStateFormData, loading }: CobranzaFilesInfoFormProps) => {
  const handleInputFileChange = async (e: ChangeEvent) => {
    if (e.target.files) {
      try {
        const formData = new FormData()
        if (e.target.files.length > 0) {
          const archivos = e.target.files

          for (let i = 0; i < archivos.length; i += 1) {
            const element = archivos[i]
            formData.append('file', element)
          }

          setStateFormData(formData)
        }
      } catch (error: any) {
        notification({
          type: 'info',
          message: error.response.data.message,
        })
      }
    }
  }

  return (
    <>
      <InputFile onChange={handleInputFileChange} multiple />

      <ContainerTableFile
        backgroundColor={'#eff0f6ff'}
        width="100%"
        minHeight="90%"
        padding="1rem"
        overFlowY="auto"
        maxHeight="90%"
      >
        {loading && (
          <Container
            backgroundColor="#eff0f6ff"
            width="100%"
            height="20%"
            display="flex"
            justifyContent="center"
            padding="2rem 0"
          >
            <StyledIcon remixClass="ri-loader-line"></StyledIcon>
          </Container>
        )}
      </ContainerTableFile>
    </>
  )
}

export default CobranzaFilesInfoForm

const StyledIcon = styled(Icon)`
  animation: rotate 2s linear infinite;
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
`

const ContainerTableFile = styled(Container)`
  ${({ theme }) =>
    css`
      border: 2px solid ${theme.colors.Neutral4};
      ::-webkit-scrollbar-thumb {
        background: ${theme.colors.Neutral5};
        border-radius: 10px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: ${theme.colors.Neutral4};
      }
      ::-webkit-scrollbar-track {
        background-color: transparent;
      }
      ::-webkit-scrollbar {
        width: 10px;
        background-color: transparent;
      }
    `}
`
