import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <>
      <Link href={"/"} className="flex items-center" prefetch={true}>
        <div className="relative flex justify-center w-10 h-10 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-12 lg:h-12  items-center flex-row-reverse">
          <Image
            className="ml-3"
            src={"/logo1.svg"}
            fill
            alt="hello"
            loading="lazy"
          />
        </div>

        <h3 className="font-bold text-2xl ml-4 hidden lg:block">
          Myaimix <sup className="font-normal text-[12px]">in</sup>
        </h3>
      </Link>
    </>
  );
};

export default Logo;
