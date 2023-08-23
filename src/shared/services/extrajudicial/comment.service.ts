import { CommentType } from '../../types/extrajudicial/comment.type'
import axiosClient from '../../utils/api/clientAxios'

const API = axiosClient.getUri()

const url = `${API}/cobranza/comment`

export const createComment = async (commentParam: Omit<CommentType, 'hour'>) => {
  let dia = commentParam.date.split('-')
  let day = dia[0]
  let month = dia[1]
  commentParam.date = `${month}-${day}-${dia[2]}`
  const { comment, date, negotiation, clientId, customerUserId, managementActionId } = commentParam
  return await axiosClient.post(`${url}`, {
    comment,
    date,
    negotiation,
    managementActionId,
    clientId,
    customerUserId,
  })
}

export const getCommenById = async (id: number) => {
  return await axiosClient.get(`${url}/${id}`)
}

export const getComments = async (id: number) => {
  return await axiosClient.get(`${url}/all-client/${id}`)
}

export const getChart = async (id: number) => {
  return await axiosClient.get(`${url}/chart/${id}`)
}

export const deleteComment = async (id: number) => {
  return await axiosClient.delete(`${url}/${id}`)
}

export const editComment = async (comment: Omit<CommentType, 'hour'>) => {
  let dia = comment.date.split('-')
  let day = dia[0]
  let month = dia[1]
  comment.date = `${month}-${day}-${dia[2]}`
  const { comment: commentA, date, id, negotiation, customerUserId, managementActionId } = comment
  return await axiosClient.patch(`${url}/${id}`, {
    comment: commentA,
    date,
    negotiation,
    managementActionId,
    customerUserId,
  })
}
