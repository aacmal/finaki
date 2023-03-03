export interface User {
  id: string;
  name: string;
  email: string;
  token?: string | null;
  telegramAccount?: {
    username: string;
    firstName: string;
  } | null;
}
