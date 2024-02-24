import ky from "ky";
import { generateAuthHeader } from "../utils";

export const API_URL = import.meta.env.VITE_API_URL;
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
      retry: {
        limit: 3,
        methods: ["post"],
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
      retry: {
        limit: 3,
        methods: ["post"],
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
  }
};

// Получение информации о товарах
export const getProductDetails = async (productIds) => {
  try {
    const response = await ky.post(API_URL, {
      json: {
        action: "get_items",
        params: { ids: productIds },
      },
      headers: {
        "X-Auth": generateAuthHeader(),
      },
      retry: {
        limit: 3,
        methods: ["post"],
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
  }
};

// Получение полей
export const getFields = async () => {
  try {
    const response = await ky.post(API_URL, {
      json: {
        action: "get_fields",
      },
      headers: {
        "X-Auth": generateAuthHeader(),
      },
      retry: {
        limit: 3,
        methods: ["post"],
      },
    });

    if (response.ok) {
      const responseData = await response.json();
      const validItems = responseData.result.filter((value) => value !== null);
      return validItems;
    } else {
      throw new Error("Ошибка при получении товаров");
    }
  } catch (error) {
    console.error("API Error идентификатор:", error);
  }
};

// Получение значений полей
export const getFieldValues = async (selectedField) => {
  try {
    const response = await ky.post(API_URL, {
      json: {
        action: "get_fields",
        params: { field: selectedField },
      },
      headers: {
        "X-Auth": generateAuthHeader(),
      },
      retry: {
        limit: 3,
        methods: ["post"],
      },
    });

    if (response.ok) {
      const newResponse = await response.json();
      const validItems = newResponse.result.filter((value) => value !== null);
      const uniqueValuesArray = Array.from(new Set(validItems));

      return uniqueValuesArray;
    } else {
      throw new Error("Ошибка при получении товаров");
    }
  } catch (error) {
    console.error("API Error идентификатор:", error);
  }
};

// Получение отфильтрованных товаров
export const getFilteredProductDetails = async ({
  selectedField,
  selectedValue,
}) => {
  try {
    const response = await ky.post(API_URL, {
      json: {
        action: "filter",
        params: {
          [selectedField]:
            selectedField == "price" ? +selectedValue : selectedValue,
        },
      },
      headers: {
        "X-Auth": generateAuthHeader(),
      },
      retry: {
        limit: 3,
        methods: ["post"],
      },
    });

    if (response.ok) {
      const newResponse = await response.json();
      return await getProductDetails(newResponse.result);
    } else {
      throw new Error("Ошибка при получении товаров");
    }
  } catch (error) {
    console.error("API Error идентификатор:", error);
  }
};
