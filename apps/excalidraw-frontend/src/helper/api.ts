import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_APIURL;

if (!baseURL) {
  throw new Error("Missing NEXT_PUBLIC_APIURL in environment");
}

export const api = axios.create({
  baseURL: `${baseURL}/api`,
});
