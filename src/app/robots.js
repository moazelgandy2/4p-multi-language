import { baseUrl } from "../../localUrl";

export default function robots() {
    return {
      rules: [
        {
          userAgent: '*', 
          allow: '/',  
          disallow: [],  
        },
      ],
      sitemap: `${baseUrl}/sitemap.xml`,
    };
  }
  