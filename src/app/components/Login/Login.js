"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { HiMail, HiPhone } from "react-icons/hi";
import { FaKey } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import Link from "next/link";
import Aos from "aos";
import { localApi } from "../../../../localUrl";
import { setCookie } from "cookies-next";
import bgCover from "/public/image/bg-02.png";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const Login = () => {
  const t = useTranslations("login");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const SuccessMessage = (e) => toast.success(e);
  const ErrorMessage = (e) => toast.error(e);
  const router = useRouter();

  // State for forgot password flow
  const [flow, setFlow] = useState("login"); // login, enterPhone, verifyOtp, resetPassword
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [resetToken, setResetToken] = useState("");

  useEffect(() => {
    Aos.init();
  }, []);

  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const clearForm = () => {
    setPassword("");
    setConfirmPassword("");
    setOtp("");
    setError("");
    setResetToken("");
  };

  const handleFlowChange = (newFlow) => {
    clearForm();
    setFlow(newFlow);
  };

  const handleLogin = async () => {
    if (!phone.match(/^01[0-9]{9}$/)) {
      setError(t("validPhoneNumber"));
      return;
    }
    if (password.length < 6) {
      setError(t("passwordLengthError"));
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${localApi}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, password }),
      });

      const data = await res.json();
      if (data.status) {
        setCookie(
          "userDetails",
          JSON.stringify({ token: data.data.token, user: data.data.user })
        );
        SuccessMessage(data.message);
        router.push("/?new=true");
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

  const handleRequestOtp = async () => {
    if (!phone.match(/^01[0-9]{9}$/)) {
      setError(t("validPhoneNumber"));
      return;
    }
    setError("");
    setOtpLoading(true);
    try {
      const res = await fetch(`${localApi}/api/auth/send-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, type: "reset" }),
      });
      const data = await res.json();
      if (data.status) {
        SuccessMessage("OTP sent successfully!");
        handleFlowChange("verifyOtp");
        setResendTimer(60);
      } else {
        ErrorMessage(data.message || "Failed to send OTP.");
      }
    } catch (err) {
      ErrorMessage("An error occurred.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${localApi}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code: otp, type: "reset" }),
      });
      const data = await res.json();
      if (data.status) {
        SuccessMessage("OTP verified successfully!");
        if (data.data && typeof data.data === "string") {
          setResetToken(data.data);
          setFlow("resetPassword");
          setError("");
          setOtp("");
        } else {
          ErrorMessage(
            data.message ||
              "Verification successful, but token was not provided."
          );
        }
      } else {
        ErrorMessage(data.message || "Invalid OTP.");
      }
    } catch (error) {
      ErrorMessage("An error occurred during verification.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (password.length < 6) {
      setError(t("passwordLengthError"));
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${localApi}/api/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resetToken}`,
        },
        body: JSON.stringify({
          password,
          password_confirmation: confirmPassword,
        }),
      });

      const data = await res.json();
      if (data.status) {
        SuccessMessage(t("passwordResetSuccess"));
        handleFlowChange("login");
        setPhone(""); // Clear phone as well on final success
      } else {
        ErrorMessage(data.message || "Failed to reset password.");
      }
    } catch (err) {
      ErrorMessage("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const renderLoginForm = () => (
    <>
      <div className="mb-12">
        <h3 className="text-primary text-3xl text-center">{t("loginTitle")}</h3>
      </div>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      {/* Phone Input */}
      <div className="mt-8">
        <label className="text-gray-800 text-xs block mb-2">
          {t("phoneLabel")}
        </label>
        <div className="relative flex items-center">
          <input
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="text"
            className="w-full bg-transparent text-sm text-gray-800 border-b border-gray-300 focus:border-primary pl-2 pr-8 py-3 outline-none"
            placeholder={t("phonePlaceholder")}
            required
          />
          <HiMail
            size={20}
            className="text-gray-300"
          />
        </div>
      </div>
      {/* Password Input */}
      <div className="mt-8">
        <label className="text-gray-800 text-xs block mb-2">
          {t("passwordLabel")}
        </label>
        <div className="relative flex items-center">
          <input
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            type={hidePassword ? "password" : "text"}
            className="w-full bg-transparent text-sm text-gray-800 border-b border-gray-300 focus:border-primary pl-2 pr-8 py-3 outline-none"
            placeholder={t("passwordPlaceholder")}
            required
          />
          <MdOutlineRemoveRedEye
            size={20}
            className="text-gray-300 cursor-pointer"
            onClick={() => setHidePassword(!hidePassword)}
          />
        </div>
      </div>
      {/* Forgot Password Link */}
      <div className="flex justify-end mt-4">
        <button
          onClick={() => handleFlowChange("enterPhone")}
          className="text-sm text-primary hover:underline"
        >
          {t("forgotPassword")}
        </button>
      </div>
      {/* Login Button */}
      <div className="mt-8">
        <button
          onClick={handleLogin}
          type="button"
          className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold tracking-wider rounded-md text-white bg-primary hover:bg-[#bb3826d4] focus:outline-none transition-all"
          disabled={loading}
        >
          {loading ? t("loggingIn") : t("loginButton")}
        </button>
        <p className="text-gray-800 text-sm mt-4 text-center">
          {t("noAccountText")}{" "}
          <Link
            href="/register"
            className="text-primary font-semibold hover:underline ml-1"
          >
            {t("registerLinkText")}
          </Link>
        </p>
      </div>
    </>
  );

  const renderEnterPhoneForm = () => (
    <>
      <div className="mb-12">
        <h3 className="text-primary text-3xl text-center">
          {t("resetPasswordTitle")}
        </h3>
        <p className="text-center text-sm mt-2">{t("enterPhoneNumber")}</p>
      </div>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      <div className="mt-8">
        <label className="text-gray-800 text-xs block mb-2">
          {t("phoneLabel")}
        </label>
        <div className="relative flex items-center">
          <input
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="text"
            className="w-full bg-transparent text-sm text-gray-800 border-b border-gray-300 focus:border-primary pl-2 pr-8 py-3 outline-none"
            placeholder={t("phonePlaceholder")}
            required
          />
          <HiPhone
            size={20}
            className="text-gray-300"
          />
        </div>
      </div>
      <div className="mt-8">
        <button
          onClick={handleRequestOtp}
          type="button"
          className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold tracking-wider rounded-md text-white bg-primary hover:bg-[#bb3826d4] focus:outline-none transition-all"
          disabled={otpLoading}
        >
          {otpLoading ? t("sendingOtp") : t("sendOtpButton")}
        </button>
      </div>
      <div className="text-center mt-4">
        <button
          onClick={() => handleFlowChange("login")}
          className="text-sm text-primary hover:underline"
        >
          {t("backToLogin")}
        </button>
      </div>
    </>
  );

  const renderVerifyOtpForm = () => (
    <>
      <div className="mb-12">
        <h3 className="text-primary text-3xl text-center">
          {t("resetPasswordTitle")}
        </h3>
        <p className="text-center text-sm mt-2">
          An OTP has been sent to {phone}.
        </p>
      </div>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      <div className="mt-8">
        <label className="text-gray-800 text-xs block mb-2">
          {t("otpLabel")}
        </label>
        <div className="relative flex items-center">
          <input
            name="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            type="text"
            className="w-full bg-transparent text-sm text-gray-800 border-b border-gray-300 focus:border-primary pl-2 pr-8 py-3 outline-none"
            placeholder={t("otpPlaceholder")}
            required
          />
          <FaKey
            size={20}
            className="text-gray-300"
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
      <div className="text-center mt-4">
        <button
          onClick={handleRequestOtp}
          disabled={otpLoading || resendTimer > 0}
          className="text-sm text-primary hover:underline disabled:cursor-not-allowed disabled:opacity-50"
        >
          {otpLoading
            ? t("sendingOtp")
            : resendTimer > 0
            ? `Resend in ${resendTimer}s`
            : "Resend OTP"}
        </button>
      </div>
    </>
  );

  const renderResetPasswordForm = () => (
    <>
      <div className="mb-12">
        <h3 className="text-primary text-3xl text-center">
          {t("resetPasswordTitle")}
        </h3>
      </div>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      <div className="mt-8">
        <label className="text-gray-800 text-xs block mb-2">
          {t("newPasswordLabel")}
        </label>
        <div className="relative flex items-center">
          <input
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            type={hidePassword ? "password" : "text"}
            className="w-full bg-transparent text-sm text-gray-800 border-b border-gray-300 focus:border-primary pl-2 pr-8 py-3 outline-none"
            placeholder={t("newPasswordLabel")}
            required
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
          {t("confirmPasswordLabel")}
        </label>
        <div className="relative flex items-center">
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            name="confirmPassword"
            type={hidePassword ? "password" : "text"}
            className="w-full bg-transparent text-sm text-gray-800 border-b border-gray-300 focus:border-primary pl-2 pr-8 py-3 outline-none"
            placeholder={t("confirmPasswordLabel")}
            required
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
          onClick={handleResetPassword}
          type="button"
          className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold tracking-wider rounded-md text-white bg-primary hover:bg-[#bb3826d4] focus:outline-none transition-all"
          disabled={loading}
        >
          {loading ? t("resettingPassword") : t("resetPasswordButton")}
        </button>
      </div>
    </>
  );

  const renderContent = () => {
    switch (flow) {
      case "enterPhone":
        return renderEnterPhoneForm();
      case "verifyOtp":
        return renderVerifyOtpForm();
      case "resetPassword":
        return renderResetPasswordForm();
      case "login":
      default:
        return renderLoginForm();
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
      <div
        className="relative -mt-40 m-4"
        data-aos="zoom-in"
      >
        <form
          className="bg-white max-w-xl w-full mx-auto shadow-md p-6 sm:p-8 rounded-2xl"
          onSubmit={(e) => e.preventDefault()}
        >
          {renderContent()}
        </form>
      </div>
    </div>
  );
};

export default Login;
