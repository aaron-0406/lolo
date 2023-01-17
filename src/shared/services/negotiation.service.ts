import axiosClient from "../utils/api/clientAxios";

const API = axiosClient.getUri();

const url = `${API}/negotiation`;

export const getAllNegociacionesByCHB = async (chb: string) => {
  return await axiosClient.get(`${url}/all/${chb}`);
};
