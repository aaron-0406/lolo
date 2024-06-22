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
import { JudicialRegisterOfficeColumns } from "./utils/columns"
import moment from "moment"
import { KEY_JUDICIAL_REGISTER_OFFICE_CACHE } from "./utils/judicial-register-office.cache"

import { JudicialRegisterOfficeType } from "@/types/judicial/judicial-register-office.type"

import { getJudicialRegisterOfficeByCHB } from "@/services/judicial/judicial-register-office.service"

import RegisterOfficeModal from "../Modals/RegisterOfficeModal/RegisterOfficeModal"
import DeleteRegisterOffice from "../Modals/DeleteRegisterOfficeModal"

const JudicialRegisterOfficeTable = () => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()  

  const [ idRegisterOffice, setIdRegisterOffice ] = useState<number | undefined>(undefined)

  const {
    visible: visibleModalRegisterOffice,
    showModal: showModalRegisterOffice,
    hideModal: hideModalRegisterOffice,
  } = useModal()
  const {
    visible: visibleModalDeleteRegisterOffice,
    showModal: showModalDeleteRegisterOffice,
    hideModal: hideModalDeleteRegisterOffice,
  } = useModal()

  const { isLoading, data } = useQuery<AxiosResponse<Array<JudicialRegisterOfficeType>, Error>>(
    [KEY_JUDICIAL_REGISTER_OFFICE_CACHE, parseInt(chb.length ? chb : '0')],
    async () => {
      return await getJudicialRegisterOfficeByCHB(parseInt(chb.length ? chb : '0'))
    },
    {
      onError: (error: any) => {
        notification({
          type: 'error',
          message: error.response?.data.message ?? 'Error al obtener las oficinas registrales.',
        })
      },
    }
  )

  const onOpenModalRegisterOffice = (id: number) => {
    setIdRegisterOffice(id)
    showModalRegisterOffice()
  }
  const onOpenDeleteModalRegisterOffice = (id: number) => { 
    setIdRegisterOffice(id)
    showModalDeleteRegisterOffice()
  }

  const judicialRegisterOffice = data?.data ?? []
  
  return (
    <Container width="100%" height="calc(100% - 112px)" padding="20px">
      <Table
        top="260px"
        columns={JudicialRegisterOfficeColumns}
        loading={isLoading}
        isArrayEmpty={!judicialRegisterOffice.length}
        emptyState={
          <EmptyStateCell colSpan={JudicialRegisterOfficeColumns.length}>
            <EmptyState
              title="No hay recursos disponibles"
              description="No se encontraron oficinas registrales disponibles en este momento."
            />
          </EmptyStateCell>
        }
        emptyFirstState={
          <EmptyStateCell colSpan={JudicialRegisterOfficeColumns.length}>
            <EmptyState
              title="No hay recursos disponibles"
              description="No se encontraron oficinas registrales disponibles en este momento."
            />
          </EmptyStateCell>
        }
      >
        {judicialRegisterOffice.map((RegisterOffice, index) => {
          return (
            <tr key={RegisterOffice.id}>
              <BodyCell textAlign="center">{`${index + 1}`}</BodyCell>
              <BodyCell textAlign="center">{RegisterOffice.name}</BodyCell>
              <BodyCell textAlign="center">{`${moment(RegisterOffice.createdAt).format('DD-MM-YYYY') || ''}`}</BodyCell>
              <BodyCell textAlign="center">
                <Container display="flex" gap="10px" height="100%" justifyContent="center" alignItems="center">

                <Button
                  onClick={() => {
                    onOpenModalRegisterOffice(RegisterOffice.id)
                  }}
                  messageTooltip="Editar oficina registral"
                  shape="round"
                  size="small"
                  leadingIcon="ri-pencil-fill"
                  permission="P40-02"
                />
                <Button
                  onClick={() => {
                    onOpenDeleteModalRegisterOffice(RegisterOffice.id)
                  }}
                  messageTooltip="Eliminar oficina registral"
                  shape="round"
                  size="small"
                  leadingIcon="ri-delete-bin-line"
                  permission="P40-03"
                  display="danger"
                />
                </Container>
              </BodyCell>
            </tr>
          )
        })}
      </Table>

      {visibleModalRegisterOffice ? (
        <RegisterOfficeModal id={idRegisterOffice} isOpen={visibleModalRegisterOffice} onClose={hideModalRegisterOffice} />
      ) : null}

      {
        visibleModalDeleteRegisterOffice ? (
          <DeleteRegisterOffice id={idRegisterOffice ?? 0} isOpen={visibleModalDeleteRegisterOffice} onClose={hideModalDeleteRegisterOffice} />
        ) : null
      }
    </Container>
  )
}

export default JudicialRegisterOfficeTable