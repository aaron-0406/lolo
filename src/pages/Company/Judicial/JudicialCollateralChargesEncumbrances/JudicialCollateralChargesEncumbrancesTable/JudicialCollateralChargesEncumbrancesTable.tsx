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
import { JudicialCollateralChargesEncumbrancesColumns } from "./utils/columns"
import moment from "moment"
import { KEY_JUDICIAL_CHARGES_ENCUMBRANCES_CACHE } from "./utils/judicial-charges-encumbrances.cache"

import { JudicialCollateralChargesEncumbrancesType } from "@/types/judicial/judicial-collateral-charges-encumbrances.type"

import { getJudicialCollateralChargesEncumbrancesByCollateral } from "@/services/judicial/judicial-collateral-charges-encumbrances.service"

import ChargesEncumbrancesModal from "../Modals/JudicialChargesEncumbrancesModal"
import DeleteChargesEncumbrances from "../Modals/DeleteJudicialCollateralChargesEncumbrancesModal"
import { useParams } from "react-router-dom"
import Text from "@/ui/Text"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { device } from "@/breakpoints/responsive"

const JudicialChargesEncumbrancesTable = () => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()  

  const collateralCode = useParams().collateralCode ?? '' 
  const greaterThanTabletS = useMediaQuery(device.tabletS)
  
  const [ idChargesEncumbrances, setIdChargesEncumbrances ] = useState<number | undefined>(undefined)

  const {
    visible: visibleModalChargesEncumbrances,
    showModal: showModalChargesEncumbrances,
    hideModal: hideModalChargesEncumbrances,
  } = useModal()
  const {
    visible: visibleModalDeleteChargesEncumbrances,
    showModal: showModalDeleteChargesEncumbrances,
    hideModal: hideModalDeleteChargesEncumbrances,
  } = useModal()

  const { isLoading, data } = useQuery<AxiosResponse<Array<JudicialCollateralChargesEncumbrancesType>, Error>>(
    [KEY_JUDICIAL_CHARGES_ENCUMBRANCES_CACHE, parseInt(chb.length ? chb : '0')],
    async () => {
      return await getJudicialCollateralChargesEncumbrancesByCollateral(Number(collateralCode))
    },
    {
      onError: (error: any) => {
        notification({
          type: 'error',
          message: error.response?.data.message ?? 'Error al obtener las notarias.',
        })
      },
    }
  )

  const onOpenModalChargesEncumbrances = (id: number) => {
    setIdChargesEncumbrances(id)
    showModalChargesEncumbrances()
  }
  const onOpenDeleteModalChargesEncumbrances = (id: number) => { 
    setIdChargesEncumbrances(id)
    showModalDeleteChargesEncumbrances()
  }

  const judicialChargesEncumbrances = data?.data ?? []
  
  return (
    <Container width="100%" height="calc(100% - 112px)" padding="0px 20px 20px 20px">
      <Table
        top="260px"
        columns={JudicialCollateralChargesEncumbrancesColumns}
        loading={isLoading}
        isArrayEmpty={!judicialChargesEncumbrances.length}
        emptyState={
          <EmptyStateCell colSpan={JudicialCollateralChargesEncumbrancesColumns.length}>
            <EmptyState
              title="No hay recursos disponibles"
              description="No se encontraron notarias disponibles en este momento."
            />
          </EmptyStateCell>
        }
        emptyFirstState={
          <EmptyStateCell colSpan={JudicialCollateralChargesEncumbrancesColumns.length}>
            <EmptyState
              title="No hay recursos disponibles"
              description="No se encontraron notarias disponibles en este momento."
            />
          </EmptyStateCell>
        }
      >
        {Array.isArray(judicialChargesEncumbrances)
          ? judicialChargesEncumbrances.map((ChargesEncumbrances, index) => {
              return (
                <tr key={ChargesEncumbrances.id}>
                  <BodyCell textAlign="center">{`${index + 1}`}</BodyCell>
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
                        {ChargesEncumbrances.descriptionOfLoad || '-'}
                      </Text.Body>
                    </Container>
                  </BodyCell>
                  <BodyCell textAlign="center">
                    <Container
                      padding="10px"
                      width="100%"
                      maxWidth='300px'
                      textOverflow="ellipsis"
                      whiteSpace="nowrap"
                      overFlowX="hidden"
                      data-tooltip-content={ChargesEncumbrances.registrationSeat}
                      data-tooltip-id="cell-tooltip"
                    >
                      <Text.Body size="m" weight="regular">
                        {ChargesEncumbrances.registrationSeat}
                      </Text.Body>
                    </Container>
                  </BodyCell>
                  <BodyCell textAlign="center">{`${
                    moment(ChargesEncumbrances.registrationDate).format('DD-MM-YYYY') || ''
                  }`}</BodyCell>
                  <BodyCell textAlign="center">{`${
                    moment(ChargesEncumbrances.appraisalDate).format('DD-MM-YYYY') || ''
                  }`}</BodyCell>
                  <BodyCell textAlign="center">{`${
                    moment(ChargesEncumbrances.createdAt).format('DD-MM-YYYY') || ''
                  }`}</BodyCell>
                  <BodyCell textAlign="center">
                    <Container display="flex" gap="10px" height="100%" justifyContent="center" alignItems="center">
                      <Button
                        onClick={() => {
                          onOpenModalChargesEncumbrances(ChargesEncumbrances.id)
                        }}
                        messageTooltip="Editar notaria"
                        shape="round"
                        size="small"
                        leadingIcon="ri-pencil-fill"
                        permission="P41-02"
                      />
                      <Button
                        onClick={() => {
                          onOpenDeleteModalChargesEncumbrances(ChargesEncumbrances.id)
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
            })
          : null}
      </Table>

      {visibleModalChargesEncumbrances ? <ChargesEncumbrancesModal id={idChargesEncumbrances} isOpen={visibleModalChargesEncumbrances} onClose={hideModalChargesEncumbrances} /> : null}

      {visibleModalDeleteChargesEncumbrances ? (
        <DeleteChargesEncumbrances id={idChargesEncumbrances ?? 0} isOpen={visibleModalDeleteChargesEncumbrances} onClose={hideModalDeleteChargesEncumbrances} />
      ) : null}
    </Container>
  )
}

export default JudicialChargesEncumbrancesTable