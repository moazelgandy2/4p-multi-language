"use client";
import "react-responsive-pagination/themes/classic.css";
import React, { useEffect, useState } from "react";
import ResponsivePaginationComponent from "react-responsive-pagination";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const FeedsPagination = ({ getTotalPages }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const getCurrentPage = searchParams.get("page");
  const [currentPage, setCurrentPage] = useState(Number(getCurrentPage) || 1);
  const totalPages = getTotalPages;

  useEffect(() => {
    router.push(`${pathname}?${currentPage}`);
  }, [currentPage, searchParams, pathname, router]);

  return (
    <div className="my-10">
      <ResponsivePaginationComponent
        current={currentPage}
        total={totalPages}
        onPageChange={setCurrentPage}
        maxWidth={5}
      />
    </div>
  );
};

export default FeedsPagination;
