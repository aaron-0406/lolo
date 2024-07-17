import { useLoloContext } from "@/contexts/LoloProvider"
import { useState } from "react"
import useModal from "@/hooks/useModal"

import Container from "@/ui/Container"
import Table from "@/ui/Table"
import EmptyStateCell from "@/ui/Table/EmptyStateCell"
import EmptyState from "@/ui/EmptyState"
import Button from "@/ui/Button"
import notification from "@/ui/notification"
import BodyCell from "@/ui/Table/BodyCell"

import { AxiosResponse } from "axios"
import { useQuery } from "react-query"
import { JudicialCollateralChargesEncumbrancesTypeLoadColumns } from "./utils/columns"
import moment from "moment"
import { KEY_JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TYPE_LOAD_CACHE } from "./utils/judicial-collateral-charges-encumbrances-type-load.cache"

import { JudicialCollateralChargesEncumbrancesTypeLoadType } from "@/types/judicial/judicial-collateral-charges-encumbrances-type-load.type"

import { getJudicialCollateralChargesEncumbrancesTypeLoadByCHB } from "@/services/judicial/judicial-collateral-charges-encumbrances-type-load.service"

import JudicialChargesEncumbrancesTypeLoadTableModal from "../Modals/JudicialCollateralChargesEncumbrancesTypeLoadModal"
import DeleteJudicialChargesEncumbrancesTypeLoadTable from "../Modals/DeleteJudicialCollateralChargesEncumbrancesTypeLoadModal"

const JudicialJudicialChargesEncumbrancesTypeLoadTableTable = () => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()  

  const [ idJudicialChargesEncumbrancesTypeLoadTable, setIdJudicialChargesEncumbrancesTypeLoadTable ] = useState<number | undefined>(undefined)

  const {
    visible: visibleModalJudicialChargesEncumbrancesTypeLoadTable,
    showModal: showModalJudicialChargesEncumbrancesTypeLoadTable,
    hideModal: hideModalJudicialChargesEncumbrancesTypeLoadTable,
  } = useModal()
  const {
    visible: visibleModalDeleteJudicialChargesEncumbrancesTypeLoadTable,
    showModal: showModalDeleteJudicialChargesEncumbrancesTypeLoadTable,
    hideModal: hideModalDeleteJudicialChargesEncumbrancesTypeLoadTable,
  } = useModal()

  const { isLoading, data } = useQuery<AxiosResponse<Array<JudicialCollateralChargesEncumbrancesTypeLoadType>, Error>>(
    [KEY_JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TYPE_LOAD_CACHE, parseInt(chb.length ? chb : '0')],
    async () => {
      return await getJudicialCollateralChargesEncumbrancesTypeLoadByCHB(parseInt(chb.length ? chb : '0'))
    },
    {
      onError: (error: any) => {
        notification({
          type: 'error',
          message: error.response?.data.message ?? 'Error al obtener las tipos de cargas y gravámenes.',
        })
      },
    }
  )

  const onOpenModalJudicialChargesEncumbrancesTypeLoadTable = (id: number) => {
    setIdJudicialChargesEncumbrancesTypeLoadTable(id)
    showModalJudicialChargesEncumbrancesTypeLoadTable()
  }
  const onOpenDeleteModalJudicialChargesEncumbrancesTypeLoadTable = (id: number) => { 
    setIdJudicialChargesEncumbrancesTypeLoadTable(id)
    showModalDeleteJudicialChargesEncumbrancesTypeLoadTable()
  }

  const judicialJudicialChargesEncumbrancesTypeLoadTable = data?.data ?? []
  
  return (
    <Container width="100%" height="calc(100% - 112px)" padding="20px">
      <Table
        top="260px"
        columns={JudicialCollateralChargesEncumbrancesTypeLoadColumns}
        loading={isLoading}
        isArrayEmpty={!judicialJudicialChargesEncumbrancesTypeLoadTable.length}
        emptyState={
          <EmptyStateCell colSpan={JudicialCollateralChargesEncumbrancesTypeLoadColumns.length}>
            <EmptyState
              title="No hay recursos disponibles"
              description="No se encontraron tipos de cargas y gravámenes disponibles en este momento."
            />
          </EmptyStateCell>
        }
        emptyFirstState={
          <EmptyStateCell colSpan={JudicialCollateralChargesEncumbrancesTypeLoadColumns.length}>
            <EmptyState
              title="No hay recursos disponibles"
              description="No se encontraron tipos de cargas y gravámenes disponibles en este momento."
            />
          </EmptyStateCell>
        }
      >
        {judicialJudicialChargesEncumbrancesTypeLoadTable.map((JudicialChargesEncumbrancesTypeLoadTable, index) => {
          return (
            <tr key={JudicialChargesEncumbrancesTypeLoadTable.id}>
              <BodyCell textAlign="center">{`${index + 1}`}</BodyCell>
              <BodyCell textAlign="center">{JudicialChargesEncumbrancesTypeLoadTable.name}</BodyCell>
              <BodyCell textAlign="center">{`${
                moment(JudicialChargesEncumbrancesTypeLoadTable.createdAt).format('DD-MM-YYYY') || ''
              }`}</BodyCell>
              <BodyCell textAlign="center">
                <Container display="flex" gap="10px" height="100%" justifyContent="center" alignItems="center">
                  <Button
                    onClick={() => {
                      onOpenModalJudicialChargesEncumbrancesTypeLoadTable(JudicialChargesEncumbrancesTypeLoadTable.id)
                    }}
                    messageTooltip="Editar notaria"
                    shape="round"
                    size="small"
                    leadingIcon="ri-pencil-fill"
                    permission="P41-02"
                  />
                  <Button
                    onClick={() => {
                      onOpenDeleteModalJudicialChargesEncumbrancesTypeLoadTable(
                        JudicialChargesEncumbrancesTypeLoadTable.id
                      )
                    }}
                    messageTooltip="Eliminar notaria"
                    shape="round"
                    size="small"
                    leadingIcon="ri-delete-bin-line"
                    permission="P41-03"
                    display="danger"
                  />
                </Container>
              </BodyCell>
            </tr>
          )
        })}
      </Table>

      {visibleModalJudicialChargesEncumbrancesTypeLoadTable ? (
        <JudicialChargesEncumbrancesTypeLoadTableModal
          id={idJudicialChargesEncumbrancesTypeLoadTable}
          isOpen={visibleModalJudicialChargesEncumbrancesTypeLoadTable}
          onClose={hideModalJudicialChargesEncumbrancesTypeLoadTable}
        />
      ) : null}

      {visibleModalDeleteJudicialChargesEncumbrancesTypeLoadTable ? (
        <DeleteJudicialChargesEncumbrancesTypeLoadTable
          id={idJudicialChargesEncumbrancesTypeLoadTable ?? 0}
          isOpen={visibleModalDeleteJudicialChargesEncumbrancesTypeLoadTable}
          onClose={hideModalDeleteJudicialChargesEncumbrancesTypeLoadTable}
        />
      ) : null}
    </Container>
  )
}

export default JudicialJudicialChargesEncumbrancesTypeLoadTableTable