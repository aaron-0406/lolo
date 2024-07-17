import axiosClient from '../../utils/api/clientAxios'
import { JudicialCaseFileHasCollateralType } from '../../types/judicial/judicial-case-file-has-collateral.type';

const API = axiosClient.getUri()

const url = `${API}/judicial/case-file-has-collateral`

export const getAllRelatedCaseFileAssociatedToCollateral
= async (chb: number, numberCaseFile: string, collateralId: number) => {
  return await axiosClient.get(`${url}/${chb}/${numberCaseFile}/${collateralId}`)
}

export const assingCaseFileToCollateral = async (
  judicialCaseFileHasCollateral: Omit<
    JudicialCaseFileHasCollateralType,
    'id' | 'createdAt' | 'deletedAt' | 'updatedAt'
  >[],
  collateralId: number
) => {
  return await axiosClient.post(`${url}/${collateralId}`, {
    newJudicialCasefileHasCollateral: judicialCaseFileHasCollateral,
  })
}

