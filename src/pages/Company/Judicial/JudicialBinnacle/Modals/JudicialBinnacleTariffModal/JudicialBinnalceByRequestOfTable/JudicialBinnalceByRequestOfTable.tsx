import Checkbox from "@/ui/Checkbox"
import Container from "@/ui/Container"
import Table from "@/ui/Table"
import BodyCell from "@/ui/Table/BodyCell"
import Text from "@/ui/Text"
import { ColumProps } from "@/ui/Table/Table"

type JudicialBinnacleContentiousProcessTableProps = {
  RequestOfColumns: ColumProps[]
  RequestOfData: any[]
  onSelectOption: (data: any) => void
  tariffHistory: any[]
}

const JudicialBinnalceByRequestOfTable = ({ RequestOfColumns, RequestOfData, onSelectOption, tariffHistory }: JudicialBinnacleContentiousProcessTableProps) => {
  return (
    <Table columns={RequestOfColumns} top="230px">
      {RequestOfData.map((record: any, key: number) => (
        <tr key={key}>
          <BodyCell textAlign="center">
            <Checkbox
              onChange={() => onSelectOption(record)}
              // selected={tariffHistory.some((tariff: any) => tariff?.id === record?.id)}
            />
          </BodyCell>
          <BodyCell textAlign="center">{record?.code || '-'}</BodyCell>
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
                {record?.description || '-'}
              </Text.Body>
            </Container>
          </BodyCell>
          {Array.isArray(record?.tariffIntervalMatch)
            ? record?.tariffIntervalMatch.map((interval: any, index: number) => (
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
                      S/. {interval?.value || '-'}
                    </Text.Body>
                  </Container>
                </BodyCell>
              ))
            : null}
        </tr>
      ))}
    </Table>
  )
}

export default JudicialBinnalceByRequestOfTable