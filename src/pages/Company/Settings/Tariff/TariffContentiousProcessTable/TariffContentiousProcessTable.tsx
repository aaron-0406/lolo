import { TariffType } from '@/types/config/tariff.type'
import Container from '@/ui/Container'
import Table from '@/ui/Table'
import BodyCell from '@/ui/Table/BodyCell'
import { ColumProps } from '@/ui/Table/Table'
import Text from '@/ui/Text'
import React from 'react'

type TariffContentiousProcessTableProps = {
  ContentiousProcessColumns: ColumProps[]
  ContentiousProcessData: TariffType[]
}

const TariffContentiousProcessTable = ( { ContentiousProcessColumns, ContentiousProcessData } : TariffContentiousProcessTableProps) => {
  return (
    <Table columns={ContentiousProcessColumns}>
      {ContentiousProcessData.map((record: any, key: number) => (
        <tr key={key}>
          <BodyCell textAlign="center">{key + 1}</BodyCell>
          <BodyCell textAlign="center">{record?.code ?? '-'}</BodyCell>
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
                {record?.description ?? '-'}
              </Text.Body>
            </Container>
          </BodyCell>
          {Array.isArray(record?.tariffIntervalMatch) && record?.tariffIntervalMatch.length ? (
            record.tariffIntervalMatch.map((interval: any, index: number) => (
              <BodyCell textAlign="center" key={index}>
                <Container
                  margin="20px 0"
                  minWidth="300px"
                  maxHeight="130px"
                  whiteSpace="normal"
                  wordBreak="break-all"
                  overFlowY="auto"
                >
                  <Text.Body size="m" weight="regular">
                  S/. {interval?.value ?? '-'}
                  </Text.Body>
                </Container>
              </BodyCell>
            ))
          ) : (
            <BodyCell textAlign="center">
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
            </BodyCell>
          )}
        </tr>
      ))}
    </Table>
  )
}

export default TariffContentiousProcessTable