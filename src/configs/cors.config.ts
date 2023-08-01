export const corsConfig = {
  origin: [
    "https://finaki.vercel.app", // vercel domain
    "http://localhost:3000", // development
    "https://backend.finaki.acml.me", // production
  ],
  credentials: true,
};
