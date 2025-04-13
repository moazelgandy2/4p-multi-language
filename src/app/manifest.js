export default function manifest() {
  return {
    name: "4P - Your Ultimate Destination for Services & Deals",
    short_name: "4P",
    description: "Enjoy top services and exclusive deals on 4P, your go-to platform for everything you need.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/image/logo-2.webp",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/image/logo-2.webp",
        sizes: "512x512",
        type: "image/png"
      }
    ],
    lang: "en",
    scope: "/",
    orientation: "portrait",
    prefer_related_applications: false
  };
}
