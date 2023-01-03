import axiosClient from "../utils/api/clientAxios";

const API = axiosClient.getUri();

const url = `${API}/customer-bank`;

export const getAllBanks = async (idCustomer: number, idBank: number) => {
  return await axiosClient.get(`${url}/${idCustomer}/${idBank}`);
};
