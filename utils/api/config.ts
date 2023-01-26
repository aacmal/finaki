// const BASE_URL = "https://finaki-backend-git-test-axcamz.vercel.app/api"; // test server
export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://finaki-backend.acmal.me/api"
    : "http://localhost:3000/api";

export const makeUrl = (path: string, parameters: any) => {
  if (!parameters) return path;

  const params = Object.keys(parameters)
    .map((key) => {
      return `${key}=${parameters[key]}`;
    })
    .join("&");

  return `${path}?${params}`;
};
