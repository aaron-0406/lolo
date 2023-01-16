import axiosClient from "../utils/api/clientAxios";

const API = axiosClient.getUri();

const url = `${API}/negotiation`;

export const getAllNegociaciones = async () => {
  return await axiosClient.get(url);
};
