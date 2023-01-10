import axiosClient from "../utils/api/clientAxios";

const API = axiosClient.getUri();

const url = `${API}/guarantor`;

export const getGuarantorsByClientID = async (clientId: number) => {
  return await axiosClient.get(`${url}/all-client/${clientId}`);
};
