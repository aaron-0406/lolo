import { CommentType } from '../types/comment.type'
import axiosClient from '../utils/api/clientAxios'

const API = axiosClient.getUri()

const url = `${API}/comment`

export const createComment = async (commentParam: CommentType) => {
  let dia = commentParam.date.split('-')
  let day = dia[0]
  let month = dia[1]
  commentParam.date = `${month}-${day}-${dia[2]}`
  const { comment, date, negotiation, clientId, customerUserId } = commentParam
  return await axiosClient.post(`${url}`, {
    comment,
    date,
    negotiation,
    clientId,
    customerUserId,
  })
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
export const editComment = async (comment: CommentType) => {
  let dia = comment.date.split('-')
  let day = dia[0]
  let month = dia[1]
  comment.date = `${month}-${day}-${dia[2]}`
  const { comment: commentA, date, id, negotiation, customerUserId } = comment
  return await axiosClient.patch(`${url}/${id}`, {
    comment: commentA,
    date,
    negotiation,
    customerUserId,
  })
}
