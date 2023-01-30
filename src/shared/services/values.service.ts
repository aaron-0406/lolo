import axiosClient from "../utils/api/clientAxios";

const API = axiosClient.getUri();

const url = `${API}/values`;

export const getValuesByTemplateHasValuesIdService = async (
  templateHasValuesId: number
) => {
  return await axiosClient.get(`${url}/${templateHasValuesId}`);
};
