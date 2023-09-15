// const BASE_URL = "https://finaki-backend-git-test-axcamz.vercel.app/api"; // test server
export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_PRODUCTION_URL
    : process.env.NEXT_PUBLIC_API_DEVELOPMENT_URL;

/**
 *
 * @param path url path
 * @param parameters url parameters
 * @returns url with parameters
 * @example makeUrl("/transactions", { limit: 10 }) => "/transactions?limit=10"
 */
export const makeUrl = (
  path: string,
  parameters?: Record<string, unknown>
): string => {
  if (!parameters) return path;

  const params = Object.keys(parameters)
    .map((key) => {
      return `${key}=${parameters[key]}`;
    })
    .join("&");

  return `${path}?${params}`;
};
