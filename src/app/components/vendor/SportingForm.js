"use client";
import React, { useEffect, useState } from "react";
import { localApi } from "../../../../localUrl";
import { getCookie } from "cookies-next";
import { ToastContainer, toast } from "react-toastify";
import { useSearchParams } from "next/navigation";

const SportingForm = () => {
  const params = useSearchParams()
  const isSport = params.get('sport')
  const notifyNotSignIn = () =>
    toast.warning("برجاء تسجيل الدخول اولا حتي يمكنك ارسال الاستماره ");
  const SuccessMessage = (e) => toast.success(e);
  const ErrorMessage = (e) => toast.error(e);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    age: "",
    name_of_old_club: "",
    name_of_current_club: "",
    job_of_parent: "",
    long_life_desises: "",
    injuries: "",
    images: null,
    city_name: "",
  });
  const [hiddenBtn, setHiddenBtn] = useState(true);

  const getFormData = (e) => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  useEffect(() => {
    const getToken = getCookie("userDetails");
    if (!getToken && isSport == 'true') {
      notifyNotSignIn();
    } else {
      setHiddenBtn(false);
    }
  }, [isSport]);

  const sendData = async () => {
    const getToken = getCookie("userDetails");
    const token = JSON.parse(getToken).token;
    const makeFormData = new FormData();
    // Loop through each entry in formData and append key-value pairs
    if (formData.images) {
      makeFormData.append("image", formData.images);
    }

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined && key !== "images") {
        makeFormData.append(key, value);
      }
    });
    try {
      const res = await fetch(`${localApi}/api/player_form`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: makeFormData,
      });
      if (!res.ok) {
        ErrorMessage("please try again");
      }
      const data = await res.json();
      if (data.status) {
        SuccessMessage(data.message);
      } else {
        ErrorMessage(data.message);
      }
    } catch (error) {
      ErrorMessage("please try again");
    }
  };

  return (
    <>
    {isSport == 'true' ? 
        <div className="container">
        <ToastContainer />
        <div className="w-full px-4">
          <div className="relative rounded-lg bg-white mb-10 shadow-lg sm:p-12">
            <h2 className="text-2xl font-bold text-center text-primary mb-6">
              Player Enrollment Form
            </h2>
            <form action={sendData}>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ""}
                  placeholder="Your Name"
                  onChange={getFormData}
                  className="w-full rounded border border-stroke px-4 py-3 text-base outline-none focus:border-primary"
                  required
                />
              </div>
  
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  onChange={getFormData}
                  value={formData.phone || ""}
                  placeholder="Your Phone"
                  className="w-full rounded border border-stroke px-4 py-3 text-base outline-none focus:border-primary"
                  required
                />
              </div>
  
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  placeholder="Your Age"
                  onChange={getFormData}
                  value={formData.age || ""}
                  className="w-full rounded border border-stroke px-4 py-3 text-base outline-none focus:border-primary"
                  required
                />
              </div>
  
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Old Club Name
                </label>
                <input
                  type="text"
                  name="name_of_old_club"
                  placeholder="Old Club Name"
                  onChange={getFormData}
                  value={formData.name_of_old_club || ""}
                  className="w-full rounded border border-stroke px-4 py-3 text-base outline-none focus:border-primary"
                />
              </div>
  
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Current Club Name
                </label>
                <input
                  type="text"
                  name="name_of_current_club"
                  placeholder="Current Club Name"
                  onChange={getFormData}
                  value={formData.name_of_current_club || ""}
                  className="w-full rounded border border-stroke px-4 py-3 text-base outline-none focus:border-primary"
                  required
                />
              </div>
  
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Parents Job
                </label>
                <input
                  type="text"
                  name="job_of_parent"
                  placeholder="Parent's Job"
                  onChange={getFormData}
                  value={formData.job_of_parent || ""}
                  className="w-full rounded border border-stroke px-4 py-3 text-base outline-none focus:border-primary"
                  required
                />
              </div>
  
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Long Life Diseases (if any)
                </label>
                <textarea
                  rows="2"
                  name="long_life_desises"
                  placeholder="Long Life Diseases (if any)"
                  onChange={getFormData}
                  value={formData.long_life_desises || ""}
                  className="w-full rounded border border-stroke px-4 py-3 text-base outline-none focus:border-primary"
                ></textarea>
              </div>
  
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Injuries (if any)
                </label>
                <textarea
                  rows="2"
                  name="injuries"
                  placeholder="Injuries (if any)"
                  onChange={getFormData}
                  value={formData.injuries || ""}
                  className="w-full rounded border border-stroke px-4 py-3 text-base outline-none focus:border-primary"
                ></textarea>
              </div>
  
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Upload Images
                </label>
                <input
                  type="file"
                  name="images"
                  onChange={getFormData}
                  className="w-full rounded border border-stroke px-4 py-3 text-base outline-none focus:border-primary"
                  required
                />
              </div>
  
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  City Name
                </label>
                <input
                  type="text"
                  name="city_name"
                  placeholder="City Name"
                  onChange={getFormData}
                  value={formData.city_name || ""}
                  className="w-full rounded border border-stroke px-4 py-3 text-base outline-none focus:border-primary"
                  required
                />
              </div>
  
              <div>
                <button
                  disabled={hiddenBtn}
                  type="submit"
                  className={`w-full rounded border border-primary
                   bg-primary p-3 text-white transition hover:bg-opacity-90 ${
                     hiddenBtn ? "opacity-45" : "opacity-100"
                   }`}
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    : 
    ''
    }
    </>
  );
};

export default SportingForm;
