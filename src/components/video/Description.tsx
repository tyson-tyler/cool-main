"use client";

import { compactNumberFormat } from "@/utils/numUtils";
import { Video } from "@prisma/client";
import dayjs from "@/vendor/devjs";
import { useState } from "react";
import Sharearea from "../Sharearea";

interface DescriptionProps {
  video: Video;
}
const Description: React.FC<DescriptionProps> = ({ video }) => {
  const [isExpanded, setIsExpand] = useState(false);
  return (
    <div
      className={`dark:bg-gray-800 mt-3 shadow-lg  rounded-xl p-3 dark:text-white text-black overflow-hidden ${
        isExpanded ? "h-fit" : "line-clamp-2 max-h-28"
      }`}
    >
      <div className="flex gap-2 text-sm md:text-md lg:text-xl  dark:text-white text-black font-medium">
        <p className="text-black dark:text-white">
          {compactNumberFormat(video.viewCount)} watch
        </p>
        <p className="text-black dark:text-white">
          {dayjs(video.createdAt).format("D, MM, YYYY")}
        </p>
      </div>
      <div className={isExpanded ? "" : "line-clamp-2"}>
        <div className="whitespace-pre-line text-sm mt-2 text-gray-600">
          {video.description.split("/n").map((line, index) => {
            return line === "" ? (
              <br key={index} />
            ) : (
              <p key={index} className="text-black dark:text-white">
                {line}
              </p>
            );
          })}
        </div>
      </div>
      <p
        onClick={() => {
          setIsExpand((isExpanded) => !isExpanded);
        }}
        className={`cursor-pointer text-sm ${isExpanded ? "mt-2" : ""}`}
      >
        {isExpanded ? (
          <span className="text-black dark:text-white">Show less</span>
        ) : (
          <span className="text-black dark:text-white">Read more ...</span>
        )}
      </p>
    </div>
  );
};

export default Description;
