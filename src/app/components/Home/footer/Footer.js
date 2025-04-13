"use client";

import React, { useEffect, useState } from "react";
import logo from "/public/image/logo-2.webp";
import marketopiaLogo from "/public/image/marketopiateam.webp";
import Image from "next/image";
import Link from "next/link";
import {
  FaCommentsDollar,
  FaFacebookF,
  FaLinkedinIn,
  FaWhatsapp,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaSnapchatGhost,
  FaTiktok,
  FaTelegram,
} from "react-icons/fa";
import { useTranslations } from "next-intl";
import { localApi } from "../../../../../localUrl";

const Footer = () => {
  const t = useTranslations("Footer");
  const [configData, setConfigData] = useState(null);

  const fetchConfig = async () => {
    try {
      const res = await fetch(`${localApi}/api/config?lang=en`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log("data=>", data.data);

      setConfigData(data.data);
      return data;
    } catch (error) {
      console.error("Error fetching config:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchConfig();
      if (data) {
        console.log("Config Data:", data);
      }
    };

    fetchData();
  }, []);

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
        {configData && configData.config && (
          <nav className="md:place-self-center md:justify-self-end">
            <div className="grid grid-flow-col gap-4">
              {configData.config.facebook_link && (
                <Link
                  href={configData.config.facebook_link}
                  target="_blank"
                  className="hover:text-blue-500 transition-colors duration-300 text-xl"
                  aria-label="Facebook"
                >
                  <FaFacebookF className="w-5 h-5" />
                </Link>
              )}
              {configData.config.instagram_link && (
                <Link
                  href={configData.config.instagram_link}
                  target="_blank"
                  className="hover:text-pink-500 transition-colors duration-300 text-xl"
                  aria-label="Instagram"
                >
                  <FaInstagram className="w-5 h-5" />
                </Link>
              )}
              {configData.config.linkedin_link && (
                <Link
                  href={configData.config.linkedin_link}
                  target="_blank"
                  className="hover:text-blue-700 transition-colors duration-300 text-xl"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn className="w-5 h-5" />
                </Link>
              )}
              {configData.config.twitter_link && (
                <Link
                  href={configData.config.twitter_link}
                  target="_blank"
                  className="hover:text-blue-400 transition-colors duration-300 text-xl"
                  aria-label="Twitter"
                >
                  <FaTwitter className="w-5 h-5" />
                </Link>
              )}
              {configData.config.youtube_link && (
                <Link
                  href={configData.config.youtube_link}
                  target="_blank"
                  className="hover:text-red-600 transition-colors duration-300 text-xl"
                  aria-label="YouTube"
                >
                  <FaYoutube className="w-5 h-5" />
                </Link>
              )}
              {configData.config.snapchat_link && (
                <Link
                  href={configData.config.snapchat_link}
                  target="_blank"
                  className="hover:text-yellow-400 transition-colors duration-300 text-xl"
                  aria-label="Snapchat"
                >
                  <FaSnapchatGhost className="w-5 h-5" />
                </Link>
              )}
              {configData.config.tiktok_link && (
                <Link
                  href={configData.config.tiktok_link}
                  target="_blank"
                  className="hover:text-gray-300 transition-colors duration-300 text-xl"
                  aria-label="TikTok"
                >
                  <FaTiktok className="w-5 h-5" />
                </Link>
              )}
              {configData.config.whatsapp_link && (
                <Link
                  href={configData.config.whatsapp_link}
                  target="_blank"
                  className="hover:text-green-500 transition-colors duration-300 text-xl"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp className="w-5 h-5" />
                </Link>
              )}
              {configData.config.telegram_link && (
                <Link
                  href={configData.config.telegram_link}
                  target="_blank"
                  className="hover:text-blue-500 transition-colors duration-300 text-xl"
                  aria-label="Telegram"
                >
                  <FaTelegram className="w-5 h-5" />
                </Link>
              )}
            </div>
          </nav>
        )}
      </footer>
    </>
  );
};

export default Footer;
