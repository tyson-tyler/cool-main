// app/components/LoadingBar.tsx
import React from "react";

const LoadingBar: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-blue-500 z-50">
      <div className="w-full h-full animate-pulse"></div>
    </div>
  );
};

export default LoadingBar;
