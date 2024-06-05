import dynamic from "next/dynamic"; // Import dynamic from next/dynamic

const DynamicImage = dynamic(() => import("next/image")); // Dynamically import next/image component

const BoxCard1 = () => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg border-b hover:border-sky-700 md:mr-5  mr-0 transition hover:scale-105 cursor-pointer">
      <div className="relative w-full h-[300px]">
        <DynamicImage
          src={"/2.webp"}
          alt="hello"
          layout="fill"
          objectFit="cover"
          priority
          quality={75}
        />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Upload the Ai Content</div>
        <p className="text-gray-700 text-base">
          You can Upload the Ai content like Video and Image in the Myaimix
        </p>
      </div>
    </div>
  );
};

export default BoxCard1;
