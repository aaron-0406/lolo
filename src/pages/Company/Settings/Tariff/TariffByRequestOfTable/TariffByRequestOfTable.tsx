import { TariffType } from '@/types/config/tariff.type'
import Container from '@/ui/Container'
import EmptyState from '@/ui/EmptyState'
import Table from '@/ui/Table'
import BodyCell from '@/ui/Table/BodyCell'
import EmptyStateCell from '@/ui/Table/EmptyStateCell'
import { ColumProps } from '@/ui/Table/Table'
import Text from '@/ui/Text'

type TariffByRequestOfTableProps = {
  RequestOfColumns: ColumProps[]
  RequestOfData: TariffType[]
}

const TariffByRequestOfTable = ( { RequestOfColumns, RequestOfData } : TariffByRequestOfTableProps) => {
  return (
    <Container width="100%" height="calc(100% - 200px)" padding="20px">
      <Table
        columns={RequestOfColumns}
        top="100px"
        isArrayEmpty={!RequestOfData.length}
        emptyState={
          <EmptyStateCell colSpan={RequestOfColumns.length}>
            <EmptyState
              title="Recurso no encontrado"
              description="No se encontraron los datos solicitados. Por favor, intente con otros filtros."
            />
          </EmptyStateCell>
        }
        emptyFirstState={
          <EmptyStateCell colSpan={RequestOfColumns.length}>
            <EmptyState title="Recurso no encontrado" description="Aún no se han registrado tipos de direcciones" />
          </EmptyStateCell>
        }
      >
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
                        S/. {interval?.value || '-'}
                      </Text.Body>
                    </Container>
                  </BodyCell>
                ))
              : null}
          </tr>
        ))}
      </Table>
    </Container>
  ) 
}

export default TariffByRequestOfTable