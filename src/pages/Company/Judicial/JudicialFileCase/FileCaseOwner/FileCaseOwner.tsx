import { useQuery } from 'react-query'
import styled, { css } from 'styled-components'
import { useFormContext } from 'react-hook-form'
import Container from '@/ui/Container/Container'
import Label from '@/ui/Label'
import TextField from '@/ui/fields/TextField'
import { getClientByCode, getClientByName } from '@/services/extrajudicial/client.service'
import notification from '@/ui/notification'
import { JudicialCaseFileType } from '@/types/judicial/judicial-case-file.type'
import { useLoloContext } from '@/contexts/LoloProvider'
import { FileCaseOwnerType } from '../JudicialFileCase'

type FileCaseOwnerProps = {
  setOwnerFileCase: (value: FileCaseOwnerType) => void
  ownerFileCase: FileCaseOwnerType
}

const FileCaseOwner = ({ ownerFileCase, setOwnerFileCase }: FileCaseOwnerProps) => {
  const { setValue, reset } = useFormContext<JudicialCaseFileType>()

  const {
    bank: { selectedBank },
  } = useLoloContext()

  const { refetch } = useQuery(
    'get-client-by-code',
    async () => {
      return await getClientByCode(ownerFileCase.code, String(selectedBank.idCHB))
    },
    {
      onSuccess: ({ data }) => {
        setValue('clientId', data.id)
        setOwnerFileCase({
          ...ownerFileCase,
          customerUser: data.customerUser,
          code: data.code,
          name: data.name,
          id: data.id,
        })
        notification({ type: 'success', message: 'Cliente encontrado' })
      },
      onError: (error: any) => {
        notification({
          type: 'info',
          message: error.response.data.message,
        })
        reset()
      },
      enabled: false,
    }
  )

  const { refetch: refetchName } = useQuery(
    'query-client-by-name',
    async () => {
      return await getClientByName(ownerFileCase.name, String(selectedBank.idCHB))
    },
    {
      onSuccess: ({ data }) => {
        setValue('clientId', data.id)
        setOwnerFileCase({
          ...ownerFileCase,
          code: data[0].code,
          name: data[0].name,
          customerUser: {
            id: data[0].customerUser.id,
            name: data[0].customerUser.name,
          },
          id: data.id,
        })
        notification({ type: 'success', message: 'Cliente encontrado' })
      },
      onError: (error: any) => {
        notification({
          type: 'info',
          message: error.response.data.message,
        })
        reset()
      },
      enabled: false,
    }
  )

  const onChangeIDC = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOwnerFileCase({
      ...ownerFileCase,
      code: e.target.value,
    })
  }

  const onClickTrailingIDC = () => {
    refetch()
  }

  const onKeyDownIDC = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      refetch()
    }
  }

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOwnerFileCase({
      ...ownerFileCase,
      name: e.target.value,
    })
  }

  const onClickTrailingName = () => {
    refetchName()
  }

  const onKeyDownName = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      refetchName()
    }
  }

  return (
    <StyledContainer
      width="100%"
      height="100%"
      display="flex"
      flexDirection="column"
      padding="20px 40px"
      gap="20px"
      overFlowY="auto"
    >
      <Container className="fields-wrapper-container">
        <div className="field-wrapper">
          <Label label="IDC:" />
          <TextField
            width="100%"
            value={ownerFileCase.code}
            trailingIcon="ri-search-line"
            placeholder="Buscar cliente por código"
            onKeyDown={onKeyDownIDC}
            onChange={onChangeIDC}
            onClickTrailing={onClickTrailingIDC}
          />
        </div>
        <div className="field-wrapper">
          <Label label="Nombre:" />
          <TextField
            width="100%"
            value={ownerFileCase.name}
            trailingIcon="ri-search-line"
            placeholder="Buscar cliente por nombre"
            onKeyDown={onKeyDownName}
            onChange={onChangeName}
            onClickTrailing={onClickTrailingName}
          />
        </div>
      </Container>
      <Container className="fields-wrapper-container">
        <div className="field-wrapper">
          <Label label="id:" />
          <Container display="flex" justifyContent="center" width="80%">
            <Label label={String(ownerFileCase.customerUser.id)} />
          </Container>
        </div>
        <div className="field-wrapper">
          <Label label="Gestor:" />
          <Container display="flex" width="100%" justifyContent="space-between">
            <Label label={ownerFileCase.customerUser.name} />
          </Container>
        </div>
      </Container>
    </StyledContainer>
  )
}

export default FileCaseOwner

const StyledContainer = styled(Container)`
  ${({ theme }) => css`
    border-radius: 8px;

    .fields-wrapper-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .field-wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 15px;
    }

    @media ${theme.device.tabletL} {
      .fields-wrapper-container {
        flex-direction: row;
        gap: 15px;
      }

      .field-wrapper {
        flex-direction: row;
      }
    }
  `}
`
