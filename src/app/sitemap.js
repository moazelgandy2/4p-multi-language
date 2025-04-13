import { baseUrl } from "../../localUrl";

export default function sitemap() {

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changefreq: "daily", // Frequent changes for the homepage
      priority: 1.0,
      alternates: {
        languages: {
          ar: `${baseUrl}/ar`,
          en: `${baseUrl}/en`,
        },
      },
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changefreq: "monthly", // Less frequent updates for About page
      priority: 0.8,
      alternates: {
        languages: {
          ar: `${baseUrl}/ar/about`,
          en: `${baseUrl}/en/about`,
        },
      },
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changefreq: "monthly", // Less frequent updates for Contact page
      priority: 0.7,
      alternates: {
        languages: {
          ar: `${baseUrl}/ar/contact`,
          en: `${baseUrl}/en/contact`,
        },
      },
    },
    {
      url: `${baseUrl}/vendor`,
      lastModified: new Date(),
      changefreq: "monthly", // Vendor pages
      priority: 0.7,
      alternates: {
        languages: {
          ar: `${baseUrl}/ar/vendor`,
          en: `${baseUrl}/en/vendor`,
        },
      },
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changefreq: "monthly", // Categories updates
      priority: 0.7,
      alternates: {
        languages: {
          ar: `${baseUrl}/ar/categories`,
          en: `${baseUrl}/en/categories`,
        },
      },
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changefreq: "daily", // Frequent updates for news page
      priority: 0.8,
      alternates: {
        languages: {
          ar: `${baseUrl}/ar/news`,
          en: `${baseUrl}/en/news`,
        },
      },
    },
    {
      url: `${baseUrl}/education`,
      lastModified: new Date(),
      changefreq: "weekly", // Education page changes less frequently
      priority: 0.8,
      alternates: {
        languages: {
          ar: `${baseUrl}/ar/education`,
          en: `${baseUrl}/en/education`,
        },
      },
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changefreq: "daily", // Search page may update frequently
      priority: 0.6,
      alternates: {
        languages: {
          ar: `${baseUrl}/ar/search`,
          en: `${baseUrl}/en/search`,
        },
      },
    },
  ];
}
