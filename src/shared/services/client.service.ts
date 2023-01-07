import axiosClient from "../utils/api/clientAxios";

const API = axiosClient.getUri();

const url = `${API}/client`;

export const getAllClientsByCHB = async (chb: string) => {
  return await axiosClient.get(`${url}/${chb}`);
};
