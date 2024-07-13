import { useLoloContext } from "@/contexts/LoloProvider"
import { useState } from "react"

import Container from "@/ui/Container"
import useModal from "@/hooks/useModal"
import Table from "@/ui/Table"
import { JudicialUseOfPropertyColumns } from "./utils/columns"
import EmptyStateCell from "@/ui/Table/EmptyStateCell"
import EmptyState from "@/ui/EmptyState"
import { getJudicialUseOfPropertyByCHB } from "@/services/judicial/judicial-use-of-property.service"
import { JudicialUseOfPropertyType } from "@/types/judicial/judicial-use-of-property.type"
import { KEY_JUDICIAL_USE_OF_PROPERTY_CACHE } from "./utils/judicial-use-of-property.cache"
import { AxiosResponse } from "axios"
import { useQuery } from "react-query"
import notification from "@/ui/notification"
import BodyCell from "@/ui/Table/BodyCell"
import UseOfPropertyModal from "../Modals/UseOfPropertyModal"
import Button from "@/ui/Button"
import DeleteUseOfProperty from "../Modals/DeleteUseOfPropertyModal/DeleteUseOfPropertyModal"
import moment from "moment"

const JudicialUseOfPropertyTable = () => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()  

  const [ idUseOfProperty, setIdUseOfProperty ] = useState<number | undefined>(undefined)

  const { visible: visibleModalUseOfProperty, showModal: showModalUseOfProperty, hideModal: hideModalUseOfProperty } = useModal()
  const { visible: visibleModalDeleteUseOfProperty, showModal: showModalDeleteUseOfProperty, hideModal: hideModalDeleteUseOfProperty } = useModal()

  const { isLoading, data } = useQuery<AxiosResponse<Array<JudicialUseOfPropertyType>, Error>>(
    [KEY_JUDICIAL_USE_OF_PROPERTY_CACHE, parseInt(chb.length ? chb : '0')],
    async () => {
      return await getJudicialUseOfPropertyByCHB(parseInt(chb.length ? chb : '0'))
    },
    {
      onError: (error: any) => {
        notification({
          type: 'error',
          message: error.response?.data.message ?? 'Error al obtener los usos de propiedad judicial',
        })
      },
    }
  )

  const onOpenModalUseOfProperty = (id: number) => {
    setIdUseOfProperty(id)
    showModalUseOfProperty()
  }
  const onOpenDeleteModalUseOfProperty = (id: number) => { 
    setIdUseOfProperty(id)
    showModalDeleteUseOfProperty()
  }

  const judicialUseOfProperty = data?.data ?? []
  
  return (
    <Container width="100%" height="calc(100% - 112px)" padding="20px">
      <Table
        top="260px"
        columns={JudicialUseOfPropertyColumns}
        loading={isLoading}
        isArrayEmpty={!judicialUseOfProperty.length}
        emptyState={
          <EmptyStateCell colSpan={JudicialUseOfPropertyColumns.length}>
            <EmptyState
              title="No hay recursos disponibles"
              description="No se encontraron usos de propiedad judicial disponibles en este momento."
            />
          </EmptyStateCell>
        }
        emptyFirstState={
          <EmptyStateCell colSpan={JudicialUseOfPropertyColumns.length}>
            <EmptyState
              title="No hay recursos disponibles"
              description="No se encontraron usos de propiedad judicial disponibles en este momento."
            />
          </EmptyStateCell>
        }
      >
        {judicialUseOfProperty.map((useOfProperty, index) => {
          return (
            <tr key={useOfProperty.id}>
              <BodyCell textAlign="center">{`${index + 1}`}</BodyCell>
              <BodyCell textAlign="center">{useOfProperty.name}</BodyCell>
              <BodyCell textAlign="center">{`${moment(useOfProperty.createdAt).format('DD-MM-YYYY') || ''}`}</BodyCell>
              <BodyCell textAlign="center">
                <Container display="flex" gap="10px" height="100%" justifyContent="center" alignItems="center">

                <Button
                  onClick={() => {
                    onOpenModalUseOfProperty(useOfProperty.id)
                  }}
                  messageTooltip="Editar uso de propiedad judicial"
                  shape="round"
                  size="small"
                  leadingIcon="ri-pencil-fill"
                  permission="P28-02"
                />
                <Button
                  onClick={() => {
                    onOpenDeleteModalUseOfProperty(useOfProperty.id)
                  }}
                  messageTooltip="Eliminar uso de propiedad judicial"
                  shape="round"
                  size="small"
                  leadingIcon="ri-delete-bin-line"
                  permission="P28-03"
                  display="danger"
                />
                </Container>
              </BodyCell>
            </tr>
          )
        })}
      </Table>
      {visibleModalUseOfProperty ? (
        <UseOfPropertyModal id={idUseOfProperty} isOpen={visibleModalUseOfProperty} onClose={hideModalUseOfProperty} />
      ) : null}

      {
        visibleModalDeleteUseOfProperty ? (
          <DeleteUseOfProperty id={idUseOfProperty ?? 0} isOpen={visibleModalDeleteUseOfProperty} onClose={hideModalDeleteUseOfProperty} />
        ) : null
      }
    </Container>
  )
}

export default JudicialUseOfPropertyTable