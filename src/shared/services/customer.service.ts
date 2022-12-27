import axiosClient from "../utils/api/clientAxios";

const API = axiosClient.getUri();

const url = `${API}/customer`;

export const getCustomerByUrl = async (urlIdentifier: string) => {
  return await axiosClient.get(`${url}/${urlIdentifier}`);
};
