import { MetadataRoute } from "next";

const domain = "https://finaki.acml.me";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: domain,
      lastModified: new Date(),
    },
    {
      url: `${domain}/auth/login`,
      lastModified: new Date(),
    },
    {
      url: `${domain}/auth/register`,
      lastModified: new Date(),
    },
    {
      url: `${domain}/demo/transactions`,
      lastModified: new Date(),
    },
    {
      url: `${domain}/about`,
      lastModified: new Date(),
    },
    {
      url: `${domain}/telegram-integration`,
      lastModified: new Date(),
    },
  ];
}
