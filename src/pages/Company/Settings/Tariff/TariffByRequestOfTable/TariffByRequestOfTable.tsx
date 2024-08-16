import { TariffType } from '@/types/config/tariff.type'
import Container from '@/ui/Container'
import Table from '@/ui/Table'
import BodyCell from '@/ui/Table/BodyCell'
import { ColumProps } from '@/ui/Table/Table'
import Text from '@/ui/Text'

type TariffByRequestOfTableProps = {
  RequestOfColumns: ColumProps[]
  RequestOfData: TariffType[]
}

const TariffByRequestOfTable = ( { RequestOfColumns, RequestOfData } : TariffByRequestOfTableProps) => {
  return (
    <Table columns={RequestOfColumns}>
      {RequestOfData.map((record: any, key: number) => (
        <tr key={key}>
          <BodyCell textAlign="center">{key + 1}</BodyCell>
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
                      {interval?.value || '-'}
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

export default TariffByRequestOfTable