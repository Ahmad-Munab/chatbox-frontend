import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const FriendsSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#f8faff" highlightColor="#ffffff">
      <div
        className="p-3 rounded-4 w-100 d-flex justify-content-start align-items-center gap-3 shadow-sm"
        style={{ backgroundColor: "white" }}
      >
        <Skeleton circle width={55} height={55} />
        <div className="vstack gap-2">
          <Skeleton width={150} />
          <Skeleton width={100} />
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default FriendsSkeleton;
