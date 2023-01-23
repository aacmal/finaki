import axios from "axios";

export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://finaki.acmal.me/api"
    : "http://localhost:3001/api";

export const makeUrl = (path: string, parameters: any) => {
  if (!parameters) return path;

  const params = Object.keys(parameters)
    .map((key) => {
      return `${key}=${parameters[key]}`;
    })
    .join("&");

  return `${path}?${params}`;
};
