import axiosClient from "../utils/api/clientAxios";

const API = axiosClient.getUri();

const url = `${API}/file`;

export const postCreateFile = async (formData: FormData, id: number) => {
  return await axiosClient.post(`${url}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const getFiles = async (id: number) => {
  return await axiosClient.get(`${url}/${id}`);
};

export const deleteFile = async (id: number) => {
  return await axiosClient.delete(`${url}/${id}`);
};
