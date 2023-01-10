import { GuarantorType } from "../types/guarantor.type";
import axiosClient from "../utils/api/clientAxios";

const API = axiosClient.getUri();

const url = `${API}/guarantor`;

export const getGuarantorsByClientID = async (clientId: number) => {
  return await axiosClient.get(`${url}/all-client/${clientId}`);
};

export const createGuarantor = async (guarantor: Omit<GuarantorType, "id">) => {
  return await axiosClient.post(url, guarantor);
};
