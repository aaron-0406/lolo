import Table from "@/ui/Table"
import { judicialBinnacleCustomTariffColumns } from "./utils/columns"
import { TariffType } from "@/types/config/tariff.type"
import BodyCell from "@/ui/Table/BodyCell"
import Text from "@/ui/Text"
import TextField from "@/ui/fields/TextField"
import Container from "@/ui/Container"
import { useState } from "react"
import Button from "@/ui/Button"
import styled, { css } from "styled-components"
import { CurrencyInputOnChangeValues } from "react-currency-input-field"

type JudicialBinnacleCustomTariffTableProps = {
  customTariffData: TariffType[]
  onChangeCounterCustomTariff: (id: number, index: 1 | -1) => void
  onChangeValuesCustomTariff: (name: string, id: number, value: string | CurrencyInputOnChangeValues ) => void
  onAddCustomTariff: () => void
  getCustomTariffDefaultValue: (id: number) => number | undefined
}

const JudicialBinnacleCustomTariffTable = ({
  customTariffData,
  onChangeValuesCustomTariff,
  onChangeCounterCustomTariff,
  onAddCustomTariff,
  getCustomTariffDefaultValue,
}: JudicialBinnacleCustomTariffTableProps) => {
  return (
    <Container width="100%" height="100%">
      <Table columns={judicialBinnacleCustomTariffColumns}>
        {customTariffData.length
          ? customTariffData.map((record: any, key: number) => (
              <tr key={key}>
                <BodyCell textAlign="center">
                  <Text.Body size="m" weight="regular">
                    -
                  </Text.Body>
                </BodyCell>
                <BodyCell textAlign="left">{record?.code ?? '-'}</BodyCell>
                <BodyCell textAlign="left">
                  <Container
                    margin="20px 0"
                    minWidth="300px"
                    maxHeight="130px"
                    whiteSpace="normal"
                    wordBreak="break-all"
                    overFlowY="auto"
                  >
                    <Text.Body size="m" weight="regular">
                      <TextField
                        name="description"
                        onChange={(e) => onChangeValuesCustomTariff("description", record.id, e.target.value)}
                        onValueChange={(_, __, values) => {
                          console.log(values)
                        }}
                        value={record?.description ?? '-'}
                      />
                    </Text.Body>
                  </Container>
                </BodyCell>

                <BodyCell textAlign="center">
                  <Container display="flex" justifyContent="center" alignItems="center" height="100%">
                    <TextField
                      type="currency"
                      name="cost"
                      placeholder="0.00"
                      onValueChange={(_, __, values) => {
                        onChangeValuesCustomTariff("cost", record.id, values ?? "")
                      }}
                      decimalScale={2}
                      decimalsLimit={2}
                    />
                  </Container>
                </BodyCell>

                <BodyCell textAlign="center">
                  <Container
                    margin="20px 0"
                    minWidth="300px"
                    maxHeight="130px"
                    whiteSpace="normal"
                    wordBreak="break-all"
                    overFlowY="auto"
                  >
                    <Text.Number size="m" weight="bold">
                      {Number(record?.tariffIntervalMatch[0].value ?? '0').toFixed(2)}
                    </Text.Number>
                  </Container>
                </BodyCell>
                <ContainerCounter
                  tariffIntervalMatch={record?.tariffIntervalMatch}
                  record={record}
                  onChange={onChangeCounterCustomTariff}
                />
              </tr>
            ))
          : null}
      </Table>
      <Container display="flex" justifyContent="center" alignItems="center" height="100px">
        <Button
          width="100%"
          label="Agregar tarifa personalizada"
          trailingIcon="ri-add-line"
          onClick={onAddCustomTariff}
        />
      </Container>
    </Container>
  )
}

export default JudicialBinnacleCustomTariffTable

const ContainerCounter = ({ tariffIntervalMatch = [], record, onChange }: { tariffIntervalMatch: any[], record: any, onChange: (id: number, index: 1 | -1) => void }) => {

  return (
    <BodyCell>
      {Array.isArray(tariffIntervalMatch) && tariffIntervalMatch.length ? (
        tariffIntervalMatch.map((interval: any, index: number) => (
          <Container
            key={index}
            margin="20px 0"
            minWidth="300px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            maxHeight="130px"
            whiteSpace="normal"
            wordBreak="break-all"
            overFlowY="auto"
          >
            <Counter idEntity={record.id} onChange={onChange} value={record?.tariffIntervalMatch[0].counter ?? 0} />
          </Container>
        ))
      ) : (
        <Container
          margin="20px 0"
          minWidth="300px"
          maxHeight="130px"
          whiteSpace="normal"
          wordBreak="break-all"
          overFlowY="auto"
        >
          <Text.Body size="m" weight="regular">
            {'-'}
          </Text.Body>
        </Container>
      )}
    </BodyCell>
  )
}

type CounterProps = {
  onChange: (id: number, index: 1 | -1) => void
  badge?: string
  value: number
  idEntity: number
}

const Counter = ( { onChange, value, badge = "", idEntity } : CounterProps) => {

  return (
    <StyledContainer>
      <Button shape="round" size="small" trailingIcon="ri-add-line" onClick={() => onChange(idEntity, 1)} />
      <Container minWidth="80px" display="flex" justifyContent="center" alignItems="center">
        {badge} {value}
      </Container>
      <Button shape="round" size="small" trailingIcon="ri-subtract-line" onClick={() => onChange(idEntity, -1)} />
    </StyledContainer>
  )
}


const StyledContainer = styled(Container)`
  ${({ theme }) => css`
    width: fit-content;
    height: 100%;
    display: flex;
    gap: 10px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  `}
`
