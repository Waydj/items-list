import ky from "ky";
import { generateAuthHeader } from "../utils";

const API_URL = import.meta.env.VITE_API_URL;
export const API_PASSWORD = import.meta.env.VITE_API_PASSWORD;

const pageSize = 50;

// Получение общего количества товаров
export const getTotalCountProducts = async () => {
  try {
    const totalCountResponse = await ky.post(API_URL, {
      json: {
        action: "get_ids",
        params: {},
      },
      headers: {
        "X-Auth": generateAuthHeader(),
      },
    });

    if (totalCountResponse.ok) {
      const totalCountData = await totalCountResponse.json();
      const totalCount = totalCountData.result.length;

      return Math.ceil(totalCount / pageSize);
    } else {
      throw new Error("Ошибка при получении общего числа продуктов");
    }
  } catch (error) {
    console.error("API Error идентификатор:", error);
    return getTotalCountProducts();
  }
};

// Получение списка id товаров
export const getIdsProducts = async (currentPage) => {
  try {
    const response = await ky.post(API_URL, {
      json: {
        action: "get_ids",
        params: {
          offset: (currentPage - 1) * pageSize,
          limit: pageSize,
        },
      },
      headers: {
        "X-Auth": generateAuthHeader(),
      },
    });

    if (response.ok) {
      const responseData = await response.json();
      const productIds = responseData.result;

      if (productIds && productIds.length > 0) {
        return await getProductDetails(productIds);
      }
    } else {
      throw new Error("Ошибка при получении списка идентификаторов");
    }
  } catch (error) {
    console.error("API Error идентификатор:", error);
    return getIdsProducts(currentPage);
  }
};

// Получение информации о товарах
const getProductDetails = async (productIds) => {
  try {
    const response = await ky.post(API_URL, {
      json: {
        action: "get_items",
        params: { ids: productIds },
      },
      headers: {
        "X-Auth": generateAuthHeader(),
      },
    });

    if (response.ok) {
      const responseData = await response.json();

      const productsData = responseData.result;
      const uniqueIds = new Set();
      const filteredData = [];

      productsData.forEach((item) => {
        if (!uniqueIds.has(item.id)) {
          filteredData.push(item);
          uniqueIds.add(item.id);
        }
      });

      return filteredData;
    } else {
      throw new Error("Ошибка при получении товаров");
    }
  } catch (error) {
    console.error("API Error идентификатор:", error);
    return getProductDetails(productIds);
  }
};
