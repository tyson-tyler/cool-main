"use client";
import React, { useState } from "react";

const Card1 = ({ heading, paragraph, demo, image, keywords }: any) => {
  const [isReadMore, setIsReadMore] = useState(false);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <div className="p-10 flex items-center flex-wrap">
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <img
          className="w-full h-[500px] object-cover"
          src={image}
          alt={heading}
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 text-center">{heading}</div>
          <p className={`text-gray-700 text-base text-center`}>{demo}</p>
          <p
            className={`text-gray-700 text-base text-center ${
              isReadMore ? "" : "hidden"
            }`}
          >
            {paragraph}
          </p>

          <button
            className="mt-4 bg-blue-500 text-white px-3 py-1 rounded"
            onClick={toggleReadMore}
          >
            {isReadMore ? "Read Less" : "Read More"}
          </button>
        </div>
        <div className="px-6 pt-4 pb-2">
          {keywords.map((keyword: any, index: any) => (
            <span
              key={index}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              #{keyword}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card1;
