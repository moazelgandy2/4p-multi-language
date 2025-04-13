"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { HiMail } from "react-icons/hi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import Link from "next/link";
import Aos from "aos";
import { localApi } from "../../../../localUrl";
import { setCookie } from "cookies-next";
import bgCover from '/public/image/bg-02.png'
import { ToastContainer, toast } from 'react-toastify';
import {useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const Login = () => {
  const t = useTranslations("login");  // Added translation hook for "login" namespace
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword , setHidePassword]= useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const SuccessMessage = (e) => toast.success(e);
  const ErrorMessage = (e) => toast.error(e);
  const router = useRouter();
  
  useEffect(() => {
    Aos.init();
  }, []);

  const validateInputs = () => {
    if (!phone.match(/^01[0-9]{9}$/)) {
      setError(t("validPhoneNumber"));
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
      const res = await fetch(`${localApi}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, password }),
      });
      
      const data = await res.json();
      const status = data.status;
      if(status){   
        setCookie("userDetails", { token: data.data.token, user: data.data.user });
        SuccessMessage(data.message);
        router.push('/?new=true');
      }else{
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
      <ToastContainer/>
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
            <h3 className="text-primary text-3xl text-center">{t("loginTitle")}</h3>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div className="mt-8">
            <label className="text-gray-800 text-xs block mb-2">{t("phoneLabel")}</label>
            <div className="relative flex items-center">
              <input
                name="phone"
                onChange={(e) => setPhone(e.target.value)}
                type="text"
                className="w-full bg-transparent text-sm text-gray-800 border-b border-gray-300 focus:border-primary pl-2 pr-8 py-3 outline-none"
                placeholder={t("phonePlaceholder")}
                required
              />
              <HiMail size={20} className="text-gray-300"/>
            </div>
          </div>

          <div className="mt-8">
            <label className="text-gray-800 text-xs block mb-2">{t("passwordLabel")}</label>
            <div className="relative flex items-center">
              <input
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                type={hidePassword ? 'password' : 'text'}
                className="w-full bg-transparent text-sm text-gray-800 border-b border-gray-300 focus:border-primary pl-2 pr-8 py-3 outline-none"
                placeholder={t("passwordPlaceholder")}
                required
              />
              <MdOutlineRemoveRedEye size={20} className="text-gray-300 cursor-pointer" onClick={() => setHidePassword(!hidePassword)}/>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={handleSubmit}
              type="button"
              className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold tracking-wider rounded-md text-white bg-primary hover:bg-[#bb3826d4] focus:outline-none transition-all"
              disabled={loading}
            >
              {loading ? t("loggingIn") : t("loginButton")}
            </button>
            <p className="text-gray-800 text-sm mt-4 text-center">
              {t("noAccountText")} 
              <Link href="/register" className="text-primary font-semibold hover:underline ml-1">
                {t("registerLinkText")}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
