import ky from "ky";
import { generateAuthHeader } from "../utils";

const API_URL = import.meta.env.VITE_API_URL;
export const API_PASSWORD = import.meta.env.VITE_API_PASSWORD;

const pageSize = 50;

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
    console.error("Ошибка в запросе getTotalCountProducts:", error.message);
    throw error;
  }
};
