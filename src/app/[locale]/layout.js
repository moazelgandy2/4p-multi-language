import { Outfit } from "next/font/google";
import "../globals.css";
import "aos/dist/aos.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navbar from "../components/Home/navbar/navbar";
import dynamic from "next/dynamic";
import { baseUrl } from "../../../localUrl";
const Footer = dynamic(() => import("../components/Home/footer/Footer"));

const outfit = Outfit({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isArabic = locale === "ar";

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "4P - Your Best Choice",
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: isArabic ? "+20XXXXXXXXXX" : "+1XXXXXXXXXX",
      contactType: "Customer Support",
      areaServed: "EG",
      availableLanguage: ["Arabic", "English"],
    },
  };

  return {
    title: isArabic ? "4P - وجهتك الأفضل للخدمات والعروض" : "4P - Your Ultimate Destination for Services & Deals",
    description: isArabic
      ? "استمتع بأفضل الخدمات والعروض الحصرية عبر منصة 4P، حيث تجد كل ما تحتاجه بسهولة وسرعة."
      : "Enjoy top services and exclusive deals on 4P, your go-to platform for everything you need.",
    
    openGraph: {
      title: isArabic ? "4P - وجهتك الأفضل للخدمات والعروض" : "4P - Your Ultimate Destination for Services & Deals",
      description: isArabic
        ? "استمتع بأفضل الخدمات والعروض الحصرية عبر منصة 4P، حيث تجد كل ما تحتاجه بسهولة وسرعة."
        : "Enjoy top services and exclusive deals on 4P, your go-to platform for everything you need.",
      url: `${baseUrl}/${locale}`,
      siteName: "4P",
      images: [
        {
          url: `${baseUrl}/images/og-image-${locale}.jpg`,
          width: 1200,
          height: 630,
          alt: isArabic ? "صورة توضيحية لمنصة 4P" : "4P Platform Preview",
        },
      ],
      locale: isArabic ? "ar_EG" : "en_US",
      type: "website",
    },

    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        en: `${baseUrl}/en`,
        ar: `${baseUrl}/ar`,
      },
    },

    other: {
      "application/ld+json": JSON.stringify(schemaMarkup),
    },

    twitter: {
      card: "summary_large_image",
      site: "@YourTwitterHandle",
      title: isArabic ? "4P - وجهتك الأفضل للخدمات والعروض" : "4P - Your Ultimate Destination for Services & Deals",
      description: isArabic
        ? "استمتع بأفضل الخدمات والعروض الحصرية عبر منصة 4P، حيث تجد كل ما تحتاجه بسهولة وسرعة."
        : "Enjoy top services and exclusive deals on 4P, your go-to platform for everything you need.",
      images: [`${baseUrl}/images/og-image-${locale}.jpg`],
    },
  };
}

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  // Providing all messages to the client side is the easiest way to get started
  const messages = await getMessages();
  const direction = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={direction}>
      <body className={`${outfit.className} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <Navbar locale={locale}/>
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
