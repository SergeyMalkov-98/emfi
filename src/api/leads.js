import { $api } from "@/utils/axios";

/**
 * Получить список сделок
 * @param {Int} limit Количество возвращаемых сущностей за один запрос (Максимум – 250)
 * @param {Int} page Страница выборки
 */
const getLeads = async (page = 1, limit = 5) => {
  return await $api.get(`/api/v4/leads?limit=${limit}&page=${page}`);
};

export { getLeads };
