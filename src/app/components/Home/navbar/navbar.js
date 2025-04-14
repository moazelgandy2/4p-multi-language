"use client";
import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { HiMenuAlt1 } from "react-icons/hi";
import logo from "/public/image/logo-2.webp";
import { IoSearchOutline } from "react-icons/io5";
import { IoMdArrowDropdown, IoMdClose } from "react-icons/io";
import LanguageSwap from "./LanguageSwap";
import { debounce } from "lodash";
import { localApi, localImage } from "../../../../../localUrl";
import { getCookie } from "cookies-next";
import NavbarSetting from "./NavbarSetting";
import { useTranslations } from "next-intl";

const Navbar = ({ locale }) => {
  const t = useTranslations("Navbar");
  const [eductionMenu, setEductionMenu] = useState(null);
  const [isEducationOpen, setIsEducationOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const pathname = usePathname();
  const [val, setVal] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [mobileSearch, setMobileSearch] = useState("");
  const router = useRouter();
  const param = useSearchParams();
  useEffect(() => {
    const getUser = getCookie("userDetails");
    return getUser ? setUserDetails(JSON.parse(getUser)) : setUserDetails(null);
  }, [param]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleInputChange = useCallback(
    debounce((inputValue) => {
      setVal(inputValue);
      fetchPosts(inputValue);
    }, 500),
    []
  );

  const handleChange = (e) => {
    handleInputChange(e.target.value);
  };

  async function fetchPosts(inputValue) {
    const res = await fetch(
      `${localApi}/api/search?search=${inputValue}&type=vendor`
    );
    const data = await res.json();
    setSearchResult(data.data.vendors);
  }

  const handelSubmit = (e) => {
    e.preventDefault();
    router.push(`/${locale}/search?${mobileSearch}`);
  };

  useEffect(() => {
    const handelEductionMenu = async () => {
      try {
        const res = await fetch(
          `${localApi}/api/educationDepartment?lang=${locale}`
        );
        if (!res.ok) {
          return "";
        }
        const data = await res.json();
        return setEductionMenu(data.data.educationDepartments);
      } catch (error) {
        return "error";
      }
    };
    handelEductionMenu();
  }, [locale]);

  const haveCode = userDetails && userDetails.user.code;

  // Helper function to create localized links
  const localizeLink = (path) => {
    if (path === "/") return `/${locale}`;
    return `/${locale}${path}`;
  };

  const menuItems = haveCode
    ? [
        { name: t("Home"), link: "/" },
        { name: t("About"), link: "/about" },
        { name: t("Categories"), link: "/categories" },
        { name: t("Education"), link: "/#" },
        { name: t("News"), link: "/news" },
      ]
    : [
        { name: t("Home"), link: "/" },
        { name: t("About"), link: "/about" },
        { name: t("Categories"), link: "/categories" },
        { name: t("Education"), link: "/#" },
        { name: t("VIP_Discounts"), link: "/vip-discounts" },
        { name: t("News"), link: "/news" },
      ];

  // Check if current path starts with the current locale
  const isActiveLink = (path) => {
    if (path === "/" && (pathname === `/${locale}` || pathname === "/"))
      return true;
    return pathname.endsWith(path) || pathname === `/${locale}${path}`;
  };

  return (
    <nav
      className={`w-full z-50   ${
        pathname === `/${locale}` || pathname === "/en" || pathname === "/ar"
          ? `${isSticky ? "md:fixed top-0 bg-[#1a202c]" : "absolute"} `
          : "bg-[#1a202c] relative"
      }`}
    >
      <div className="w-full z-50 ">
        <div className="container">
          <div className="navbar text-white">
            <div className="navbar-start flex items-center gap-8 w-full">
              <Link href={`/${locale}`}>
                <Image
                  src={logo}
                  alt="logo"
                  width={100}
                  height={100}
                  className="py-1"
                />
              </Link>
              <ul className="hidden lg:flex text-[16px] flex-grow justify-start gap-6 text-white">
                {menuItems.map((item, index) => (
                  <li
                    key={index}
                    className="relative"
                  >
                    {item.name === t("Education") ? (
                      <div className="dropdown dropdown-hover">
                        <label
                          tabIndex={0}
                          className="cursor-pointer font-medium flex items-center gap-1 hover:text-primary"
                        >
                          {t("Education")} <IoMdArrowDropdown size={20} />
                        </label>
                        <ul
                          tabIndex={0}
                          className="dropdown-content z-[1] menu p-2 shadow-lg bg-white text-black rounded-lg w-52"
                        >
                          {eductionMenu?.map((ele) => (
                            <React.Fragment key={ele.id}>
                              <li className="hover:bg-primary hover:text-white rounded-md">
                                <Link
                                  href={`/${locale}/education/${ele.name}?departmentId=${ele.id}`}
                                >
                                  {ele.name}
                                </Link>
                              </li>
                            </React.Fragment>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <Link
                        href={localizeLink(item.link)}
                        className={`font-medium py-1 transition-all duration-300 ${
                          isActiveLink(item.link)
                            ? "border-b-2 border-primary font-semibold text-primary"
                            : "hover:text-primary"
                        }`}
                      >
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="navbar-end gap-5 w-auto md:w-[50%]">
              <div className="relative md:flex items-center gap-2 hidden">
                <input
                  className={`outline-none bg-transparent text-white border-b border-white px-2 py-1 transition-all duration-300 ease-in-out ${
                    isFocused
                      ? "w-40 opacity-100 scale-100"
                      : "w-0 opacity-0 scale-0"
                  }`}
                  type="text"
                  name="search"
                  placeholder="Search..."
                  onChange={handleChange}
                  onBlur={() => setIsFocused(false)}
                />
                <IoSearchOutline
                  className="text-white text-2xl cursor-pointer"
                  onClick={() => setIsFocused(true)}
                />
                {isFocused && val.length > 0 ? (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white text-black rounded-lg shadow-lg overflow-hidden">
                    {searchResult?.map((item) => (
                      <Link
                        href={`/${locale}/vendor/${item.name}/${item.id}`}
                        key={item.id}
                        onClick={() => setIsFocused(false)}
                      >
                        <div
                          key={item.id}
                          className="flex items-center gap-4 mb-5 p-3 hover:bg-gray-100 transition cursor-pointer"
                        >
                          <div className="w-12 h-12">
                            <Image
                              src={`${localImage}/${item.logo}`}
                              alt="logo"
                              width={120}
                              height={120}
                              className="rounded-sm "
                            />
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-gray-900">
                              {item.name}
                            </h3>
                            <p className="text-xs text-gray-600">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  ""
                )}
              </div>

              <LanguageSwap />

              <NavbarSetting userDetails={userDetails} />
              <div className="drawer drawer-end block md:hidden">
                <input
                  id="my-drawer-4"
                  type="checkbox"
                  className="drawer-toggle"
                />
                <div className="drawer-content">
                  <label
                    htmlFor="my-drawer-4"
                    className="drawer-button"
                  >
                    <HiMenuAlt1
                      size={25}
                      className="text-white"
                    />
                  </label>
                </div>
                <div className="drawer-side">
                  <label
                    htmlFor="my-drawer-4"
                    className="drawer-overlay"
                  ></label>
                  <div className="menu bg-gray-900 min-h-full w-80 p-4 text-gray-200">
                    <div className="pb-3 flex justify-between items-center">
                      <Image
                        src={logo}
                        alt="logo"
                        width={80}
                        height={80}
                        loading="lazy"
                      />
                      <IoMdClose
                        fontSize={30}
                        className="text-gray-500 hover:text-white cursor-pointer"
                        onClick={() =>
                          (document.getElementById(
                            "my-drawer-4"
                          ).checked = false)
                        }
                      />
                    </div>

                    {/* 🔎 Mobile Search */}
                    <form onSubmit={handelSubmit}>
                      <input
                        type="text"
                        placeholder="Search..."
                        onChange={(e) => setMobileSearch(e.target.value)}
                        className="w-full mb-3 px-4 py-2 my-1 rounded-md bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <input
                        type="submit"
                        defaultValue="search"
                        className="btn w-full bg-primary hover:bg-primary/80 text-white border-primary"
                      />
                    </form>

                    {/* 📚 Navigation Items */}
                    {menuItems.map((item, index) => (
                      <li key={index}>
                        {item.name === t("Education") ? (
                          <div className="block">
                            <button
                              className={`block py-2 px-4 rounded-md transition-all duration-300 my-1 ${
                                isEducationOpen
                                  ? "text-white font-semibold bg-primary border-l-4 border-primary"
                                  : "text-gray-200 hover:text-white hover:bg-primary/20"
                              }`}
                              onClick={() =>
                                setIsEducationOpen(!isEducationOpen)
                              }
                            >
                              {t("Education")}
                            </button>
                            {isEducationOpen && (
                              <div className="text-gray-300 rounded-md w-full">
                                {eductionMenu?.map((ele) => (
                                  <Link
                                    key={ele.id}
                                    href={`/${locale}/education/${ele.name}?departmentId=${ele.id}`}
                                    className="block py-2 px-4 text-gray-200 hover:text-white hover:bg-primary/20 transition-all duration-300"
                                    onClick={() =>
                                      (document.getElementById(
                                        "my-drawer-4"
                                      ).checked = false)
                                    }
                                  >
                                    {ele.name}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <Link
                            href={localizeLink(item.link)}
                            className={`block py-2 px-4 rounded-md transition-all duration-300 my-1 ${
                              isActiveLink(item.link)
                                ? "text-white font-semibold bg-primary border-l-4 border-primary"
                                : "text-gray-200 hover:text-white hover:bg-primary/20"
                            }`}
                            onClick={() =>
                              (document.getElementById(
                                "my-drawer-4"
                              ).checked = false)
                            }
                          >
                            {item.name}
                          </Link>
                        )}
                      </li>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default React.memo(Navbar);
