export const corsConfig = {
  origin: [
    "http://192.168.137.1:3000", // wireless local network
    "https://finaki.acmal.me", // production
    "https://finaki-frontend-git-test-axcamz.vercel.app/", // test
    "https://finaki.vercel.app", // vercel domain
  ],
  credentials: true,
};
