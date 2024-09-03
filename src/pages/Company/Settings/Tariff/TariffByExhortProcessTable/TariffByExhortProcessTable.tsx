import Container from "@/ui/Container"
import Table from "@/ui/Table"
import BodyCell from "@/ui/Table/BodyCell"
import Text from "@/ui/Text"
import { judicialBinnacleByExhortProcessColumns } from './utils/columns'
import { TariffType } from "@/types/config/tariff.type"
import Button from "@/ui/Button"
import EmptyStateCell from "@/ui/Table/EmptyStateCell"
import EmptyState from "@/ui/EmptyState"
import TariffModal from "../Modals/TariffModal"
import DeleteTariffModal from "../Modals/DeleteTariffModal"
import { useState } from "react"
import useModal from "@/hooks/useModal"


type TariffByExhortProcessTableProps = {
  byExhortProcessData: TariffType[]
  type: string
}

const TariffByExhortProcessTable = ({
  byExhortProcessData,
  type
}: TariffByExhortProcessTableProps) => {
  const [ tariff, setTariff ] = useState<TariffType | undefined>(undefined)
  const { visible: visibleTariffModal, showModal: showTariffModal, hideModal: hideTariffModal } = useModal()
  const { visible: visibleDeleteModal, showModal: showDeleteModal, hideModal: hideDeleteModal } = useModal()
  
  const onCloseTariffModal = () => {
    setTariff(undefined)
    hideTariffModal()
  }
  const onEditTariffModal = ( tariff: TariffType) => {
    setTariff(tariff)
    showTariffModal()
  }
  const onOpenTariffModal = () => {
    showTariffModal()
  }

  const onOpentDeleteModal = (tariff: TariffType) => {
    setTariff(tariff)
    showDeleteModal()
  }

  const onCloseDeleteModal = () => {
    setTariff(undefined)
    hideDeleteModal()
  } 
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
                      {Array.isArray(record?.tariffIntervalMatch)
                        ? Number(record?.tariffIntervalMatch[0]?.value || '0').toFixed(2)
                        : '-'}
                    </Text.Number>
                  </Container>
                </BodyCell>
                <BodyCell textAlign="center">
                  <Container display="flex" gap="10px" alignItems="center" justifyContent="center">
                    <Container display="flex" gap="10px" alignItems="center" justifyContent="center">
                      <Button shape="round" trailingIcon="ri-edit-line" permission="P43-02" onClick={() => onEditTariffModal(record)} />
                      <Button
                        onClick={() => onOpentDeleteModal(record)}
                        messageTooltip="Eliminar tipo de dirección"
                        shape="round"
                        permission="P43-03"
                        leadingIcon="ri-delete-bin-line"
                        display="danger"
                      />
                    </Container>
                  </Container>
                </BodyCell>
              </tr>
            ))
          : null}
      </Table>
      <Container display="flex" justifyContent="center" alignItems="center" height="100px">
        <Button
          width="100%"
          label="Agregar tarifa personalizada"
          permission="P43-01"
          trailingIcon="ri-add-line"
          onClick={onOpenTariffModal}
        />
      </Container>
      {visibleTariffModal ? (
        <TariffModal tariff={tariff} visible={visibleTariffModal} onClose={onCloseTariffModal} type={type} />
      ) : null}
      {visibleDeleteModal ? (
        <DeleteTariffModal visible={visibleDeleteModal} onClose={onCloseDeleteModal} tariff={tariff} type={type} />
      ) : null}
    </Container>
  )
}

export default TariffByExhortProcessTable
