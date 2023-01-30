import axiosClient from "../utils/api/clientAxios";

const API = axiosClient.getUri();

const url = `${API}/customer-user`;

export const getAllUsersByID = async (customerID: number) => {
  return await axiosClient.get(`${url}/users/${customerID}`);
};
