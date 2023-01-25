export const corsConfig = {
  origin: [
    "http://localhost:3000", // local
    "http://192.168.137.1:3000", // wireless local network
    "https://finaki.acmal.me", // production
    "https://finaki-frontend-git-test-axcamz.vercel.app/", // test
  ],
  credentials: true,
};
