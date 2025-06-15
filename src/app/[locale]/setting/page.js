"use client";
import { getCookie, setCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import defaultImage from "/public/image/Default_user.jpg";
import Image from "next/image";
import { localApi, localImage } from "../../../../localUrl";
import { ToastContainer, toast } from "react-toastify";
import CardCode from "@/app/components/profile-setting/CardCode";
import SettingsSkeleton from "@/app/components/profile-setting/SettingsSkeleton";
import { useParams, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

const Page = () => {
  const [user, setUser] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [uploadImage, setUploadImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const SuccessMessage = (e) => toast.success(e);
  const ErrorMessage = (e) => toast.error(e);

  const [passwordStep, setPasswordStep] = useState("idle"); // idle, verify-otp, reset-password
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const params = useSearchParams();
  const getStatus = params.get("status");
  const getMessage = params.get("message");
  const { locale } = useParams();
  const t = useTranslations("UserProfile");

  useEffect(() => {
    const getDataFromCookies = getCookie("userDetails");
    if (!getDataFromCookies) {
      setLoading(false);
      return;
    }
    const token = JSON.parse(getDataFromCookies).token;
    const getData = async () => {
      try {
        const res = await fetch(`${localApi}/api/auth/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          throw new Error("Update failed, please try again.");
        }
        const data = await res.json();
        const status = data.status;
        if (status) {
          setUser(data.data);
          if (getStatus == "success" && getMessage == "Approved") {
            const getCookieData = JSON.parse(getDataFromCookies);
            const updatedUserDetails = {
              ...getCookieData,
              user: { ...getCookieData.user, ...data.data },
            };
            setCookie("userDetails", JSON.stringify(updatedUserDetails));
          }
        } else {
          ErrorMessage(data.message);
        }
      } catch (error) {
        ErrorMessage("Please Try Again");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [getMessage, getStatus]);

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
    if (getStatus == "pending" || getStatus == "failed") {
      ErrorMessage(t("payment_failed"));
    }
  }, [getStatus, t]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      setPreviewImage(URL.createObjectURL(file));
      setUploadImage(formData);
    }
  };

  const handleSendOtp = async () => {
    setOtpLoading(true);
    try {
      const res = await fetch(`${localApi}/api/auth/send-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: user.phone, type: "reset" }),
      });
      const data = await res.json();
      if (data.status) {
        SuccessMessage("OTP sent successfully.");
        setPasswordStep("verify-otp");
        setResendTimer(60);
      } else {
        ErrorMessage(data.message || "Failed to send OTP.");
      }
    } catch (error) {
      ErrorMessage("An error occurred while sending OTP.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      ErrorMessage(t("otp_required"));
      return;
    }
    setVerifyLoading(true);
    const token = JSON.parse(getCookie("userDetails")).token;
    const formData = new FormData();
    formData.append("phone", user.phone);
    formData.append("code", otp);
    try {
      const res = await fetch(`${localApi}/api/auth/verify-otp`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (data.status) {
        SuccessMessage("OTP verified successfully.");
        setPasswordStep("reset-password");
      } else {
        ErrorMessage(data.message || "Invalid OTP.");
      }
    } catch (error) {
      ErrorMessage("An error occurred during OTP verification.");
    } finally {
      setVerifyLoading(false);
    }
  };

  const validatePassword = () => {
    if (password.length < 6) {
      ErrorMessage(t("password_length_error"));
      return false;
    }
    if (password !== passwordConfirmation) {
      ErrorMessage(t("password_mismatch"));
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    setLoading(true);
    const token = JSON.parse(getCookie("userDetails")).token;

    const formData = new FormData();
    formData.append("name", user?.name || "");
    formData.append("email", user?.email || "");
    formData.append("phone", user?.phone || "");
    formData.append("city_id", user?.city_id || 1);

    if (uploadImage) {
      formData.append("image", uploadImage.get("image"));
    }

    if (passwordStep === "reset-password") {
      if (!validatePassword()) {
        setLoading(false);
        return;
      }
      formData.append("password", password);
      formData.append("password_confirmation", passwordConfirmation);
    }

    try {
      const res = await fetch(
        `${localApi}/api/auth/profile/update?lang=${locale}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );

      const data = await res.json();
      if (data.status) {
        SuccessMessage(data.message || "Profile updated successfully!");
        const getCookieData = JSON.parse(getCookie("userDetails"));
        const updatedUserDetails = {
          ...getCookieData,
          user: { ...getCookieData.user, ...data.data },
        };
        setCookie("userDetails", JSON.stringify(updatedUserDetails));
        window.location.reload();
      } else {
        ErrorMessage(data.message || "Update failed.");
      }
    } catch (error) {
      ErrorMessage(t("try_again"));
    } finally {
      setLoading(false);
    }
  };

  const renderPasswordSection = () => {
    switch (passwordStep) {
      case "verify-otp":
        return (
          <>
            <div className="mb-6">
              <label className="block mb-2 text-lg font-medium text-[#1a202c]">
                OTP Code
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="bg-white border border-gray-300 text-[#262626] text-lg rounded-lg focus:ring-[#BB3826] focus:border-[#BB3826] block w-full p-3"
                placeholder="Enter OTP from your phone"
              />
            </div>
            <div className="mb-6 flex flex-col items-center gap-4">
              <button
                onClick={handleVerifyOtp}
                disabled={verifyLoading}
                className="w-full text-white bg-primary hover:bg-primary/90 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-lg px-5 py-3 text-center"
              >
                {verifyLoading ? "Verifying..." : "Verify OTP"}
              </button>
              <button
                onClick={handleSendOtp}
                disabled={otpLoading || resendTimer > 0}
                className="text-sm text-primary hover:underline disabled:cursor-not-allowed disabled:opacity-50"
              >
                {otpLoading
                  ? "Resending..."
                  : resendTimer > 0
                  ? `Resend in ${resendTimer}s`
                  : "Resend OTP"}
              </button>
            </div>
          </>
        );
      case "reset-password":
        return (
          <>
            <div className="mb-6">
              <label className="block mb-2 text-lg font-medium text-[#1a202c]">
                {t("new_password_placeholder")}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white border border-gray-300 text-[#262626] text-lg rounded-lg focus:ring-[#BB3826] focus:border-[#BB3826] block w-full p-3"
                placeholder={t("new_password_placeholder")}
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-lg font-medium text-[#1a202c]">
                {t("confirm_password")}
              </label>
              <input
                type="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                className="bg-white border border-gray-300 text-[#262626] text-lg rounded-lg focus:ring-[#BB3826] focus:border-[#BB3826] block w-full p-3"
                placeholder={t("confirm_password_placeholder")}
              />
            </div>
          </>
        );
      case "idle":
      default:
        return (
          <div className="mb-6">
            <button
              onClick={handleSendOtp}
              disabled={otpLoading}
              className="w-full text-white bg-primary hover:bg-primary/90 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-lg px-5 py-3 text-center"
            >
              {otpLoading ? "Sending OTP..." : t("change_password")}
            </button>
          </div>
        );
    }
  };

  return (
    <div className="w-full flex flex-col justify-center gap-5 px-3 lg:px-28 md:flex-row">
      <ToastContainer />
      {loading ? (
        <SettingsSkeleton t={t} />
      ) : user ? (
        <main className="w-full min-h-screen py-1 flex justify-center">
          <div className="p-1 md:p-6 w-full">
            <div className="w-full pb-10 mt-8 sm:rounded-lg">
              <h2 className="pl-6 text-3xl font-bold sm:text-2xl text-[#1a202c]">
                {t("edit_profile")}
              </h2>

              <div className="grid mx-auto mt-8">
                <div className="flex flex-col items-center justify-between sm:flex-row sm:space-y-0 gap-10">
                  <div>
                    <label htmlFor="changePhoto">
                      <Image
                        className="object-cover w-48 h-48 p-1 rounded-full ring-2 ring-[#BB3826]"
                        alt={user.name || t("user_profile")}
                        src={
                          previewImage
                            ? previewImage
                            : user.image
                            ? `${localImage}/${user.image}`
                            : defaultImage
                        }
                        width={192}
                        height={192}
                      />
                    </label>
                    <div className="flex flex-col space-y-6 sm:ml-8">
                      <input
                        id="changePhoto"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </div>
                  </div>
                  {user.code ? <CardCode code={user.code} /> : null}
                </div>

                <div className="items-center mt-10 sm:mt-16">
                  <div className="mb-6">
                    <label className="block mb-2 text-lg font-medium text-[#1a202c]">
                      {t("name_label")}
                    </label>
                    <input
                      type="text"
                      value={user.name || ""}
                      onChange={(e) =>
                        setUser({ ...user, name: e.target.value })
                      }
                      className="bg-white border border-gray-300 text-[#262626] text-lg rounded-lg focus:ring-[#BB3826] focus:border-[#BB3826] block w-full p-3"
                      placeholder={t("name_placeholder")}
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block mb-2 text-lg font-medium text-[#1a202c]">
                      {t("email_label")}
                    </label>
                    <input
                      type="email"
                      value={user.email || ""}
                      onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                      }
                      className="bg-white border border-gray-300 text-[#262626] text-lg rounded-lg focus:ring-[#BB3826] focus:border-[#BB3826] block w-full p-3"
                      placeholder={t("email_placeholder")}
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block mb-2 text-lg font-medium text-[#1a202c]">
                      {t("phone_label")}
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={user.phone || ""}
                      className="bg-gray-100 border border-gray-300 text-gray-500 text-lg rounded-lg focus:ring-[#BB3826] focus:border-[#BB3826] block w-full p-3"
                      placeholder={t("phone_placeholder")}
                    />
                  </div>

                  {renderPasswordSection()}

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleSave}
                      className="text-white bg-[#BB3826] hover:bg-[#9f3122] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-3 text-center"
                    >
                      {t("save_button")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <p className="text-center text-lg mt-10">{t("loading_user_data")}</p>
      )}
    </div>
  );
};

export default Page;
