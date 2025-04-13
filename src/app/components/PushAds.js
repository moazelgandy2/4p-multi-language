"use client";
import React, { useEffect, useState } from "react";
import { localApi, localImage } from "../../../localUrl";
import { getCookie } from "cookies-next";
import Link from "next/link";
import Image from "next/image";

const PushAds = () => {
  const [getAds, setGetAds] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const userDetails = getCookie("userDetails");
  const token = userDetails ? JSON.parse(userDetails).token : null;

  useEffect(() => {
    const fetchAds = async () => {
      if (!token) return;
      try {
        const res = await fetch(`${localApi}/api/config?lang=en`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (data.data?.ads) {
          setGetAds(data.data.ads);
          const hasSeenAd = sessionStorage.getItem("hasSeenAd");

          if (!hasSeenAd) {
            setIsOpen(true);
            sessionStorage.setItem("hasSeenAd", "true");
          }
        }
      } catch (error) {
        console.error("Error fetching ads:", error);
      }
    };

    fetchAds();
  }, [token]);

  if (!getAds || !isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white rounded-lg shadow-lg overflow-hidden max-w-sm w-full animate-fadeIn">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={() => setIsOpen(false)}
        >
          ✕
        </button>

        <Link href={getAds.url} target="_blank" onClick={() => setIsOpen(false)}>
          <Image
            src={`${localImage}/${getAds.image}`}
            alt={getAds.name}
            width={400}
            height={300}
            className="w-full h-auto object-cover"
          />
        </Link>

        <div className="p-4 text-center">
          <h3 className="text-lg font-bold text-gray-900">{getAds.name}</h3>
          <p className="text-sm text-gray-600">إعلان دعائي خاص بك</p>
        </div>
      </div>
    </div>
  );
};

export default PushAds;
