import React from "react";

const SettingsSkeleton = ({ t }) => {
  return (
    <main className="w-full min-h-screen py-1 flex justify-center">
      <div className="p-1 md:p-6 w-full">
        <div className="w-full pb-10 mt-8 sm:rounded-lg">
          {/* Title Skeleton */}
          <div className="pl-6 h-10 w-64 bg-gray-200 rounded-lg animate-pulse mb-8"></div>

          <div className="grid mx-auto mt-8">
            <div className="flex flex-col items-center justify-between sm:flex-row sm:space-y-0 gap-10">
              <div>
                {/* Profile Picture Skeleton with ring to match the UI */}
                <div className="w-48 h-48 rounded-full bg-gray-200 animate-pulse p-1 ring-2 ring-[#BB3826]"></div>
              </div>

              {/* Card Code Skeleton - matching the gradient and styling of the card */}
            </div>

            {/* User Information Form Skeletons */}
            <div className="items-center mt-10 sm:mt-16">
              {/* Name Field */}
              <div className="mb-6">
                <div className="block mb-2 h-7 w-28 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-14 w-full bg-gray-100 border border-gray-200 rounded-lg animate-pulse"></div>
              </div>

              {/* Email Field */}
              <div className="mb-6">
                <div className="block mb-2 h-7 w-28 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-14 w-full bg-gray-100 border border-gray-200 rounded-lg animate-pulse"></div>
              </div>

              {/* Phone Field */}
              <div className="mb-6">
                <div className="block mb-2 h-7 w-28 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-14 w-full bg-gray-100 border border-gray-200 rounded-lg animate-pulse"></div>
              </div>

              {/* City Field */}
              <div className="mb-8">
                <div className="block mb-2 h-7 w-20 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-14 w-full bg-gray-100 border border-gray-200 rounded-lg animate-pulse"></div>
              </div>

              {/* Password Field */}
              <div className="mb-6">
                <div className="block mb-2 h-7 w-36 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-14 w-full bg-gray-100 border border-gray-200 rounded-lg animate-pulse"></div>
              </div>

              {/* Confirm Password Field */}
              <div className="mb-6">
                <div className="block mb-2 h-7 w-36 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-14 w-full bg-gray-100 border border-gray-200 rounded-lg animate-pulse"></div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end">
                <div className="h-12 w-24 bg-[#BB3826] rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SettingsSkeleton;
