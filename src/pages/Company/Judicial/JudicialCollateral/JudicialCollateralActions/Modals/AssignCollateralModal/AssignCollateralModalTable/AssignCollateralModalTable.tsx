import Table from "@/ui/Table"
import judicialCaseFileHasCollateralColumns from "./utils/columns"
import notification from "@/ui/notification"

import { useQuery } from "react-query"
import { useLoloContext } from "@/contexts/LoloProvider"
import { getAllRelatedCaseFileAssociatedToCollateral } from "@/services/judicial/judicial-file-case-has-collateral.service"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Container from "@/ui/Container"
import { AxiosResponse } from "axios"
import { JudicialCaseFileType } from "@/types/judicial/judicial-case-file.type"
import EmptyStateCell from "@/ui/Table/EmptyStateCell"
import EmptyState from "@/ui/EmptyState"
import BodyCell from "@/ui/Table/BodyCell"
import Checkbox from "@/ui/Checkbox"
import moment from "moment"
import { useFormContext } from "react-hook-form"

const AssignCollateralModalTable = () => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const code = useParams().code ?? ''
  const collateralCode = useParams().collateralCode ?? ''
  const [judicialCaseFileHasCollateral, setJudicialCaseFileHasCollateral] = useState<
    Array<JudicialCaseFileType & { hasCollateral: boolean; client: { id: number; name: string } }>
  >([])

  const {
    setValue,
  } = useFormContext(); 

  const onChangeJudicialCaseFileHasCollateral = (id: number) => {
    const newJudicialCaseFileHasCollateral = judicialCaseFileHasCollateral.map((caseFile) => {
      if (caseFile.id === id) {
        return { ...caseFile, hasCollateral: !caseFile.hasCollateral }
      }
      return caseFile
    })
    setValue('judicialCaseFileWithCollateral', newJudicialCaseFileHasCollateral)
    setJudicialCaseFileHasCollateral(newJudicialCaseFileHasCollateral)
  }


  const { refetch } = useQuery<
    AxiosResponse<Array<JudicialCaseFileType & { hasCollateral: boolean; client: { id: number; name: string } }>>
  >(
    ['RELATED-CASE-FILE-HAS-COLLATERAL', chb],
    async () => {
      return await getAllRelatedCaseFileAssociatedToCollateral(Number(chb), code, Number(collateralCode))
    },
    {
      enabled: false,
      onSuccess: (data) => {
        setValue('judicialCaseFileWithCollateral', data.data)
        setJudicialCaseFileHasCollateral(data.data)
      },
      onError: (error: any) => {
        notification({
          type: 'info',
          message: 'Error al obtener los colaterales',
        })
      },
    }
  )
  
  useEffect(() => {
    if (code.length && collateralCode && chb) {
      refetch()
    }
    // eslint-disable-next-line
  }, [code, collateralCode, chb])


  return (
    <Container width={'100%'} display={'flex'} flexDirection={'column'} height="fit-content">
      <Table
        isArrayEmpty={judicialCaseFileHasCollateral.length === 0}
        columns={judicialCaseFileHasCollateralColumns}

        emptyState={
          <EmptyStateCell colSpan={judicialCaseFileHasCollateralColumns.length}>
            <EmptyState
              title="No hay recursos disponibles"
              description="No se encontraron expedientes, por favor seleccione otros filtros."
            />
          </EmptyStateCell>
        }
      >
        {
          Array.isArray(judicialCaseFileHasCollateral) && judicialCaseFileHasCollateral.map((caseFile, index) => {
            return (
              <tr key={index}>
                <BodyCell textAlign="center">
                  <Checkbox
                    checked={caseFile.hasCollateral}
                    onChange={() => onChangeJudicialCaseFileHasCollateral(caseFile.id)}
                  />
                </BodyCell>
                <BodyCell textAlign="center">{caseFile.numberCaseFile}</BodyCell>
                <BodyCell textAlign="center">{caseFile.secretary}</BodyCell>
                <BodyCell textAlign="center">{caseFile.client.name}</BodyCell>
                <BodyCell textAlign="center">{`${moment(caseFile?.createdAt).format('DD-MM-YYYY') || ''}`}</BodyCell>
              </tr>
            )
          })
        }
      </Table>
    </Container>
  )
}

export default AssignCollateralModalTable