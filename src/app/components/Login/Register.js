"use client";
import React, { useEffect, useState } from "react";
import bgCover from "/public/image/bg-02.png";
import Image from "next/image";
import { FaUser, FaKey } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import Link from "next/link";
import Aos from "aos";
import { localApi } from "../../../../localUrl";
import { setCookie, getCookie } from "cookies-next";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl"; // إضافة useTranslations

const Register = () => {
  const t = useTranslations("register"); // استخدام الترجمة
  const [name, setName] = useState("");
  const [cities, setCities] = useState();
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const SuccessMessage = (e) => toast.success(e);
  const ErrorMessage = (e) => toast.error(e);

  const fetchCities = async () => {
    try {
      console.log("fetchCities");
      const res = await fetch(`${localApi}/api/config?lang=en`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("res=>", res);
      const data = await res.json();

      if (data.status) {
        setCities(data.data.cities);
      } else {
        ErrorMessage(t("fetchCitiesError"));
      }
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  useEffect(() => {
    const checkUserStatus = async () => {
      const userDetailsCookie = getCookie("userDetails");
      if (userDetailsCookie) {
        const userDetails = JSON.parse(userDetailsCookie);
        if (userDetails && userDetails.token) {
          try {
            const res = await fetch(`${localApi}/api/auth/profile`, {
              headers: {
                Authorization: `Bearer ${userDetails.token}`,
              },
            });
            const data = await res.json();
            if (data.status && data.data.email_verified_at === null) {
              setStep(2);
            }
          } catch (error) {
            console.error("Failed to fetch profile", error);
          }
        }
      }
    };
    checkUserStatus();
    Aos.init();
    fetchCities();
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
    if (!city) {
      setError(t("validCityError"));
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
        body: JSON.stringify({ name, phone, email, password, city_id: city }),
      });

      const data = await res.json();
      const status = data.status;
      if (status) {
        setCookie(
          "userDetails",
          JSON.stringify({
            token: data.data.token,
            user: data.data.user,
          })
        );
        SuccessMessage(data.message);
        setStep(2);
        setResendTimer(60);
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

  const handleVerifyOtp = async () => {
    if (!otp) {
      setError(t("invalidOtpError"));
      return;
    }
    setLoading(true);
    setError("");
    const userDetailsCookie = getCookie("userDetails");
    if (!userDetailsCookie) {
      ErrorMessage("User details not found. Please register again.");
      setStep(1);
      setLoading(false);
      return;
    }

    try {
      const userDetails = JSON.parse(userDetailsCookie);
      const userPhone = userDetails?.user?.phone;
      const token = userDetails?.token;

      if (!userPhone || !token) {
        ErrorMessage("User details are incomplete. Please register again.");
        setStep(1);
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("phone", userPhone);
      formData.append("code", otp);

      const res = await fetch(`${localApi}/api/auth/verify-otp`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (data.status) {
        SuccessMessage("Account verified successfully!");
        // We need to update the cookie to reflect the verified status
        // so the middleware lets the user through.
        const updatedUserDetails = {
          ...userDetails,
          user: {
            ...userDetails.user,
            email_verified_at: new Date().toISOString(), // Mark as verified
          },
        };
        setCookie("userDetails", JSON.stringify(updatedUserDetails));
        router.push("/");
        router.refresh(); // Refresh to re-trigger middleware with updated cookie
      } else {
        setError(data.message || "Invalid OTP. Please try again.");
        ErrorMessage(data.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      ErrorMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setResendLoading(true);
    setError("");
    const userDetailsCookie = getCookie("userDetails");
    if (!userDetailsCookie) {
      ErrorMessage("User details not found. Please register again.");
      setStep(1);
      setResendLoading(false);
      return;
    }

    try {
      const userDetails = JSON.parse(userDetailsCookie);
      const userPhone = userDetails?.user?.phone;
      const token = userDetails?.token;

      if (!userPhone || !token) {
        ErrorMessage("User details are incomplete. Please register again.");
        setStep(1);
        setResendLoading(false);
        return;
      }

      const res = await fetch(`${localApi}/api/auth/send-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          phone: userPhone,
          type: "resend",
        }),
      });

      const data = await res.json();
      if (data.status) {
        SuccessMessage("A new OTP has been sent.");
        setResendTimer(60);
      } else {
        ErrorMessage(data.message || "Could not resend OTP.");
      }
    } catch (error) {
      ErrorMessage("An error occurred while resending OTP.");
      setStep(1); // Go back to register if cookie is corrupted
    } finally {
      setResendLoading(false);
    }
  };

  const renderRegisterForm = () => (
    <form
      className="bg-white max-w-xl w-full mx-auto shadow-md p-6 sm:p-8 rounded-2xl"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="mb-12">
        <h3 className="font-semibold text-3xl text-center">
          {t("registerTitle")}
        </h3>
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
          <FaUser
            size={18}
            className="text-gray-300"
          />
        </div>
      </div>

      <div className="mt-8">
        <label className="text-gray-800 text-xs block mb-2">
          {t("phoneLabel")}
        </label>
        <div className="relative flex items-center">
          <input
            name="phone"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-transparent text-sm text-gray-800 border-b border-gray-300 focus:border-primary pl-2 pr-8 py-3 outline-none"
            placeholder={t("phonePlaceholder")}
          />
          <FaUser
            size={18}
            className="text-gray-300"
          />
        </div>
      </div>

      <div className="mt-8">
        <label className="text-gray-800 text-xs block mb-2">
          {t("emailLabel")}
        </label>
        <div className="relative flex items-center">
          <input
            name="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent text-sm text-gray-800 border-b border-gray-300 focus:border-primary pl-2 pr-8 py-3 outline-none"
            placeholder={t("emailPlaceholder")}
          />
          <HiMail
            size={20}
            className="text-gray-300"
          />
        </div>
      </div>

      <div className="mt-8">
        <label className="text-gray-800 text-xs block mb-2">
          {t("passwordLabel")}
        </label>
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
        <label className="text-gray-800 text-xs block mb-2">
          {t("cityLabel") || "City"}
        </label>
        <div className="relative flex items-center">
          <select
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full bg-transparent text-sm text-gray-800 border-b border-gray-300 focus:border-primary pl-2 pr-8 py-3 outline-none"
          >
            <option value="">{t("selectCity") || "Select City"}</option>
            {cities &&
              cities.map((cityItem) => (
                <option
                  key={cityItem.id}
                  value={cityItem.id}
                >
                  {cityItem.name}
                </option>
              ))}
          </select>
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
  );

  const renderOtpForm = () => (
    <div className="bg-white max-w-xl w-full mx-auto shadow-md p-6 sm:p-8 rounded-2xl">
      <div className="mb-8 text-center">
        <h3 className="font-semibold text-3xl">{t("otpTitle")}</h3>
        <p className="text-gray-600 mt-2">{t("otpDescription")}</p>
      </div>
      {error && (
        <p className="text-red-500 text-sm text-center mb-4">{error}</p>
      )}
      <div>
        <label className="text-gray-800 text-xs block mb-2">
          {t("otpLabel")}
        </label>
        <div className="relative flex items-center">
          <input
            name="otp"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full bg-transparent text-sm tracking-[1em] text-center text-gray-800 border-b border-gray-300 focus:border-primary px-2 py-3 outline-none"
            placeholder={t("otpPlaceholder")}
          />
          <FaKey
            size={18}
            className="absolute text-gray-300"
          />
        </div>
      </div>
      <div className="mt-8">
        <button
          onClick={handleVerifyOtp}
          type="button"
          className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold tracking-wider rounded-md text-white bg-primary hover:bg-[#bb3826d4] focus:outline-none transition-all"
          disabled={loading}
        >
          {loading ? t("verifying") : t("verifyButton")}
        </button>
      </div>
      <div className="mt-4 text-center">
        <button
          onClick={handleResendOtp}
          disabled={resendLoading || resendTimer > 0}
          className="text-sm text-primary hover:underline disabled:cursor-not-allowed disabled:opacity-50"
        >
          {resendLoading
            ? t("resending")
            : resendTimer > 0
            ? `Resend in ${resendTimer}s`
            : t("resendButton")}
        </button>
      </div>
    </div>
  );

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
      <div
        className="relative -mt-40 m-4"
        data-aos="zoom-in"
      >
        {step === 1 ? renderRegisterForm() : renderOtpForm()}
      </div>
    </div>
  );
};

export default Register;
