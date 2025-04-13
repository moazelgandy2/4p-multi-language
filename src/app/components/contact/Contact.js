"use client";
import React, { useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { FaPhoneVolume } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import IconsForm from "./iconsForm";
import Aos from "aos";

const Contact = () => {
  useEffect(() => {
    Aos.init({
      duration: 500,
      once: true,
      mirror: true,
      offset: 100,
    });
  }, []);
  return (
    <>
      <section className="relative z-10 overflow-hidden bg-white  lg:py-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap lg:justify-between">
            <div
              className="w-full px-4 lg:w-1/2 xl:w-6/12"
              data-aos="fade-right"
            >
              <div className="mb-12 max-w-[570px] lg:mb-0">
                <span className="mb-4 block text-base font-semibold text-primary">
                  Contact Us
                </span>
                <h2 className="mb-6 text-[32px] font-bold uppercase text-dark  sm:text-[40px] lg:text-[36px] xl:text-[40px]">
                  GET IN TOUCH WITH US
                </h2>
                <p className="mb-9 text-base leading-relaxed text-body-color ">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eius tempor incididunt ut labore e dolore magna aliqua. Ut
                  enim adiqua minim veniam quis nostrud exercitation ullamco
                </p>
                <div className="mb-8 flex w-full max-w-[370px]">
                  <div className="mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded bg-primary/5 text-primary sm:h-[70px] sm:max-w-[70px]">
                    <FaHome size={25} />
                  </div>
                  <div className="w-full">
                    <h4 className="mb-1 text-xl font-bold text-dark ">
                      Our Location
                    </h4>
                    <p className="text-base text-body-color ">
                      99 S.t Jomblo Park Pekanbaru 28292. Indonesia
                    </p>
                  </div>
                </div>

                <div className="mb-8 flex w-full max-w-[370px]">
                  <div className="mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded bg-primary/5 text-primary sm:h-[70px] sm:max-w-[70px]">
                    <FaPhoneVolume size={25} />
                  </div>
                  <div className="w-full">
                    <h4 className="mb-1 text-xl font-bold text-dark ">
                      Phone Number
                    </h4>
                    <p className="text-base text-body-color ">
                      (+62)81 414 257 9980
                    </p>
                  </div>
                </div>

                <div className="mb-8 flex w-full max-w-[370px]">
                  <div className="mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded bg-primary/5 text-primary sm:h-[70px] sm:max-w-[70px]">
                    <SiGmail size={25} />
                  </div>
                  <div className="w-full">
                    <h4 className="mb-1 text-xl font-bold text-dark ">
                      Email Address
                    </h4>
                    <p className="text-base text-body-color">
                      info@yourdomain.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="w-full px-4 lg:w-1/2 xl:w-5/12"
              data-aos="fade-left"
            >
              <div className="relative rounded-lg p-8 shadow-lg sm:p-12">
                <form>
                  <div className="mb-6 xx">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      className="w-full rounded border border-stroke px-4 py-3 text-base outline-none focus:border-primary bg-white"
                    />
                  </div>

                  <div className="mb-6">
                    <input
                      type="text"
                      name="email"
                      placeholder="Your Email"
                      className="w-full rounded border border-stroke px-4 py-3 text-base outline-none focus:border-primary bg-white"
                    />
                  </div>

                  <div className="mb-6">
                    <input
                      type="text"
                      name="phone"
                      placeholder="Your Phone"
                      className="w-full rounded border border-stroke px-4 py-3 text-base outline-none focus:border-primary bg-white"
                    />
                  </div>

                  <div className="mb-6">
                    <textarea
                      rows="6"
                      name="details"
                      placeholder="Your Message"
                      className="w-full rounded border border-stroke px-4 py-3 text-base outline-none focus:border-primary bg-white"
                    ></textarea>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full rounded border border-primary bg-primary p-3 text-white transition hover:bg-opacity-90 "
                    >
                      Send Message
                    </button>
                  </div>
                </form>

                <div>
                  <IconsForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;