"use client";

import { IoSearchOutline } from "react-icons/io5";

const BookingForm = () => {
  return (
    <>
      <div className="flex flex-col">
      <div className="relative md:w-[400px]">
      <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-lg" />
      <input
        type="text"
        name="destination"
        className="h-12 bg-white pl-10 pr-4 placeholder:text-sm placeholder:text-slate-400 rounded-md w-full focus:outline focus:outline-primary"
        placeholder="Discover the Best Spots"
      />
    </div>
      </div>
      <button className="text-white h-12 bg-primary md:w-40 w-full mt-5 md:mt-0 rounded-md hover:bg-orange-600 transition flex justify-center items-center gap-2">
        <IoSearchOutline size={20}/>
        Search
      </button>
    </>
  );
};

export default BookingForm;
