import { useLoloContext } from '@/contexts/LoloProvider'
import { useState } from 'react'
import useModal from '@/hooks/useModal'

import Container from '@/ui/Container'
import Table from '@/ui/Table'
import EmptyStateCell from '@/ui/Table/EmptyStateCell'
import EmptyState from '@/ui/EmptyState'
import Button from '@/ui/Button'
import notification from '@/ui/notification'
import BodyCell from '@/ui/Table/BodyCell'

import { AxiosResponse } from 'axios'
import { useQuery } from 'react-query'
import { JudicialNotaryColumns } from './utils/columns'
import moment from 'moment'
import { KEY_JUDICIAL_NOTARY_CACHE } from './utils/judicial-notary.cache'

import { JudicialNotaryType } from '@/types/judicial/judicial-notary.type'

import { getJudicialNotaryByCHB } from '@/services/judicial/judicial-notary.service'

import NotaryModal from '../Modals/NotaryModal'
import DeleteNotary from '../Modals/DeleteNotaryModal'

const JudicialNotaryTable = () => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const [idNotary, setIdNotary] = useState<number | undefined>(undefined)

  const { visible: visibleModalNotary, showModal: showModalNotary, hideModal: hideModalNotary } = useModal()
  const {
    visible: visibleModalDeleteNotary,
    showModal: showModalDeleteNotary,
    hideModal: hideModalDeleteNotary,
  } = useModal()

  const { isLoading, data } = useQuery<AxiosResponse<Array<JudicialNotaryType>, Error>>(
    [KEY_JUDICIAL_NOTARY_CACHE, parseInt(chb.length ? chb : '0')],
    async () => {
      return await getJudicialNotaryByCHB(parseInt(chb.length ? chb : '0'))
    },
    {
      onError: (error: any) => {
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )

  const onOpenModalNotary = (id: number) => {
    setIdNotary(id)
    showModalNotary()
  }
  const onOpenDeleteModalNotary = (id: number) => {
    setIdNotary(id)
    showModalDeleteNotary()
  }

  const judicialNotary = data?.data ?? []

  return (
    <Container width="100%" height="calc(100% - 112px)" padding="20px">
      <Table
        top="260px"
        columns={JudicialNotaryColumns}
        loading={isLoading}
        isArrayEmpty={!judicialNotary.length}
        emptyState={
          <EmptyStateCell colSpan={JudicialNotaryColumns.length}>
            <EmptyState
              title="No hay recursos disponibles"
              description="No se encontraron notarias disponibles en este momento."
            />
          </EmptyStateCell>
        }
        emptyFirstState={
          <EmptyStateCell colSpan={JudicialNotaryColumns.length}>
            <EmptyState
              title="No hay recursos disponibles"
              description="No se encontraron notarias disponibles en este momento."
            />
          </EmptyStateCell>
        }
      >
        {judicialNotary.map((Notary, index) => {
          return (
            <tr key={Notary.id}>
              <BodyCell textAlign="center">{`${index + 1}`}</BodyCell>
              <BodyCell textAlign="center">{Notary.name}</BodyCell>
              <BodyCell textAlign="center">{`${moment(Notary.createdAt).format('DD-MM-YYYY') || ''}`}</BodyCell>
              <BodyCell textAlign="center">
                <Container display="flex" gap="10px" height="100%" justifyContent="center" alignItems="center">
                  <Button
                    onClick={() => {
                      onOpenModalNotary(Notary.id)
                    }}
                    messageTooltip="Editar notaria"
                    shape="round"
                    size="small"
                    leadingIcon="ri-pencil-fill"
                    permission="P41-02"
                  />
                  <Button
                    onClick={() => {
                      onOpenDeleteModalNotary(Notary.id)
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

      {visibleModalNotary ? <NotaryModal id={idNotary} isOpen={visibleModalNotary} onClose={hideModalNotary} /> : null}

      {visibleModalDeleteNotary ? (
        <DeleteNotary id={idNotary ?? 0} isOpen={visibleModalDeleteNotary} onClose={hideModalDeleteNotary} />
      ) : null}
    </Container>
  )
}

export default JudicialNotaryTable
