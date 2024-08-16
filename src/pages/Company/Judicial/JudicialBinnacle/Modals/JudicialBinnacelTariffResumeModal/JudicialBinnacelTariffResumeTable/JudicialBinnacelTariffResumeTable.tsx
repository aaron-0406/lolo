import Table from "@/ui/Table"
import { judicialBinnacleTariffResumeColumns } from "./utils/columns"
import BodyCell from "@/ui/Table/BodyCell"
import Container from "@/ui/Container"
import Text from "@/ui/Text"

type JudicialBinnacleTariffResumeTableProps = {
  tariffHistoryArray: string
}

const JudicialBinnacelTariffResumeTable = ({ tariffHistoryArray }: JudicialBinnacleTariffResumeTableProps) => {
  const tariffHistory = tariffHistoryArray.length ? JSON.parse(tariffHistoryArray) : null
  if (!tariffHistory) return (
    <Container width="100%" height="100%" display="flex" justifyContent="center" alignItems="center">
      <Text.Body size="l" weight="bold">
        No hay datos disponibles
      </Text.Body>
    </Container>
  )
  return (
    <Table columns={judicialBinnacleTariffResumeColumns}>
      {tariffHistory.map((record: any, index: number) => (
        <tr key={index}>
          <BodyCell textAlign="center">{record.id ?? '-'}</BodyCell>
          <BodyCell textAlign="center">{record.code ?? '-'}</BodyCell>
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
          <BodyCell textAlign="center">{record.tariffIntervalMatch.value ?? '-'}</BodyCell>
          <BodyCell textAlign="center">{record.type ?? '-'}</BodyCell>
          <BodyCell textAlign="center">{record.tariffIntervalMatch.tariffInterval.intervalDescription ?? '-'}</BodyCell>
          <BodyCell textAlign="center">{record.tariffIntervalMatch.tariffInterval.interval ?? '-'}</BodyCell>
        </tr>
      ))}
    </Table>
  )
}

export default JudicialBinnacelTariffResumeTable