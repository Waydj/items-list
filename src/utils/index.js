import md5 from "md5";
import { API_PASSWORD } from "../api";

export const generateAuthHeader = () => {
  const password = API_PASSWORD;
  const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const authString = `${password}_${timestamp}`;
  return md5(authString);
};
