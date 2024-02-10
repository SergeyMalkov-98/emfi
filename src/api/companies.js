import { $api } from "@/utils/axios";

/**
 * Получить компанию по id
 * @param {String} id Id компании
 */
const getCompani = async (id) => {
  return await $api.get(`/api/v4/companies?id=${id}`);
};

export { getCompani };
