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
  const [loading, setLoading] = useState(true); // Set initial loading to true
  const SuccessMessage = (e) => toast.success(e);
  const ErrorMessage = (e) => toast.error(e);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const params = useSearchParams();
  const getStatus = params.get("status");
  const getMessage = params.get("message");
  const { locale } = useParams();
  const t = useTranslations("UserProfile");

  useEffect(() => {
    const getDataFromCookies = getCookie("userDetails");
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
            const getDataFromCookies = getCookie("userDetails");
            const getCookieData = JSON.parse(getDataFromCookies);
            const updatedUserDetails = {
              ...getCookieData,
              user: {
                ...getCookieData.user,
                code: data.data.code,
              },
            };
            setCookie("userDetails", updatedUserDetails);
            console.log(getDataFromCookies);
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
    if (getStatus == "pending" || getStatus == "failed") {
      ErrorMessage(
        t("payment_failed", {
          fallback: "فشلت عمليه الدفع برجاء المحاوله في وقت لاحق",
        })
      );
    }
  }, [getStatus, t]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setUploadImage(formData);
    }
  };

  const validateInputs = () => {
    if (password.length < 6) {
      ErrorMessage(
        t("password_length_error", {
          fallback: "Password must be at least 6 characters long.",
        })
      );
      return false;
    } else if (password !== passwordConfirmation) {
      ErrorMessage(
        t("password_mismatch", { fallback: "Password is not the same." })
      );
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (password.length !== 0) {
      if (!validateInputs()) return;
    }
    const getDataFromCookies = getCookie("userDetails");
    const token = JSON.parse(getDataFromCookies).token;

    setLoading(true);
    const formData = new FormData();
    formData.append("name", user?.name || "");
    formData.append("email", user?.email || "");
    formData.append("phone", user?.phone || "");
    formData.append("city_id", 1);

    if (password) {
      formData.append("password", password);
      formData.append("password_confirmation", passwordConfirmation);
    }

    if (uploadImage) {
      formData.append("image", uploadImage.get("image"));
    }

    try {
      const res = await fetch(`${localApi}/api/auth/profile/update`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Update failed, please try again.");
      }

      const data = await res.json();

      if (data.status) {
        SuccessMessage(data.message);
        const getCookieData = JSON.parse(getDataFromCookies);
        const updatedUserDetails = {
          ...getCookieData,
          user: {
            ...getCookieData.user,
            image: data.data.image,
          },
        };
        setCookie("userDetails", updatedUserDetails);
        window.location.reload();
      } else {
        ErrorMessage(data.message);
      }
    } catch (error) {
      ErrorMessage(t("try_again", { fallback: "Please Try Again" }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center gap-5 px-3  lg:px-28 md:flex-row">
      <ToastContainer />
      {/* Main Content */}
      {loading ? (
        <SettingsSkeleton t={t} />
      ) : user ? (
        <main className="w-full min-h-screen py-1 flex justify-center">
          <div className="p-1 md:p-6 w-full">
            <div className="w-full  pb-10 mt-8  sm:rounded-lg">
              <h2 className="pl-6 text-3xl font-bold sm:text-2xl text-[#1a202c]">
                {t("edit_profile", { fallback: "Edit Your Profile" })}
              </h2>

              <div className="grid mx-auto mt-8">
                <div className="flex flex-col items-center justify-between  sm:flex-row sm:space-y-0 gap-10">
                  <div>
                    {/* Profile Picture */}
                    <label htmlFor="changePhoto">
                      <Image
                        className="object-cover w-48 h-48 p-1 rounded-full ring-2 ring-[#BB3826]"
                        alt={
                          user.name ||
                          t("user_profile", { fallback: "User Profile" })
                        }
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

                {/* User Information */}
                <div className="items-center mt-10 sm:mt-16">
                  <div className="mb-6">
                    <label className="block mb-2 text-lg font-medium text-[#1a202c]">
                      {t("name_label", { fallback: "Your Name" })}
                    </label>
                    <input
                      type="text"
                      value={user.name || ""}
                      onChange={(e) =>
                        setUser({ ...user, name: e.target.value })
                      }
                      className="bg-white border border-gray-300 text-[#262626] text-lg rounded-lg focus:ring-[#BB3826] focus:border-[#BB3826] block w-full p-3"
                      placeholder={t("name_placeholder", {
                        fallback: "Your name",
                      })}
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block mb-2 text-lg font-medium text-[#1a202c]">
                      {t("email_label", { fallback: "Your Email" })}
                    </label>
                    <input
                      type="email"
                      value={user.email || ""}
                      onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                      }
                      className="bg-white border border-gray-300 text-[#262626] text-lg rounded-lg focus:ring-[#BB3826] focus:border-[#BB3826] block w-full p-3"
                      placeholder={t("email_placeholder", {
                        fallback: "your.email@mail.com",
                      })}
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block mb-2 text-lg font-medium text-[#1a202c]">
                      {t("phone_label", { fallback: "Your Phone" })}
                    </label>
                    <input
                      type="text"
                      value={user.phone || ""}
                      onChange={(e) =>
                        setUser({ ...user, phone: e.target.value })
                      }
                      className="bg-white border border-gray-300 text-[#262626] text-lg rounded-lg focus:ring-[#BB3826] focus:border-[#BB3826] block w-full p-3"
                      placeholder={t("phone_placeholder", {
                        fallback: "Your phone",
                      })}
                    />
                  </div>

                  <div className="mb-8">
                    <label className="block mb-2 text-lg font-medium text-[#1a202c]">
                      {t("city_label", { fallback: "City" })}
                    </label>
                    <input
                      type="text"
                      value={user.city || "Alexandria, Egypt"}
                      onChange={(e) =>
                        setUser({ ...user, city: e.target.value })
                      }
                      className="bg-white border border-gray-300 text-[#262626] text-lg rounded-lg focus:ring-[#BB3826] focus:border-[#BB3826] block w-full p-3"
                      placeholder={t("city_placeholder", {
                        fallback: "Your city",
                      })}
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block mb-2 text-lg font-medium text-[#1a202c]">
                      {t("change_password", { fallback: "Change Password" })}
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-white border border-gray-300 text-[#262626] text-lg rounded-lg focus:ring-[#BB3826] focus:border-[#BB3826] block w-full p-3"
                      placeholder={t("new_password_placeholder", {
                        fallback: "Enter Your New Password",
                      })}
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block mb-2 text-lg font-medium text-[#1a202c]">
                      {t("confirm_password", { fallback: "Confirm Password" })}
                    </label>
                    <input
                      type="password"
                      value={passwordConfirmation}
                      onChange={(e) => setPasswordConfirmation(e.target.value)}
                      className="bg-white border border-gray-300 text-[#262626] text-lg rounded-lg focus:ring-[#BB3826] focus:border-[#BB3826] block w-full p-3"
                      placeholder={t("confirm_password_placeholder", {
                        fallback: "Confirm Your New Password",
                      })}
                    />
                  </div>
                  {/* Save Button */}
                  <div className="flex justify-end">
                    <button
                      onClick={handleSave}
                      className="text-white bg-[#BB3826] hover:bg-[#962E1E] focus:ring-4 focus:outline-none focus:ring-[#BB3826] font-medium rounded-lg text-lg px-6 py-3"
                    >
                      {t("save_button", { fallback: "Save" })}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <p className="text-center text-lg text-gray-500 h-[90vh]">
          {t("no_user_found", { fallback: "No user found" })}
        </p>
      )}
    </div>
  );
};

export default Page;
