import { ClientType } from "../types/client.type";
import axiosClient from "../utils/api/clientAxios";

const API = axiosClient.getUri();

const url = `${API}/client`;

export const getAllClientsByCHB = async (chb: string) => {
  return await axiosClient.get(`${url}/${chb}`);
};

export const getClientByCode = async (code: string, chb: string) => {
  return await axiosClient.get(`${url}/${code}/${chb}`);
};

export const createClient = async (
  client: Omit<ClientType, "id">,
  idBank: number
) => {
  return await axiosClient.post(`${url}/${idBank}`, client);
};

export const updateClient = async (
  code: string,
  chb: number,
  client: Omit<ClientType, "id" | "code" | "customerHasBankId">
) => {
  return await axiosClient.patch(`${url}/${code}/${chb}`, client);
};

export const deleteClient = async (
  code: string,
  chb: number,
  idBank: number
) => {
  return await axiosClient.delete(`${url}/${code}/${chb}/${idBank}`);
};
