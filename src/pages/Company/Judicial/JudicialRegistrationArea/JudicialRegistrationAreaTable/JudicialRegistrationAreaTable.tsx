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
import { JudicialRegistrationAreaColumns } from "./utils/columns"
import moment from "moment"
import { KEY_JUDICIAL_REGISTRATION_AREA_CACHE } from "./utils/judicial-registration-area.cache"

import { JudicialRegistrationAreaType } from "@/types/judicial/judicial-registration-area.type"

import { getJudicialRegistrationAreaByCHB } from "@/services/judicial/judicial-registration-area.service"

import RegistrationAreaModal from "../Modals/RegistrationAreaModal/RegistrationAreaModal"
import DeleteRegistrationArea from "../Modals/DeleteRegistrationAreaModal/DeleteRegistrationAreaModal"

const JudicialRegistrationAreaTable = () => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()  

  const [ idRegistrationArea, setIdRegistrationArea ] = useState<number | undefined>(undefined)

  const {
    visible: visibleModalRegistrationArea,
    showModal: showModalRegistrationArea,
    hideModal: hideModalRegistrationArea,
  } = useModal()
  const {
    visible: visibleModalDeleteRegistrationArea,
    showModal: showModalDeleteRegistrationArea,
    hideModal: hideModalDeleteRegistrationArea,
  } = useModal()

  const { isLoading, data } = useQuery<AxiosResponse<Array<JudicialRegistrationAreaType>, Error>>(
    [KEY_JUDICIAL_REGISTRATION_AREA_CACHE, parseInt(chb.length ? chb : '0')],
    async () => {
      return await getJudicialRegistrationAreaByCHB(parseInt(chb.length ? chb : '0'))
    },
    {
      onError: (error: any) => {
        notification({
          type: 'error',
          message: error.response?.data.message ?? 'Error al obtener los zonas registrales.',
        })
      },
    }
  )

  const onOpenModalRegistrationArea = (id: number) => {
    setIdRegistrationArea(id)
    showModalRegistrationArea()
  }
  const onOpenDeleteModalRegistrationArea = (id: number) => { 
    setIdRegistrationArea(id)
    showModalDeleteRegistrationArea()
  }

  const judicialRegistrationArea = data?.data ?? []
  
  return (
    <Container width="100%" height="calc(100% - 112px)" padding="20px">
      <Table
        top="260px"
        columns={JudicialRegistrationAreaColumns}
        loading={isLoading}
        isArrayEmpty={!judicialRegistrationArea.length}
        emptyState={
          <EmptyStateCell colSpan={JudicialRegistrationAreaColumns.length}>
            <EmptyState
              title="No hay recursos disponibles"
              description="No se encontraron zonas registrales disponibles en este momento."
            />
          </EmptyStateCell>
        }
        emptyFirstState={
          <EmptyStateCell colSpan={JudicialRegistrationAreaColumns.length}>
            <EmptyState
              title="No hay recursos disponibles"
              description="No se encontraron zonas registrales disponibles en este momento."
            />
          </EmptyStateCell>
        }
      >
        {judicialRegistrationArea.map((RegistrationArea, index) => {
          return (
            <tr key={RegistrationArea.id}>
              <BodyCell textAlign="center">{`${index + 1}`}</BodyCell>
              <BodyCell textAlign="center">{RegistrationArea.name}</BodyCell>
              <BodyCell textAlign="center">{`${moment(RegistrationArea.createdAt).format('DD-MM-YYYY') || ''}`}</BodyCell>
              <BodyCell textAlign="center">
                <Container display="flex" gap="10px" height="100%" justifyContent="center" alignItems="center">

                <Button
                  onClick={() => {
                    onOpenModalRegistrationArea(RegistrationArea.id)
                  }}
                  messageTooltip="Editar zona registral"
                  shape="round"
                  size="small"
                  leadingIcon="ri-pencil-fill"
                  permission="P29-02"
                />
                <Button
                  onClick={() => {
                    onOpenDeleteModalRegistrationArea(RegistrationArea.id)
                  }}
                  messageTooltip="Eliminar zona registral"
                  shape="round"
                  size="small"
                  leadingIcon="ri-delete-bin-line"
                  permission="P29-03"
                  display="danger"
                />
                </Container>
              </BodyCell>
            </tr>
          )
        })}
      </Table>

      {visibleModalRegistrationArea ? (
        <RegistrationAreaModal id={idRegistrationArea} isOpen={visibleModalRegistrationArea} onClose={hideModalRegistrationArea} />
      ) : null}

      {
        visibleModalDeleteRegistrationArea ? (
          <DeleteRegistrationArea id={idRegistrationArea ?? 0} isOpen={visibleModalDeleteRegistrationArea} onClose={hideModalDeleteRegistrationArea} />
        ) : null
      }
    </Container>
  )
}

export default JudicialRegistrationAreaTable