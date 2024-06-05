import { useState, Suspense } from "react";

const SuspenseImage = ({ src, alt, ...props }: any) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Suspense fallback={<div>Loading image...</div>}>
      <img
        src={src}
        alt={alt}
        onLoad={() => setImageLoaded(true)}
        style={{ display: imageLoaded ? "block" : "none" }}
        {...props}
      />
    </Suspense>
  );
};

export default SuspenseImage;
