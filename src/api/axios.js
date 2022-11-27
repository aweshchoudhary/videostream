import axios from "axios";
import { parse, stringify } from "qs";
export const BASE_URL = "https://wnjt1f.sse.codesandbox.io";

export default axios.create({
  baseURL: BASE_URL,
  paramsSerializer: {
    encode: parse,
    serialize: stringify
  }
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" }
});
