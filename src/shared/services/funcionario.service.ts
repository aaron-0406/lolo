import axiosClient from "../utils/api/clientAxios";

const API = axiosClient.getUri();

const url = `${API}/funcionario`;

export const getAllFuncionarios = async () => {
  return await axiosClient.get(url);
};
