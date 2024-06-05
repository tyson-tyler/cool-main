"use client";

import Image from "next/image";

const Bar = () => {
  return (
    <div className="relative sm:flex sm:flex-col sm:items-center lg:flex lg:items-start mr-[28px] max-md:hidden mt-10 ml-[28px]">
      <Image src={"/logo1.svg"} alt="hello" width={40} height={40} />
    </div>
  );
};

export default Bar;
