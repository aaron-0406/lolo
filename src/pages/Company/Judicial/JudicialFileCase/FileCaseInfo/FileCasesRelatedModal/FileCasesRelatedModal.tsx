import { useLoloContext } from '@/contexts/LoloProvider'
import { getFileCasesRelated } from '@/services/judicial/judicial-file-case.service'
import { JudicialCaseFileType } from '@/types/judicial/judicial-case-file.type'
import Container from '@/ui/Container'
import Modal from '@/ui/Modal'
import Text from '@/ui/Text'
import { AxiosResponse } from 'axios'
import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import paths from 'shared/routes/paths'
import styled from 'styled-components'

interface FileCasesRelatedModalProps {
  visible: boolean
  onClose: () => void
}

const FileCasesRelatedModal = ({ onClose, visible }: FileCasesRelatedModalProps) => {
  const {
    bank: {
      selectedBank: { idCHB },
    },
    client: {
      customer: { urlIdentifier },
    },
  } = useLoloContext()
  const navigate = useNavigate()

  const codeParams = useParams().code ?? ''

  const { data, refetch } = useQuery<AxiosResponse<Array<JudicialCaseFileType>>>(
    'get-file-cases-related',
    () => {
      return getFileCasesRelated(codeParams, Number(idCHB))
    },
    {
      enabled: false,
    }
  )

  const fileCasesRelated = data?.data ?? []

  const handleRedirectFileCase = (code: string) => {
    navigate(`${paths.judicial.detallesExpediente(urlIdentifier, code)}`, {
      preventScrollReset: true,
    })
    onClose()
  }

  useEffect(() => {
    if (!!codeParams.length && codeParams !== '000000000') {
      refetch()
    }
    // eslint-disable-next-line
  }, [codeParams])

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      id="modal-file-case-related"
      title="Expedientes relacionados"
      contentOverflowY="auto"
      size="medium"
    >
      <StyledContainer
        display="flex"
        flexDirection="column"
        alignItems="center"
        flexWrap="nowrap"
        width="100%"
        height="100%"
        gap="10px"
      >
        {fileCasesRelated.map((fileCase, key) => {
          return (
            <Container
              key={key}
              onClick={() => {
                handleRedirectFileCase(fileCase.numberCaseFile)
              }}
              backgroundColor="#EFF0F6"
              width="100%"
            >
              <Text.Body size="m" weight="regular">
                {fileCase.numberCaseFile}
              </Text.Body>
            </Container>
          )
        })}
      </StyledContainer>
    </Modal>
  )
}

export default FileCasesRelatedModal

const StyledContainer = styled(Container)`
  padding: 10px 40px;
  & div {
    padding: 10px 20px;
    border-radius: 10px;
    cursor: pointer;
  }
`
