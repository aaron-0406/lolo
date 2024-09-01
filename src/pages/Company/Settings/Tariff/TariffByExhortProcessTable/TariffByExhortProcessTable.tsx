import Container from "@/ui/Container"
import Table from "@/ui/Table"
import BodyCell from "@/ui/Table/BodyCell"
import Text from "@/ui/Text"
import { judicialBinnacleByExhortProcessColumns } from './utils/columns'
import { TariffType } from "@/types/config/tariff.type"
import Button from "@/ui/Button"
import EmptyStateCell from "@/ui/Table/EmptyStateCell"
import EmptyState from "@/ui/EmptyState"


type TariffByExhortProcessTableProps = {
  byExhortProcessData: TariffType[]
}

const TariffByExhortProcessTable = ({
  byExhortProcessData,
}: TariffByExhortProcessTableProps) => {
  return (
    <Container width="100%" height="calc(100% - 200px)" padding="20px">
      <Table
        columns={judicialBinnacleByExhortProcessColumns}
        top="100px"
        isArrayEmpty={!byExhortProcessData.length}
        emptyState={
          <EmptyStateCell colSpan={judicialBinnacleByExhortProcessColumns.length}>
            <EmptyState
              title="Recurso no encontrado"
              description="No se encontraron los datos solicitados. Por favor, intente con otros filtros."
            />
          </EmptyStateCell>
        }
        emptyFirstState={
          <EmptyStateCell colSpan={judicialBinnacleByExhortProcessColumns.length}>
            <EmptyState title="Recurso no encontrado" description="Aún no se han registrado procesos de exhorto" />
          </EmptyStateCell>
        }
      >
        {byExhortProcessData.length
          ? byExhortProcessData.map((record: any, key: number) => (
              <tr key={key}>
                <BodyCell textAlign="center">
                  <Text.Body size="m" weight="regular">
                    {' '}
                    -{' '}
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
                      {record?.description ?? '-'}
                    </Text.Body>
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
                <BodyCell textAlign="center">
                  <Container display="flex" gap="10px" alignItems="center" justifyContent="center">
                    <Button shape="round" trailingIcon="ri-edit-line" onClick={() => console.log('Editar')} />
                    <Button
                      onClick={() => {}}
                      messageTooltip="Eliminar tipo de dirección"
                      shape="round"
                      size="small"
                      leadingIcon="ri-delete-bin-line"
                      display="danger"
                    />
                  </Container>
                </BodyCell>
              </tr>
            ))
          : null}
      </Table>
      <Container display="flex" justifyContent="center" alignItems="center" height="100px">
        <Button
          width="100%"
          label="Agregar proceso de exhorto"
          trailingIcon="ri-add-line"
          // onClick={onAddCustomTariff}
        />
      </Container>
    </Container>
  )
}

export default TariffByExhortProcessTable
