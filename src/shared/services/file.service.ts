import axiosClient from "../utils/api/clientAxios";

const API = axiosClient.getUri();

const url = `${API}/file`;

export const postCreateFile = async (
  formData: FormData,
  id: number,
  code: number,
  idBank: number
) => {
  return await axiosClient.post(`${url}/${idBank}/${code}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const getFiles = async (id: number) => {
  return await axiosClient.get(`${url}/${id}`);
};

export const deleteFile = async (idBank: number, code: number, id: number) => {
  return await axiosClient.delete(`${url}/${idBank}/${code}/${id}`);
};

export const getFileById = async (idBank: number, code: number, id: number) => {
  return await axiosClient.get(`${url}/single/${idBank}/${code}/${id}`);
};
