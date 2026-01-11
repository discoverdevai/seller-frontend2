// DashboardSkeleton.jsx
import React from "react";

const SkeletonBox = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 rounded-lg ${className}`} />
);

export const DashboardSkeleton = () => {
  return (
    <section className="w-full bg-[#faf9f7] p-6">
      <div className="flex flex-col gap-6 max-w-[1179px] mx-auto">

        {/* Warning card */}
        <div className="bg-white rounded-[10px] p-6">
          <SkeletonBox className="h-6 w-40 mb-4" />
          <SkeletonBox className="h-20 w-full" />
        </div>

        {/* Orders cards */}
        <div className="bg-white rounded-[10px] p-6">
          <div className="flex justify-between mb-4">
            <SkeletonBox className="h-6 w-32" />
            <SkeletonBox className="h-10 w-36" />
          </div>

          <div className="flex gap-6">
            {[1, 2, 3, 4].map((i) => (
              <SkeletonBox
                key={i}
                className="h-20 flex-1 rounded-[10px]"
              />
            ))}
          </div>
        </div>

        {/* Sales + Customers */}
        <div className="flex gap-6">
          <div className="bg-white rounded-[10px] p-6 w-[577px]">
            <SkeletonBox className="h-6 w-32 mb-6" />
            <SkeletonBox className="h-[300px] w-full" />
          </div>

          <div className="bg-white rounded-[10px] p-6 w-[578px]">
            <SkeletonBox className="h-6 w-32 mb-6" />
            <SkeletonBox className="h-[260px] w-[260px] mx-auto rounded-full" />
            <div className="mt-6 space-y-3">
              <SkeletonBox className="h-4 w-48" />
              <SkeletonBox className="h-4 w-56" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
