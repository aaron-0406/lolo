import axiosClient from "../utils/api/clientAxios";

interface Client {
  name: string;
  code: string;
}

interface Product {
  name: string;
  code: string;
  state: string;
  clientName: string;
  clientCode: string;
  customerId: number;
}
const API = axiosClient.getUri();

const url = `${API}/dashboard`;

export const postDashboardXslx = async (formData: FormData) => {
  return await axiosClient.post(`${url}/xslx`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const createClientsDash = async (
  clients: Client[],
  customerUserId: number,
  customerHasBankId: number,
  idBank: number
) => {
  return await axiosClient.post(`${url}/clients`, {
    clients,
    customerUserId,
    customerHasBankId,
    idBank,
  });
};
export const deleteClientsDash = async (
  clients: string[],
  customerHasBankId: number,
  idBank: number
) => {
  return await axiosClient.post(`${url}/delete-clients`, {
    clients,
    customerHasBankId,
    idBank,
  });
};
export const createProductsDash = async (
  products: Product[],
  customerUserId: number,
  customerHasBankId: number,
  idBank: number
) => {
  return await axiosClient.post(`${url}/products`, {
    products,
    customerUserId,
    customerHasBankId,
    idBank,
  });
};
export const deleteProductsDash = async (products: string[]) => {
  return await axiosClient.post(`${url}/delete-products`, { products });
};
