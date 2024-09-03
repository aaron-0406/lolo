import { tariffCustomTableColumns } from "./utils/columns"
import { TariffType } from "@/types/config/tariff.type"
import { useState } from "react"
import Table from "@/ui/Table"
import BodyCell from "@/ui/Table/BodyCell"
import Text from "@/ui/Text"
import Container from "@/ui/Container"
import Button from "@/ui/Button"
import EmptyState from "@/ui/EmptyState"
import EmptyStateCell from "@/ui/Table/EmptyStateCell"
import useModal from "@/hooks/useModal"
import TariffModal from "../Modals/TariffModal"
import DeleteTariffModal from "../Modals/DeleteTariffModal"

type TariffCustomTableProps = {
  customTariffData: TariffType[]
  type: string
}

const TariffCustomTable = ({
  customTariffData,
  type
}: TariffCustomTableProps) => {
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
    <Container width="100%" height="calc(100% - 100px)" padding="20px">
      <Table
        columns={tariffCustomTableColumns}
        isArrayEmpty={!customTariffData.length}
        emptyState={
          <EmptyStateCell colSpan={tariffCustomTableColumns.length}>
            <EmptyState
              title="Recurso no encontrado"
              description="No se encontraron los datos solicitados. Por favor, intente con otros filtros."
            />
          </EmptyStateCell>
        }
        emptyFirstState={
          <EmptyStateCell colSpan={tariffCustomTableColumns.length}>
            <EmptyState title="Recurso no encontrado" description="Aún no se han registrado tarifas personalizadas" />
          </EmptyStateCell>
        }
      >
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
                    {record?.description ?? '-'}
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
                <BodyCell>
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
                </BodyCell>
              </tr>
            ))
          : null}
      </Table>
      <Container display="flex" justifyContent="center" alignItems="center" height="100px">
        <Button
          width="100%"
          permission="P43-01"
          label="Agregar tarifa personalizada"
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

export default TariffCustomTable

