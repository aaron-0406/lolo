import axiosClient from '../../utils/api/clientAxios'

const API = axiosClient.getUri()

const url = `${API}/cobranza/doc`

export const generateDocumentService = async (templateHasValuesId: number, clientsIds: number[]) => {
  return await axiosClient.post(`${url}`, {
    usersId: clientsIds,
    templateHasValuesId,
  })
}
