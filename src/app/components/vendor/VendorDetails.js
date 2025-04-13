"use client";
import { useState } from "react";
import { FaClock, FaEye, FaCopy, FaCheckCircle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { localApi, localImage } from "../../../../localUrl";
import Image from "next/image";
import { getCookie } from "cookies-next";
export default function DiscountCard({ data }) {
  const [isDiscount, setIsDiscount] = useState(false);
  const discounts = data.data.discounts;
  const SuccessMessage = (e) => toast.success(e);
  const ErrorMessage = (e) => toast.error(e);
  const getToken = getCookie("userDetails");
  
  const handelSubmit = async () => {
   if(getToken){
    const token = JSON.parse(getToken).token;
    try {
      const res = await fetch(`${localApi}/api/discountChecked/7`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.status) {
        SuccessMessage(data.message);
      } else {
        SuccessMessage(data.message);
      }
    } catch (error) {
      ErrorMessage("please try again");
    }
   }else{
    ErrorMessage('برجاء شراء البطاقه اولا للحصول علي الخصم');
   }
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 justify-normal">
        {discounts.length > 0
          ? discounts.map((item) => {
              return (
                <div
                  key={item.id}
                  className={
                    "relative p-6 rounded-2xl shadow-lg border transition-all duration-300 max-w-sm border-secondary bg-white"
                  }
                >
                  <Image
                    src={`${localImage}/${item.image}`}
                    alt={item.title}
                    width={400}
                    height={250}
                    className="w-full h-[180px] object-cover rounded-lg mb-4 imageHovered"
                  />
                  <h3 className="text-xl font-bold mb-2 text-secondary">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 mb-4 line-clamp-2 text-start">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <span className="flex items-center gap-1">
                      <FaEye className="w-4 h-4 text-secondary" />{" "}
                      {item.viwe_count} Client
                    </span>
                    <span className="flex items-center gap-1">
                      <FaClock className="w-4 h-4 text-secondary" /> Available
                      Now
                    </span>
                  </div>
                  <button
                    onClick={handelSubmit}
                    className="p-2 bg-primary text-white rounded-lg w-full hover:bg-primary/90 transition flex items-center justify-center gap-1"
                  >
                    <FaCopy className="w-4 h-4" /> Claim your discount!
                  </button>
                  
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
}
