import Checkbox from "@/ui/Checkbox"
import Container from "@/ui/Container"
import Table from "@/ui/Table"
import BodyCell from "@/ui/Table/BodyCell"
import { ColumProps } from "@/ui/Table/Table"
import Text from "@/ui/Text"

type JudicialBinnacleContentiousProcessTableProps = {
  ContentiousProcessColumns: ColumProps[]
  ContentiousProcessData: any[]
  onSelectOption: (data: any) => void
  tariffHistory: any[]
}

const JudicialBinnacleContentiousProcessTable = ({
  ContentiousProcessColumns,
  ContentiousProcessData,
  onSelectOption,
  tariffHistory = [],
}: JudicialBinnacleContentiousProcessTableProps) => {
  return (
    <Table columns={ContentiousProcessColumns} top="230px">
      {ContentiousProcessData.map((record: any, key: number) => (
        <tr key={key}>
          <BodyCell textAlign="center">
            <Checkbox
              onChange={() => onSelectOption(record)}
              // selected={tariffHistory.some((tariff: any) => tariff?.id === record?.id)}
            />
          </BodyCell>
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
                    {interval?.value ?? '-'}
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

export default JudicialBinnacleContentiousProcessTable