import { Metadata } from "next";
import Image from "next/image";

import { Suspense, lazy } from "react";

// Lazy-loaded components
const LazyAbout = lazy(() => import("../../../components/About"));

export const metadata: Metadata = {
  title: {
    absolute: "Home",
  },
};

const Preloader = () => (
  <div className="flex justify-center items-center w-full h-screen bg-white dark:bg-gray-900">
    <div>
      <Image
        src={"/logo1.svg"}
        width={140}
        height={140}
        alt="hello"
        className="animate-bounce"
      />
    </div>
  </div>
);

const About = () => {
  return (
    <>
      <Suspense fallback={<Preloader />}>
        <LazyAbout />
      </Suspense>
    </>
  );
};

export default About;
