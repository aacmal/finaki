import axios from "axios";

// export const BASE_URL = "http://localhost:3001/api"; // local server
// export const BASE_URL = "https://finaki-backend-git-test-axcamz.vercel.app/api"; // test server
export const BASE_URL = "https://finaki-backend.acmal.me/api"; // production server

export const makeUrl = (path: string, parameters: any) => {
  if (!parameters) return path;

  const params = Object.keys(parameters)
    .map((key) => {
      return `${key}=${parameters[key]}`;
    })
    .join("&");

  return `${path}?${params}`;
};
