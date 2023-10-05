import { useState } from 'react'
import { useQuery } from 'react-query'
import styled, { css } from 'styled-components'
import { useFormContext } from 'react-hook-form'
import Container from '@/ui/Container/Container'
import Label from '@/ui/Label'
import TextField from '@/ui/fields/TextField'
import Button from '@/ui/Button/Button'
import { getClientByCode, getClientByName } from '@/services/extrajudicial/client.service'
import notification from '@/ui/notification'
import { FileCaseType } from '@/types/judicial/case-file.type'
import { useLoloContext } from '@/contexts/LoloProvider'
import useModal from '@/hooks/useModal'
import ModalManagement from './Modal/ModalManagement'

const FileCaseOwner = () => {
  const { setValue, reset } = useFormContext<FileCaseType>()

  const { visible: visibleModalManagement, showModal: showModalManagement, hideModal: hideModalManagement } = useModal()

  const {
    customerUser: { user },
    bank: { selectedBank },
  } = useLoloContext()

  const [idc, setIdc] = useState<string>('')
  const [name, setName] = useState<string>('')

  const { refetch } = useQuery(
    'get-client-by-code',
    async () => {
      return await getClientByCode(idc, String(selectedBank.idCHB))
    },
    {
      onSuccess: ({ data }) => {
        setValue('clientId', data.id)
        setIdc(data.code)
        setName(data.name)
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
      return await getClientByName(name, String(selectedBank.idCHB))
    },
    {
      onSuccess: ({ data }) => {
        setValue('clientId', data.id)
        setIdc(data[0].code)
        setName(data[0].name)
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

  const handleClickGestion = () => {
    showModalManagement()
  }

  const onChangeIDC = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdc(e.target.value)
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
    setName(e.target.value)
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
            value={idc}
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
            value={name}
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
            <Label label={String(user.id)} />
          </Container>
        </div>
        <div className="field-wrapper">
          <Label label="Gestor:" />
          <Container display="flex" width="100%" justifyContent="space-between">
            <Label label={user.name.concat(' ' + user.lastName)} />
            <Button
              onClick={(event) => {
                event.stopPropagation()
                handleClickGestion()
              }}
              label="Ver gestión"
              size="small"
            />
          </Container>
        </div>
      </Container>

      {visibleModalManagement && (
        <ModalManagement userId={user.id} visible={visibleModalManagement} onClose={hideModalManagement} />
      )}
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
