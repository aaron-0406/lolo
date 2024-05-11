import Container from '@/ui/Container'
import Text from '@/ui/Text'
import { ClientType } from '@/types/extrajudicial/client.type'

import { useLoloContext } from '@/contexts/LoloProvider'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useQuery } from 'react-query'
import { device } from '@/breakpoints/responsive'
import { SelectItemType } from '@/ui/Select/interfaces'

import Select from '@/ui/Select'
import RadioButton from '@/ui/RadioButton'
import TextArea from '@/ui/inputs/TextArea'
import styled from 'styled-components'
import { css } from 'styled-components'

import { KEY_JUDICIAL_PROCESS_REASON_CACHE } from '../../JudicialProcessReason/ProcessReasonTable/utils/judicial-process-reason.cache'
import { getAllProcessReasonByCHB } from '@/services/judicial/judicial-process-reason.service'
import { Controller } from 'react-hook-form'


type FileCaseProcessStatusInfoProps = {
  ownerFileCase?: ClientType & { customerUser: { id: number; name: string } }
}


const FileCaseProcessStatusInfo = ({ ownerFileCase }: FileCaseProcessStatusInfoProps) => {
  
  const {
    bank: { selectedBank: { idCHB:chb } }
  } = useLoloContext()

  const greaterThanTabletS = useMediaQuery(device.tabletS)
  

  const { isLoading, data } = useQuery([KEY_JUDICIAL_PROCESS_REASON_CACHE, parseInt(chb.length ? chb : '0')], async () => {
    return await getAllProcessReasonByCHB(parseInt(chb.length ? chb : '0'))
  })

  
  let result = data?.data ?? []
  const optionsStates:Array<SelectItemType> = result.map((reason:{id:string, reason:string}) => { 
    return {
      key: reason.id,
      label: reason.reason
    }
  })



  return (
    <StyledContainer width="100%" display="flex" flexDirection="column" padding="20px 20px 20px 20px" gap="20px">
      <Container
        width="100%"
        display="flex"
        flexDirection={greaterThanTabletS ? 'row' : 'column'}
        gap={greaterThanTabletS ? '30px' : '10px'}
      >
        <Container className="container__status">
          <Text.Body weight="bold" size="s" color="Neutral8">
            ESTATUS DEL PROCESO
          </Text.Body>
          <Controller
            name="processStatus"
            render={({ field }) => (
              <Container className="container__status-radio-buttons">
                <RadioButton
                  value="active"
                  name="processStatus"
                  onChange={() => {
                    field.onChange('Activo')
                  }}
                  checked={field.value === 'Activo' ? true : false}
                >
                  Activo
                </RadioButton>
                <RadioButton value="inactive" name="processStatus" checked={field.value === 'Conluido' ? true : false}
                  onChange={() => {
                    field.onChange('Conluido')
                  }}
                >
                  Conluido
                </RadioButton>
              </Container>
            )}
          />
        </Container>

        <Container className="container__reason">
          <Text.Body weight="bold" size="s" color="Neutral8">
            MOTIVO
          </Text.Body>
          <Controller
            name="processReasonId"
            render={({ field }) => (
              <Select
                value={field.value}
                placeholder={optionsStates.find((option) => option.key === field.value)?.label ?? ''}
                onChange={(key) => {
                  field.onChange(parseInt(key))
                }}
                options={optionsStates}
              />
            )}
          />
        </Container>
      </Container>

      <Container className="container__comment" width={greaterThanTabletS ? '50%' : '100%'}>
        <Text.Body weight="bold" size="s" color="Neutral8">
          COMENTARIO
        </Text.Body>
        <Container className="container__comment-text-area">
          <Controller
            name="processComment"
            render={({ field }) => <TextArea value={field.value} onChange={field.onChange} rows={8} />}
          />
        </Container>
      </Container>
    </StyledContainer>
  )
}

export default FileCaseProcessStatusInfo

const StyledContainer = styled(Container)`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 20px 0 20px;
  ${({ theme }) =>
    css`
    .container__status{
      display: flex;
      flex: 1;
      flex-direction: column;
      gap: 10px;
    }
    .container__status-radio-buttons{
      border: 2px solid ${theme.colors.Neutral4};
      border-radius: 8px;
      padding: 8px;
      display: flex;
      flex-direction: row;
      gap: 10px;

    }
    .container__reason{
      display: flex;
      flex: 1;
      flex-direction: column;
      gap: 10px;
    }

    .container__comment{
    }
    .container__comment-text-area{
      border: 2px solid ${theme.colors.Neutral4};
      border-radius: 8px;
      padding: 8px;
      display: flex;
      flex-direction: row;
      gap: 10px;
    }
  `}
`
