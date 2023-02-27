import React from "react";
import Skeleton from "react-loading-skeleton";

const MessagesSkeleton = () => {
  return (
    <div className="vstack gap-3 p-4">
      <div className="d-flex flex-column align-items-start">
        <Skeleton circle width={40} height={40} />
        <Skeleton height={15} width={500} />
        <Skeleton height={15} width={500} />
        <Skeleton height={20} width={300} />
      </div>
      <div className="d-flex flex-column align-items-end">
        <Skeleton circle width={40} height={40} />
        <Skeleton height={15} width={500} />
        <Skeleton height={15} width={500} />
        <Skeleton height={70} width={240} />
      </div>
      <div className="d-flex flex-column align-items-end">
        <Skeleton circle width={40} height={40} />
        <Skeleton height={10} width={500} />
        <Skeleton height={15} width={500} />
        <Skeleton height={25} width={700} />
      </div>
      <div className="d-flex flex-column align-items-start">
        <Skeleton circle width={40} height={40} />
        <Skeleton height={10} width={500} />
        <Skeleton height={10} width={500} />
        <Skeleton height={175} width={240} />
      </div>
    </div>
  );
};

export default MessagesSkeleton;
