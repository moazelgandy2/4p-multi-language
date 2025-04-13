"use client";
import Link from "next/link";
import "./globals.css";

export default function NotFound() {
  return (
    <html>
      <body className="text-center bg-white h-[100vh]">
        <section className="bg-white">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center">
              <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600">
                404
              </h1>
              <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl ">
                Somethings missing.
              </p>
              <p className="mb-4 text-lg font-light text-gray-500">
                Sorry, we cant find that page. You wll find lots to explore on the
                home page.
              </p>
              <Link
                href="/"
                className="inline-flex text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4"
              >
                Back to Homepage
              </Link>
            </div>
          </div>
        </section>
      </body>
    </html>
  );
}
