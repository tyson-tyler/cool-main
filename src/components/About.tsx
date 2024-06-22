"use client";
import { useState, useEffect } from "react";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Suspense, lazy } from "react";

import { Vortex } from "./ui/votex";

// export const metadata: Metadata = {
//   title: {
//     absolute: "Home",
//   },
// };

// Lazy-loaded components

const About = async () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading delay for 2 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 20);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {isLoading ? (
        <section className="w-full flex-center flex-col mt-6">
          <h1 className="head_text text-center pt-[200px] dark:text-white text-black bg-gray-600 animate-pulse">
            <span className="dark:text-white text-black"></span>
            <br className="max-md:hidden" />
            <span className="usespan text-center ml-2 bg-gray-600 animate-pulse"></span>
          </h1>

          <p className="desc text-center text-gray-600 mt-5 bg-gray-600 animate-pulse"></p>
          <div className="flex justify-center items-center mt-5 gap-3 bg-gray-600 animate-pulse">
            <Link href={"/about"}>
              <Button
                className="p-5 justify-center flex bg-gray-600 animate-pulse"
                size={"lg"}
              ></Button>
            </Link>
            <a href={"https://inter-main.vercel.app"}>
              <Button
                className="p-5 justify-center flex bg-gray-600 animate-pulse"
                size={"lg"}
                variant={"ghost"}
              ></Button>
            </a>
          </div>
        </section>
      ) : (
        <div className="w-full rounded-lg overflow-hidden">
          <Vortex
            backgroundColor="transparent"
            className="flex items-center bg-transparent flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
          >
            <section className="w-full flex-center flex-col mt-6 ">
              <h1 className="head_text text-center pt-[200px] dark:text-white text-black">
                <span className="dark:text-white text-black">
                  Explore & Create
                </span>
                <br className="max-md:hidden" />
                <span className="usespan text-center ml-2">Ai Video</span>
              </h1>

              <p className="desc text-center text-gray-600 mt-5 px-3">
                Myaimix is an open-source Ai Video & Image watch and create your
                own .
              </p>
              <div className="flex justify-center items-center mt-5 gap-3 mb-20">
                <Link href={"/"}>
                  <Button className="p-5 justify-center flex" size={"lg"}>
                    Try it Now
                  </Button>
                </Link>
                <a href={"https://inter-main.vercel.app"}>
                  <Button
                    className="p-5 justify-center flex"
                    size={"lg"}
                    variant={"ghost"}
                  >
                    Community
                  </Button>
                </a>
              </div>
            </section>
          </Vortex>
        </div>
      )}
    </Suspense>
  );
};

export default About;
