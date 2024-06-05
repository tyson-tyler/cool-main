import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const Goal = () => {
  return (
    <div className="flex justify-center w-full flex-row flex-wrap mt-5 m-auto">
      <div>
        {" "}
        <h1 className="head_text text-center lg:pt-[200px] md:pt-[100px] sm:pt-[50px] pt-[30px] dark:text-white text-black">
          <span className="dark:text-white text-black">
            Our Goals for World
          </span>
          <br className="max-md:hidden" />
        </h1>
        <p className="desc text-center text-gray-600 mt-5">
          Our Goal is to accessible ai video for everyone and everybody.
        </p>
        <Link href={"/blog"}>
          <Button
            className="flex justify-center w-full md:w-1/2 ml-2 mr-2 m-auto mt-4 transform transition hover:scale-105"
            size={"lg"}
          >
            Read Our Blogs
          </Button>
        </Link>
      </div>
      <video
        src={"/5.webm"}
        autoPlay
        loop
        muted
        className="w-full lg:w-1/2 rounded-md lg:ml-6 mt-12 mb-5 max-h-[500px]"
      />
    </div>
  );
};

export default Goal;
