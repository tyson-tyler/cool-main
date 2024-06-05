"use client";
import { useState, useEffect, useCallback } from "react";

const useInfiniteScroll = (fetchMoreData: () => Promise<void>) => {
  const [isFetching, setIsFetching] = useState(false);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isFetching
    )
      return;
    setIsFetching(true);
  }, [isFetching]);

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreData().finally(() => setIsFetching(false));
  }, [isFetching, fetchMoreData]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return [isFetching, setIsFetching] as const;
};

export default useInfiniteScroll;
