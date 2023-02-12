// const BASE_URL = "https://finaki-backend-git-test-axcamz.vercel.app/api"; // test server
export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://finaki-backend.acmal.me/api"
    : "http://localhost:3001/api";

/**
 *
 * @param path url path
 * @param parameters url parameters
 * @returns url with parameters
 * @example makeUrl("/transactions", { limit: 10 }) => "/transactions?limit=10"
 */
export const makeUrl = (path: string, parameters: any): string => {
  if (!parameters) return path;

  const params = Object.keys(parameters)
    .map((key) => {
      return `${key}=${parameters[key]}`;
    })
    .join("&");

  return `${path}?${params}`;
};
