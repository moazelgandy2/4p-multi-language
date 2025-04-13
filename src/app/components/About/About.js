"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import imageCover from "/public/image/cover.jpg";
import Aos from "aos";
import { FaArrowDown } from "react-icons/fa";

const faqs = [
  {
    question: "How to create an account?",
    answer:
      "To create an account, find the 'Sign up' or 'Create account' button, fill out the registration form with your personal information, and click 'Create account' or 'Sign up.' Verify your email address if needed, and then log in to start using the platform.",
  },
  {
    question: "Have any trust issue?",
    answer:
      "Our focus on providing robust and user-friendly content management capabilities ensures that you can manage your content with confidence, and achieve your content marketing goals with ease.",
  },
  {
    question: "How can I reset my password?",
    answer:
      "Our focus on providing robust and user-friendly content management capabilities ensures that you can manage your content with confidence, and achieve your content marketing goals with ease.",
  },
  {
    question: "What is the payment process?",
    answer:
      "Our focus on providing robust and user-friendly content management capabilities ensures that you can manage your content with confidence, and achieve your content marketing goals with ease.",
  },
];

export default function About() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    Aos.init({
      duration: 500,
    });
  }, []);

  return (
    <section className="my-sectionsSpace">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center items-center gap-x-16 gap-y-5 xl:gap-28 lg:flex-row lg:justify-between max-lg:max-w-2xl mx-auto max-w-full">
          <div className="w-full lg:w-1/2" data-aos="fade-right">
            <Image
              src={imageCover}
              loading="lazy"
              alt="FAQ section"
              width={600}
              height={400}
              className="w-full rounded-xl object-cover"
            />
          </div>
          <div className="w-full lg:w-1/2" data-aos="fade-left">
            <div className="lg:max-w-xl">
              <div className="mb-6 lg:mb-16">
                <h6 className="text-lg text-center font-medium text-primary mb-2 lg:text-left">
                  FAQs
                </h6>
                <h2 className="text-4xl text-center font-bold text-gray-900 leading-[3.25rem] mb-5 lg:text-left">
                  Looking for answers?
                </h2>
              </div>
              <div>
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 py-4">
                    <button
                      className="w-full flex justify-between items-center text-xl font-normal text-gray-600 hover:text-primary transition duration-500"
                      onClick={() => toggleFAQ(index)}
                    >
                      <h5>{faq.question}</h5>
                      <FaArrowDown size={15}/>
                    </button>
                    {openIndex === index && (
                      <p className="mt-2 text-base text-gray-600">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
