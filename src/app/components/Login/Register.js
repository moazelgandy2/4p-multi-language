"use client";
import React, { useEffect, useState } from "react";
import bgCover from "/public/image/bg-02.png";
import Image from "next/image";
import { FaUser } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import Link from "next/link";
import Aos from "aos";
import { localApi } from "../../../../localUrl";
import { setCookie } from "cookies-next";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl"; // إضافة useTranslations

const Register = () => {
  const t = useTranslations("register");  // استخدام الترجمة
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const SuccessMessage = (e) => toast.success(e);
  const ErrorMessage = (e) => toast.error(e);

  useEffect(() => {
    Aos.init();
  }, []);

  const validateInputs = () => {
    if (!name.trim()) {
      setError(t("validNameError"));
      return false;
    }
    if (!phone.match(/^01[0-9]{9}$/)) {
      setError(t("validPhoneNumber"));
      return false;
    }
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError(t("validEmailError"));
      return false;
    }
    if (password.length < 6) {
      setError(t("passwordLengthError"));
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async () => {
    if (!validateInputs()) return;
    setLoading(true);
    try {
      const res = await fetch(`${localApi}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phone, email, password, city_id: 1 }),
      });

      const data = await res.json();
      const status = data.status;
      if (status) {
        setCookie("userDetails", {
          token: data.data.token,
          user: data.data.user,
        });
        SuccessMessage(data.message);
        router.push("/");
      } else {
        setError(data.message);
        ErrorMessage(t("tryAgainError"));
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-[sans-serif] relative">
      <ToastContainer />
      <div className="h-[240px] font-[sans-serif]">
        <Image
          src={bgCover}
          alt={t("bannerImageAlt")}
          className="w-full h-full object-cover bg-black"
        />
      </div>
      <div className="relative -mt-40 m-4" data-aos="zoom-in">
        <form
          className="bg-white max-w-xl w-full mx-auto shadow-md p-6 sm:p-8 rounded-2xl"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="mb-12">
            <h3 className="font-semibold text-3xl text-center">{t("registerTitle")}</h3>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div>
            <label className="text-gray-800 text-xs block mb-2">
              {t("nameLabel")}
            </label>
            <div className="relative flex items-center">
              <input
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent text-sm text-gray-800 border-b border-gray-300 focus:border-primary pl-2 pr-8 py-3 outline-none"
                placeholder={t("namePlaceholder")}
              />
              <FaUser size={18} className="text-gray-300" />
            </div>
          </div>

          <div className="mt-8">
            <label className="text-gray-800 text-xs block mb-2">{t("phoneLabel")}</label>
            <div className="relative flex items-center">
              <input
                name="phone"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-transparent text-sm text-gray-800 border-b border-gray-300 focus:border-primary pl-2 pr-8 py-3 outline-none"
                placeholder={t("phonePlaceholder")}
              />
              <FaUser size={18} className="text-gray-300" />
            </div>
          </div>

          <div className="mt-8">
            <label className="text-gray-800 text-xs block mb-2">{t("emailLabel")}</label>
            <div className="relative flex items-center">
              <input
                name="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent text-sm text-gray-800 border-b border-gray-300 focus:border-primary pl-2 pr-8 py-3 outline-none"
                placeholder={t("emailPlaceholder")}
              />
              <HiMail size={20} className="text-gray-300" />
            </div>
          </div>

          <div className="mt-8">
            <label className="text-gray-800 text-xs block mb-2">{t("passwordLabel")}</label>
            <div className="relative flex items-center">
              <input
                name="password"
                type={hidePassword ? "password" : "text"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent text-sm text-gray-800 border-b border-gray-300 focus:border-primary pl-2 pr-8 py-3 outline-none"
                placeholder={t("passwordPlaceholder")}
              />
              <MdOutlineRemoveRedEye
                size={20}
                className="text-gray-300 cursor-pointer"
                onClick={() => setHidePassword(!hidePassword)}
              />
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={handleSubmit}
              type="button"
              className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold tracking-wider rounded-md text-white bg-primary hover:bg-[#bb3826d4] focus:outline-none transition-all"
              disabled={loading}
            >
              {loading ? t("registering") : t("registerButton")}
            </button>
            <p className="text-gray-800 text-sm mt-4 text-center">
              {t("alreadyHaveAccount")}{" "}
              <Link
                href="/login"
                className="text-primary font-semibold hover:underline ml-1"
              >
                {t("loginLink")}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
