import React from "react";
import logo from "/public/image/logo-2.webp";
import marketopiaLogo from "/public/image/marketopiateam.webp";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("Footer");

  return (
    <>
      <footer className="footer bg-[#1a202c] text-white p-10">
        <aside>
          <Image
            src={logo}
            alt="logo"
            width={100}
            height={100}
            loading="lazy"
          />
          <p>
            {t("CompanyName")}
            <br />
            {t("CompanySlogan")}
          </p>
        </aside>

        {/* Services Section */}
        <nav>
          <p className="footer-title">{t("Services")}</p>
          <Link
            href={"/education/Egyptian?departmentId=1"}
            className="link-hover"
          >
            {t("Egyptian_Curricula")}
          </Link>
          <Link
            href={"/education/Sudanese?departmentId=2"}
            className="link-hover"
          >
            {t("Sudanese_Curricula")}
          </Link>
          <Link
            href={"/education/Oxford?departmentId=3"}
            className="link-hover"
          >
            {t("Oxford_Curricula")}
          </Link>
        </nav>

        {/* Company Section */}
        <nav>
          <h6 className="footer-title">{t("Company")}</h6>
          <Link
            href={"/"}
            className="link-hover"
          >
            {t("Home")}
          </Link>

          <Link
            href={"/categories"}
            className="link-hover"
          >
            {t("Categories")}
          </Link>
        </nav>

        {/* Legal Section */}
        <nav>
          <h6 className="footer-title">{t("Legal")}</h6>
          <Link
            href={"/about"}
            className="link-hover"
          >
            {t("About_Us")}
          </Link>
          <Link
            href={"/news"}
            className="link-hover"
          >
            {t("News")}
          </Link>
        </nav>
      </footer>

      {/* Bottom Footer */}
      <footer className="footer bg-[#1a202c] text-white border-white border-t px-10 py-4">
        <aside className="grid-flow-col items-center">
          <Link
            href="https://marketopiateam.com"
            target="_blank"
          >
            <Image
              src={marketopiaLogo}
              alt="marketopiaLogo"
              loading="lazy"
              width={70}
              height={70}
            />
          </Link>
          <p>
            {t("Copyright")}
            <br />
            {t("RightsReserved")}
          </p>
        </aside>

        {/* Social Links */}
        <nav className="md:place-self-center md:justify-self-end">
          <div className="grid grid-flow-col gap-4">
            <Link
              href={"/"}
              aria-label="Visit facebook Profile"
            >
              <FaFacebookF size={25} />
            </Link>
            <Link
              href={"/"}
              aria-label="Visit whatsapp Profile"
            >
              <FaWhatsapp size={25} />
            </Link>
            <Link
              href={"/"}
              aria-label="Visit linkedin Profile"
            >
              <FaLinkedinIn size={25} />
            </Link>
          </div>
        </nav>
      </footer>
    </>
  );
};

export default Footer;
