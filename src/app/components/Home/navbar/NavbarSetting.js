import Link from "next/link";
import React from "react";
import { FaRegUser } from "react-icons/fa";
import defaultImage from "/public/image/Default_user.jpg";
import Image from "next/image";
import { localImage } from "../../../../../localUrl";
import { deleteCookie } from "cookies-next";
import { useTranslations } from "next-intl"; 

const NavbarSetting = ({ userDetails }) => {
  const t = useTranslations("Navbar");
  const leaveAccount = () => {
    deleteCookie("userDetails");
    window.location.reload();
  };

  const user = userDetails?.user;
  return (
    <>
      {user ? (
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <Image
                alt="Profile image"
                src={user.image ? `${localImage}/${user.image}` : defaultImage}
                width={50} height={50}
              />
            </div>
          </div>
          <ul className="menu menu-sm dropdown-content bg-[#f5f5f5] rounded-box z-[1] mt-3 w-52 p-2 shadow text-[#262626]">
            <li>
              <p className="text-primary">{user.name}</p>
            </li>
            <li>
              <Link
                href={"/setting"}
                className="hover:bg-[#BB3826] hover:text-white rounded-md px-2 py-1 transition-all"
              >
                {t("editProfile")}
              </Link>
            </li>
            <li>
              <button
                onClick={() => leaveAccount()}
                className="w-full text-left hover:bg-[#BB3826] hover:text-white rounded-md px-2 py-1 transition-all"
              >
                {t("logout")}
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <div className="md:flex hidden items-center gap-2 mr-1">
          <FaRegUser size={20} />
          <Link href="/login">{t("loginText")}</Link>
        </div>
      )}
    </>
  );
};

export default NavbarSetting;
