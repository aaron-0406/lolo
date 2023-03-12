import axiosClient from "../utils/api/clientAxios";

const API = axiosClient.getUri();

const url = `${API}/dashboard`;

export const postDashboardXslx = async (formData: FormData) => {
  return await axiosClient.post(`${url}/xslx`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
