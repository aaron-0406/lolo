import Container from '@/ui/Container'
import Text from '@/ui/Text'
import Button from '@/ui/Button'
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
import useModal from '@/hooks/useModal'
import ProcessReasonModal from '../../JudicialProcessReason/Modals/ProcessReasonModal'
import { useFormContext } from 'react-hook-form'
import { JudicialCasefileProcessStatusType } from '@/types/judicial/judicial-case-file-process-status.type'

const FileCaseProcessStatusInfo = () => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const { control } = useFormContext<JudicialCasefileProcessStatusType>()

  const greaterThanTabletS = useMediaQuery(device.tabletS)

  const { data } = useQuery([KEY_JUDICIAL_PROCESS_REASON_CACHE, parseInt(chb.length ? chb : '0')], async () => {
    return await getAllProcessReasonByCHB(parseInt(chb.length ? chb : '0'))
  })

  let result = data?.data ?? []
  const optionsStates: Array<SelectItemType> = result.map((reason: { id: string; reason: string }) => {
    return {
      key: String(reason.id),
      label: reason.reason,
    }
  })

  const { visible: visibleModalAdd, showModal: showModalAdd, hideModal: hideModalAdd } = useModal()

  const onShowModal = () => {
    showModalAdd()
  }

  const onCloseModal = () => {
    hideModalAdd()
  }

  return (
    <StyledContainer width="100%" display="flex" flexDirection="column" padding="20px 20px 20px 20px" gap="20px">
      <Container
        width="100%"
        display="flex"
        flexDirection={greaterThanTabletS ? 'row' : 'column'}
        gap={greaterThanTabletS ? '30px' : '10px'}
      >
        <Container className="container__status">
          <Text.Body weight="bold" size="m" color="Neutral8">
            Estatus del proceso
          </Text.Body>
          <Controller
            name="processStatus"
            control={control}
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
                <RadioButton
                  value="inactive"
                  name="processStatus"
                  checked={field.value === 'Concluido' ? true : false}
                  onChange={() => {
                    field.onChange('Concluido')
                  }}
                >
                  Concluido
                </RadioButton>
              </Container>
            )}
          />
        </Container>

        <Container className="container__reason">
          <Controller
            name="processReasonId"
            control={control}
            render={({ field }) => (
              <Container display="flex" flexDirection="row" gap="10px" width="100%" alignItems="flex-end">
                <Select
                  width="100%"
                  label="Motivo"
                  options={optionsStates}
                  value={String(field.value)}
                  onChange={(key) => {
                    field.onChange(key)
                  }}
                />

                <Button
                  shape="round"
                  leadingIcon="ri-add-fill"
                  size="small"
                  onClick={onShowModal}
                  disabled={!chb}
                  permission="P27-01"
                />
              </Container>
            )}
          />
        </Container>
      </Container>

      <Container className="container__comment" width={greaterThanTabletS ? '50%' : '100%'}>
        <Text.Body weight="bold" size="m" color="Neutral8">
          Comentario
        </Text.Body>
        <Container className="container__comment-text-area">
          <Controller
            name="processComment"
            control={control}
            render={({ field }) => (
              <TextArea
                value={field.value ?? ''}
                onChange={(e) => {
                  field.onChange(e.target.value)
                }}
                rows={8}
              />
            )}
          />
        </Container>
      </Container>

      <ProcessReasonModal visible={visibleModalAdd} onClose={onCloseModal} />
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
      .container__status {
        display: flex;
        flex: 1;
        flex-direction: column;
        gap: 10px;
      }
      .container__status-radio-buttons {
        border: 2px solid ${theme.colors.Neutral4};
        border-radius: 8px;
        padding: 8px;
        display: flex;
        flex-direction: row;
        gap: 10px;
      }
      .container__reason {
        display: flex;
        flex: 1;
        flex-direction: column;
        gap: 10px;
      }

      .container__comment {
      }
      .container__comment-text-area {
        border: 2px solid ${theme.colors.Neutral4};
        border-radius: 8px;
        padding: 8px;
        display: flex;
        flex-direction: row;
        gap: 10px;
      }
    `}
`
