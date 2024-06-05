"use client";

import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";

const Strop = () => {
  return (
    <div className={`dark:text-white text-black z-40  w-full`}>
      <div>
        {" "}
        <h1 className="head_text text-center lg:pt-[200px] md:pt-[100px] sm:pt-[50px] pt-[30px] dark:text-white text-black">
          <span className="dark:text-white text-black">
            Join Us On the Other Social Media Platforms .
          </span>
          <br className="max-md:hidden" />
        </h1>
        <p className="desc text-center text-gray-600 mt-5">
          Join Us On the social like Facebook, X, Youtube, Twitch and Discord .
        </p>
      </div>
      <div className="w-full flex flex-wrap justify-center mt-6 gap-1 cursor-pointer transition-all">
        <Image
          src={"/face.svg"}
          width={50}
          height={50}
          alt="hello"
          className="mr-4 transform transition hover:scale-105"
        />
        <Image
          src={"/x.svg"}
          width={50}
          height={50}
          alt="hello"
          className="mr-4 transform transition hover:scale-105"
        />
        <Image
          src={"/you.svg"}
          width={50}
          height={50}
          alt="hello"
          className="mr-4 transform transition hover:scale-105"
        />
        <Image
          src={"/twi.svg"}
          width={50}
          height={50}
          alt="hello"
          className="mr-4 transform transition hover:scale-105"
        />
        <Image
          src={"/dis.svg"}
          width={50}
          height={50}
          alt="hello"
          className="mr-4 transform transition hover:scale-105"
        />
      </div>
    </div>
  );
};

export default Strop;
